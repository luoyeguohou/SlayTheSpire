/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class BtnTag extends fgui.GButton {
	declare ctrlLight:fgui.Controller;
	declare ctrlColor:fgui.Controller;

	protected onConstruct():void {
		this.ctrlLight = this.getController("light");
		this.ctrlColor = this.getController("color");
	}
}