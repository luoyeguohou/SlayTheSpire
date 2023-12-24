/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class Main extends fgui.GComponent {
	declare btnCreate:fgui.GButton;
	declare btnJoin:fgui.GButton;
	declare btnChangeName:fgui.GButton;
	declare txt:fgui.GTextField;
	declare txtName:fgui.GTextField;

	protected onConstruct():void {
		this.btnCreate = this.getChild("btnCreate",fgui.GButton);
		this.btnJoin = this.getChild("btnJoin",fgui.GButton);
		this.btnChangeName = this.getChild("btnChangeName",fgui.GButton);
		this.txt = this.getChild("txt",fgui.GTextField);
		this.txtName = this.getChild("txtName",fgui.GTextField);
	}
}