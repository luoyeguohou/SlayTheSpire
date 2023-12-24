import * as fgui from "fairygui-cc";
import { fairyUI } from "./fairy-ui";

export abstract class FairyWindow extends fgui.GComponent {
    declare bg: fgui.GGraph;
    declare cont: fgui.GComponent;
    declare aniDisappear: fgui.Transition;

    protected onConstruct(): void {
        this.bg = this.getChild("bg", fgui.GGraph);
        this.cont = this.getChild("cont", fgui.GComponent);
        this.aniDisappear = this.getTransition("aniOut");
    }

    protected pkg: string;
    protected winName: string;
    protected setUrl(pkg: string, winName: string) {
        this.pkg = pkg;
        this.winName = winName;
    }

    show() {
        this.visible = true;
        this.bindListener();
        return this;
    }

    close() {
        this.aniDisappear.play(() => {
            this.visible = false;
            fairyUI.putWindowBack(this.pkg, this.winName, this);
        });
    }

    protected onDestroy(): void {
        this.unbindListener();
    }

    protected bindListener(): void { }
    protected unbindListener(): void { }
}


