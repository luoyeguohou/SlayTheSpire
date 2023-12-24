/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class ToufuResult extends fgui.GComponent {
	declare bg:fgui.GGraph;
	declare txtResult:fgui.GTextField;
	declare btnConfirm:fgui.GButton;
	declare txtGoldChange:fgui.GTextField;

	protected onConstruct():void {
		this.bg = this.getChild("bg",fgui.GGraph);
		this.txtResult = this.getChild("txtResult",fgui.GTextField);
		this.btnConfirm = this.getChild("btnConfirm",fgui.GButton);
		this.txtGoldChange = this.getChild("txtGoldChange",fgui.GTextField);
	}
}