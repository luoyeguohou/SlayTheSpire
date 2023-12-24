/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class Room extends fgui.GComponent {
	declare ctrlIsHost:fgui.Controller;
	declare lstItem:fgui.GList;
	declare btnStartGame:fgui.GButton;
	declare btnExit:fgui.GButton;
	declare txtRoom:fgui.GTextField;

	protected onConstruct():void {
		this.ctrlIsHost = this.getController("isHost");
		this.lstItem = this.getChild("lstItem",fgui.GList);
		this.btnStartGame = this.getChild("btnStartGame",fgui.GButton);
		this.btnExit = this.getChild("btnExit",fgui.GButton);
		this.txtRoom = this.getChild("txtRoom",fgui.GTextField);
	}
}