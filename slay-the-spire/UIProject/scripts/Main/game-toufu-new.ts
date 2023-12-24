/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class GameToufuNew extends fgui.GComponent {
	declare ctrlIdentity:fgui.Controller;
	declare lstItem:fgui.GList;

	protected onConstruct():void {
		this.ctrlIdentity = this.getController("identity");
		this.lstItem = this.getChild("lstItem",fgui.GList);
	}
}