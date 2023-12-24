/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class ToufuGameEnd extends fgui.GComponent {
	declare bg:fgui.GGraph;
	declare btnConfirm:fgui.GButton;
	declare txtResult:fgui.GTextField;

	protected onConstruct():void {
		this.bg = this.getChild("bg",fgui.GGraph);
		this.btnConfirm = this.getChild("btnConfirm",fgui.GButton);
		this.txtResult = this.getChild("txtResult",fgui.GTextField);
	}
}