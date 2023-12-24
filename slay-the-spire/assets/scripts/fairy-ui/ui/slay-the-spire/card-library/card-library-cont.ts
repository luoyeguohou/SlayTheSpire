import * as fgui from "fairygui-cc";
import { CardCfg } from "../../../../cfg/card-cfg";
import { dd } from "../../../../cfg/design";
import { Card } from "../card/card";

export class CardLibraryCont extends fgui.GComponent {
	declare ctrlColor: fgui.Controller;
	declare lstCard: fgui.GList;

	protected onConstruct(): void {
		this.ctrlColor = this.getController("color");
		this.lstCard = this.getChild("lstCard", fgui.GList);
		this.ctrlColor.onChanged(this.onColorChanged, this);
		console.log("???????")
		this.lstCard.itemRenderer = this.itemRender;
		console.log("???????")
		this.onColorChanged();
		console.log("???????")
	}

	private cfgs: Array<CardCfg>;
	onColorChanged() {
		const color = this.ctrlColor.selectedIndex;
		console.log(color)
		this.cfgs = dd.cardCfgs.get(color);
		console.log(this.cfgs)
		this.lstCard.numItems = this.cfgs.length;
		console.log(this.lstCard.numItems)

		this.lstCard.height = Math.ceil(this.cfgs.length / 8) * 838 + 1000
		console.log(this.lstCard.columnCount)
	}

	itemRender = (index: number, item: Card) => {
		console.log(index)
		console.log(item)
		item.setCfg(this.cfgs[index]);
	}

}