import { _decorator, Component } from 'cc';
import * as fgui from "fairygui-cc";
import { fairyUI } from '../fairy-ui/fairy-ui';
const { ccclass } = _decorator;

@ccclass('Main')
export class Main extends Component {
    // audioManager: AudioManager = new AudioManager();

    start() {
        // AudioManager.load();
        fgui.GRoot.create();
        fairyUI.newWindow("SlayTheSpire", "Map");
    }
}

