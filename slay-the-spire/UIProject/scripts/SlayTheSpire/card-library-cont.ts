/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class CardLibraryCont extends fgui.GComponent {
	declare ctrlColor:fgui.Controller;
	declare lstCard:fgui.GList;

	protected onConstruct():void {
		this.ctrlColor = this.getController("color");
		this.lstCard = this.getChild("lstCard",fgui.GList);
	}
}