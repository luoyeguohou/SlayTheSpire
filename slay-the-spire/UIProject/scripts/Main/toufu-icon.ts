/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class ToufuIcon extends fgui.GComponent {
	declare ctrlIdentity:fgui.Controller;
	declare imgSelf:fgui.GGraph;
	declare imgwin:fgui.GGraph;

	protected onConstruct():void {
		this.ctrlIdentity = this.getController("identity");
		this.imgSelf = this.getChild("imgSelf",fgui.GGraph);
		this.imgwin = this.getChild("imgwin",fgui.GGraph);
	}
}