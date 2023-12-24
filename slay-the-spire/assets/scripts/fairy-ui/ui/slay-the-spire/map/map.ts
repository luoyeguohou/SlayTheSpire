import * as fgui from "fairygui-cc";
import { MapCont } from "./map-cont";

export class MapWin extends fgui.GComponent {
	declare cont: MapCont;

	protected onConstruct(): void {
		this.cont = this.getChild("cont", MapCont);
	}
}