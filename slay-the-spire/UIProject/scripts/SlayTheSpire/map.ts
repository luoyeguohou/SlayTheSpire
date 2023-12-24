/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import MapCont from "./MapCont";

import * as fgui from "fairygui-cc";
export class Map extends fgui.GComponent {
	declare cont:MapCont;

	protected onConstruct():void {
		this.cont = this.getChild("cont",MapCont);
	}
}