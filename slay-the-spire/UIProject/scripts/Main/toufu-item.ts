/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import RoomItem from "./RoomItem";

import * as fgui from "fairygui-cc";
export class ToufuItem extends fgui.GComponent {
	declare ctrlHavePlayer:fgui.Controller;
	declare ctrlIsPrince:fgui.Controller;
	declare ctrlIdentity:fgui.Controller;
	declare imgPlayer:RoomItem;
	declare txtIdentity:fgui.GTextField;
	declare imgSelf:fgui.GGraph;
	declare imgWinCond:fgui.GGraph;
	declare txtWinResult:fgui.GTextField;
	declare btnChoose:fgui.GButton;
	declare txtGold:fgui.GTextField;
	declare txtEmpSeat:fgui.GTextField;

	protected onConstruct():void {
		this.ctrlHavePlayer = this.getController("havePlayer");
		this.ctrlIsPrince = this.getController("isPrince");
		this.ctrlIdentity = this.getController("identity");
		this.imgPlayer = this.getChild("imgPlayer",RoomItem);
		this.txtIdentity = this.getChild("txtIdentity",fgui.GTextField);
		this.imgSelf = this.getChild("imgSelf",fgui.GGraph);
		this.imgWinCond = this.getChild("imgWinCond",fgui.GGraph);
		this.txtWinResult = this.getChild("txtWinResult",fgui.GTextField);
		this.btnChoose = this.getChild("btnChoose",fgui.GButton);
		this.txtGold = this.getChild("txtGold",fgui.GTextField);
		this.txtEmpSeat = this.getChild("txtEmpSeat",fgui.GTextField);
	}
}