/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class ToufuItemNew extends fgui.GComponent {
	declare ctrlIsPrince:fgui.Controller;
	declare ctrlIdentity:fgui.Controller;
	declare ctrlIsEmp:fgui.Controller;
	declare txtName:fgui.GTextField;
	declare btnChoose:fgui.GButton;
	declare txtGold:fgui.GTextField;

	protected onConstruct():void {
		this.ctrlIsPrince = this.getController("isPrince");
		this.ctrlIdentity = this.getController("identity");
		this.ctrlIsEmp = this.getController("isEmp");
		this.txtName = this.getChild("txtName",fgui.GTextField);
		this.btnChoose = this.getChild("btnChoose",fgui.GButton);
		this.txtGold = this.getChild("txtGold",fgui.GTextField);
	}
}