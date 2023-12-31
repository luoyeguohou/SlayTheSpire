"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genCode = void 0;
const csharp_1 = require("csharp");
const CodeWriter_1 = require("./CodeWriter");
function genCode(handler) {
    let settings = handler.project.GetSettings("Publish").codeGeneration;
    let codePkgName = handler.ToFilename(handler.pkg.name); //convert chinese to pinyin, remove special chars etc.

    let exportCodePath = handler.exportCodePath + '/' + codePkgName;
    let namespaceName = codePkgName;
    let ns = "fgui";
    let isThree = handler.project.type == csharp_1.FairyEditor.ProjectType.ThreeJS;
    if (settings.packageName)
        namespaceName = settings.packageName + '.' + namespaceName;
    //CollectClasses(stripeMemeber, stripeClass, fguiNamespace)
    let classes = handler.CollectClasses(settings.ignoreNoname, settings.ignoreNoname, ns);
    handler.SetupCodeFolder(exportCodePath, "ts"); //check if target folder exists, and delete old files
    let getMemberByName = settings.getMemberByName;
    let classCnt = classes.Count;
    let writer = new CodeWriter_1.default({ blockFromNewLine: false, usingTabs: true });
    for (let i = 0; i < classCnt; i++) {
        let classInfo = classes.get_Item(i);
        let members = classInfo.members;
        let references = classInfo.references;
        writer.reset();
        let refCount = references.Count;
        if (refCount > 0) {
            for (let j = 0; j < refCount; j++) {
                let ref = references.get_Item(j);
                writer.writeln('import %s from "./%s";', ref, ref);
            }
            writer.writeln();
        }
        writer.writeln('import * as fgui from "fairygui-cc";');
        if (isThree) {
            writer.writeln('import * as fgui from "fairygui-three";');
            if (refCount == 0)
                writer.writeln();
        }
        writer.writeln('export class %s extends %s', classInfo.className, classInfo.superClassName);
        writer.startBlock();
        // writer.writeln();
        let memberCnt = members.Count;
        for (let j = 0; j < memberCnt; j++) {
            let memberInfo = members.get_Item(j);
            if (memberInfo.group == 1) {
                // controller
                let varName = memberInfo.varName;
                var firstCha = varName[0].toUpperCase();
                varName = "ctrl" + firstCha + varName.slice(1);
                writer.writeln('declare %s:%s;', varName, memberInfo.type);
            }
            else if (memberInfo.group == 0) {
                // comp
                writer.writeln('declare %s:%s;', memberInfo.varName, memberInfo.type);
            } else {
                // transition
                let varName = memberInfo.varName;
                var firstCha = varName[0].toUpperCase();
                varName = "ani" + firstCha + varName.slice(1);
                writer.writeln('declare %s:%s;', varName, memberInfo.type);
            }
        }
        // writer.writeln('public static URL:string = "ui://%s%s";', handler.pkg.id, classInfo.resId);
        // writer.writeln();
        // writer.writeln('public static createInstance():%s', classInfo.className);
        // writer.startBlock();
        // writer.writeln('return <%s>(%s.UIPackage.createObject("%s", "%s"));', classInfo.className, ns, handler.pkg.name, classInfo.resName);
        // writer.endBlock();
        writer.writeln();
        writer.writeln('protected onConstruct():void');
        writer.startBlock();
        for (let j = 0; j < memberCnt; j++) {
            let memberInfo = members.get_Item(j);
            if (memberInfo.group == 0) {
                if (getMemberByName)
                    writer.writeln('this.%s = this.getChild("%s",%s);', memberInfo.varName, memberInfo.name, memberInfo.type);
                else
                    writer.writeln('this.%s = this.getChildAt(%s,%s);', memberInfo.varName, memberInfo.index, memberInfo.type);
            }
            else if (memberInfo.group == 1) {
                if (getMemberByName) {
                    let varName = memberInfo.varName;
                    var firstCha = varName[0].toUpperCase();
                    varName = "ctrl" + firstCha + varName.slice(1);
                    writer.writeln('this.%s = this.getController("%s");', varName, memberInfo.name);
                }
                else
                    writer.writeln('this.%s = this.getControllerAt(%s);', memberInfo.varName, memberInfo.index);
            }
            else {
                if (getMemberByName) {
                    let varName = memberInfo.varName;
                    var firstCha = varName[0].toUpperCase();
                    varName = "ani" + firstCha + varName.slice(1);
                    writer.writeln('this.%s = this.getTransition("%s");', varName, memberInfo.name);
                }
                else
                    writer.writeln('this.%s = this.getTransitionAt(%s);', memberInfo.varName, memberInfo.index);
            }
        }
        writer.endBlock();
        writer.endBlock(); //class
        let fileName = "";
        let name = classInfo.className;
        for (let i = 0; i < name.length; i++) {
            if (name[i].toUpperCase() == name[i] && i != 0)
                fileName += "-" + name[i].toLowerCase();
            else if (name[i].toUpperCase() == name[i] && i == 0)
                fileName += name[i].toLowerCase();
            else
                fileName += name[i];
        }
        writer.save(exportCodePath + '/' + fileName + '.ts');
    }
    writer.reset();
    let binderName = codePkgName + 'Binder';
    for (let i = 0; i < classCnt; i++) {
        let classInfo = classes.get_Item(i);
        writer.writeln('import %s from "./%s";', classInfo.className, classInfo.className);
    }
    if (isThree) {
        writer.writeln('import * as fgui from "fairygui-three";');
        writer.writeln();
    }
    writer.writeln();
    writer.writeln('export default class %s', binderName);
    writer.startBlock();
    writer.writeln('public static bindAll():void');
    writer.startBlock();
    for (let i = 0; i < classCnt; i++) {
        let classInfo = classes.get_Item(i);
        writer.writeln('%s.UIObjectFactory.setExtension(%s.URL, %s);', ns, classInfo.className, classInfo.className);
    }
    writer.endBlock(); //bindall
    writer.endBlock(); //class
    writer.save(exportCodePath + '/' + binderName + '.ts');
}
exports.genCode = genCode;
