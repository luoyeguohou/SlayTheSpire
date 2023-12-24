import * as fgui from "fairygui-cc";
import { CardLibraryCont } from "./card-library-cont";
export class CardLibrary extends fgui.GComponent {
	declare cont:CardLibraryCont;

	protected onConstruct():void {
		this.cont = this.getChild("cont",CardLibraryCont);
		console.log("???")
	}
}