/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class RoomItem extends fgui.GComponent {
	declare ctrlEmpty:fgui.Controller;
	declare txtName:fgui.GTextField;
	declare txtNum:fgui.GTextField;

	protected onConstruct():void {
		this.ctrlEmpty = this.getController("empty");
		this.txtName = this.getChild("txtName",fgui.GTextField);
		this.txtNum = this.getChild("txtNum",fgui.GTextField);
	}
}