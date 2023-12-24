/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class ToufuConfirm extends fgui.GComponent {
	declare bg:fgui.GGraph;
	declare btnConfirm:fgui.GButton;
	declare btnCancel:fgui.GButton;

	protected onConstruct():void {
		this.bg = this.getChild("bg",fgui.GGraph);
		this.btnConfirm = this.getChild("btnConfirm",fgui.GButton);
		this.btnCancel = this.getChild("btnCancel",fgui.GButton);
	}
}