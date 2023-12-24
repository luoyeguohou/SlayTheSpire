/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class MapItem extends fgui.GButton {
	declare ctrlIType:fgui.Controller;
	declare ctrlOutline:fgui.Controller;
	declare aniT0:fgui.Transition;

	protected onConstruct():void {
		this.ctrlIType = this.getController("iType");
		this.ctrlOutline = this.getController("outline");
		this.aniT0 = this.getTransition("t0");
	}
}