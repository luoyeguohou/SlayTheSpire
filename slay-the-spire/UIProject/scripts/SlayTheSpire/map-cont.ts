/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import BossMapItem from "./BossMapItem";

import * as fgui from "fairygui-cc";
export class MapCont extends fgui.GComponent {
	declare leftTop:fgui.GGraph;
	declare boss:BossMapItem;
	declare rightBot:fgui.GGraph;

	protected onConstruct():void {
		this.leftTop = this.getChild("leftTop",fgui.GGraph);
		this.boss = this.getChild("boss",BossMapItem);
		this.rightBot = this.getChild("rightBot",fgui.GGraph);
	}
}