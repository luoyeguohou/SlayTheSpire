/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class GameToufu extends fgui.GComponent {
	declare lstItem:fgui.GList;

	protected onConstruct():void {
		this.lstItem = this.getChild("lstItem",fgui.GList);
	}
}