import * as fgui from "fairygui-cc";

export class BossMapItem extends fgui.GButton {
	declare img: fgui.GLoader;

	protected onConstruct(): void {
		this.img = this.getChild("img", fgui.GLoader);
	}
}