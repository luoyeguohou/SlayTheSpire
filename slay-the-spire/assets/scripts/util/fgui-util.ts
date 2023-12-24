import * as fgui from "fairygui-cc";

export async function playWaitEnd(ani: fgui.Transition) {
    return new Promise<void>((resolve) => {
        ani.play(resolve);
    });
}

export function disposeAllChildren(com: fgui.GComponent) {
    const numChildren = com.numChildren;
    for (var i = 0; i < numChildren; i++) {
        com.getChildAt(0).dispose();
    }
}

// export function showUseJadeWin(title: string, handler: () => void) {
//     const win = fairyUI.newWindow<UseJade>("Main", "UseJade").show();
//     win.makeFullScreen();
//     win.setPivot(0.5, 0.5, true);
//     win.setPosition(fgui.GRoot.inst.width / 2, fgui.GRoot.inst.height / 2);
//     fgui.GRoot.inst.addChild(win);
//     win.setData(title, handler);
//     return win;
// }

// export function showRewardWin(rewards: Array<RewardData>) {
//     const win = fairyUI.newWindow<RewardWin>("Main", "RewardWin").show();
//     win.makeFullScreen();
//     win.setPivot(0.5, 0.5, true);
//     win.setPosition(fgui.GRoot.inst.width / 2, fgui.GRoot.inst.height / 2);
//     fgui.GRoot.inst.addChild(win);
//     win.setRewards(rewards);
//     return win;
// }

// export async function showTip(tip: string) {
//     const win = fgui.UIPackage.createObject("Main", "Tip") as Tip;
//     win.setPivot(0.5, 0.5, true);
//     win.setPosition(fgui.GRoot.inst.width / 2, fgui.GRoot.inst.height / 2);
//     fgui.GRoot.inst.addChild(win);

//     win.txtTitle.text = tip;
//     win.aniShow.play();
//     await waitForSeconds(1.7);
//     win.dispose();
// }

export async function playAniUntilTag(ani: fgui.Transition, tag: string) {
    return new Promise<void>((resolve, reject) => {
        ani.setHook(tag, () => resolve());
        ani.play();
    });
}