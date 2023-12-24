import { _decorator, Component, Button, director, Sprite, Label, System, sys } from 'cc';
import { assetPool } from '../util/asset-pool';
import { dd } from '../cfg/design';
import { ecsLoader } from '../ecs/ecs-loader';
import { ProgressChecker } from '../util/util';
// import { LoginStep } from '../enums';
import { WeChat } from '../sdk/wechat/wx-sdk';
import { AutoDes } from '../prefabs/auto-des';
import { fairyUI } from '../fairy-ui/fairy-ui';
import { conn, isNative } from '../net/conn';
import { AudioManager } from "../util/audio-manager";
import { createConn, handleFunc, tbl } from '../net/conn-new';
const { ccclass, property } = _decorator;

class ECSUpdateSystem extends System {
    update(dt: number) {
        ecsLoader.e.update(dt);
    }
}

@ccclass('Loading')
export class Loading extends Component {
    @property({ type: Button })
    private btnStartGame: Button;

    @property({ type: Sprite })
    private prog: Sprite;

    @property({ type: Sprite })
    private progBG: Sprite;

    // private step = LoginStep.BeforeEcsLoad;

    @property({ type: Label })
    private txtTip: Label;

    private isLoading = false;

    audioManager: AudioManager;

    async start() {
        this.txtTip.getComponent(AutoDes).bindDesFunc(() => {
            this.txtTip.node.active = false;
        });

        if (isNative()) {
            await WeChat.requestCode()
        }

        this.btnStartGame.node.on(Button.EventType.CLICK, this.onClick, this);
        conn.msgHandler = (msgID: number, param: object) => this.onRecvMsg(msgID, param);
        tbl.msgHandler = (msgID: number, param: object) => this.onRecvMsg(msgID, param);
    }

    private onRecvMsg(msgID: number, param: any) {
    }

    private enterLoading = () => {
        this.prog.node.active = true;
        this.progBG.node.active = true;
        this.btnStartGame.node.active = false;
    }

    onClick = async () => {
        if (this.isLoading)
            return;

        this.isLoading = true;
        this.enterLoading();

        // // ecs load
        // if (this.step === LoginStep.BeforeEcsLoad) {
        ecsLoader.load();
        //     this.step = LoginStep.EcsLoaded;
        // }

        // if (this.step === LoginStep.EcsLoaded) {
        //     this.step = LoginStep.LoginFinished;
        // }
        // await this.linkServer();
      
        await this.afterLoadFromServer();
    }

    async afterLoadFromServer() {
        this.initError();

        const progChecker = new ProgressChecker();
        progChecker.addCheckPoint("design", 10);
        progChecker.addCheckPoint("asset", 100);
        progChecker.addCheckPoint("ecsLoad", 20);

        progChecker.bindFunc((prog: number) => {
            this.prog.fillRange = prog;
        });

        // design
        console.log("start dd.load");
        await dd.load(progChecker);
        // AudioManager.load();
        console.log("dd.load end");
        // asset pool
        console.log("assetPool.init");
        await assetPool.init(progChecker);
        console.log("assetPool.init end");

        // deal language
        await this.initLanguage();

        await fairyUI.load();

        progChecker.addProgress("ecsLoad", 20);


        director.registerSystem("ecs-updater", new ECSUpdateSystem(), System.Priority.MEDIUM);
        director.loadScene("main");
    }

    private async initLanguage() {
    }

    private initError() {
        // if (netMgr.isNative()) {
        //     wx.onError((error: any) => {
        //         console.log(error);

        //         const str: string = error.message;
        //         const strings = str.split("\n");

        //         // at Function.<anonymous> (http://127.0.0.1:51942/game/assets/main/index.e1440.js:254:2108)
        //         var stack = strings[3];
        //         // :254:2108)
        //         stack = stack.split(".js")[1];
        //         // 254:2108
        //         stack = stack.substring(1, stack.length - 1);
        //         // [254,2108]
        //         const stacks = stack.split(":");
        //         const col = +stacks[0]
        //         const row = +stacks[1]

        //         netMgr.onError(error.message, strings[2], col, row);
        //     });
        // }
    }

    private async linkServer() {
        await createConn();
    }
}

