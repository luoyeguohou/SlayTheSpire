/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import CardLibraryCont from "./CardLibraryCont";

import * as fgui from "fairygui-cc";
export class CardLibrary extends fgui.GComponent {
	declare cont:CardLibraryCont;

	protected onConstruct():void {
		this.cont = this.getChild("cont",CardLibraryCont);
	}
}