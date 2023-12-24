import { _decorator, Component, CCFloat, CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

// 自动销毁挂载的prefab
@ccclass('AutoDes')
export class AutoDes extends Component {
    @property({ type: CCFloat })
    private duration: number = 0;

    @property({ type: CCBoolean })
    private desOnStart: boolean;

    private cnt: number = 0;

    start() {
        if (this.desOnStart)
            this.startTimer();
    }

    startTimer() {
        this.cnt = this.duration;
    }

    desFunc: () => void;
    bindDesFunc(desFunc: () => void) {
        this.desFunc = desFunc;
    }

    update(deltaTime: number) {
        if (this.cnt <= 0)
            return;

        this.cnt -= deltaTime;

        if (this.cnt > 0)
            return;

        if (this.desFunc)
            this.desFunc();
        else
            this.node.destroy();
    }
}

