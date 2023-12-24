/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class ConfirmWin extends fgui.GComponent {
	declare btnConfirm:fgui.GButton;
	declare title:fgui.GTextField;

	protected onConstruct():void {
		this.btnConfirm = this.getChild("btnConfirm",fgui.GButton);
		this.title = this.getChild("title",fgui.GTextField);
	}
}