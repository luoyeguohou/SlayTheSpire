import * as fgui from "fairygui-cc";
import { CardCfg } from "../../../../cfg/card-cfg";
import { CardType } from "../../../../enums";
export class Card extends fgui.GComponent {
	declare ctrlColor: fgui.Controller;
	declare ctrlCType: fgui.Controller;
	declare ctrlRare: fgui.Controller;
	declare ctrlCostColor: fgui.Controller;
	declare imgPower: fgui.GLoader;
	declare imgSkill: fgui.GLoader;
	declare imgAtk: fgui.GLoader;
	declare txtCost: fgui.GTextField;
	declare txtName: fgui.GTextField;
	declare txtCont: fgui.GTextField;

	protected onConstruct(): void {
		this.ctrlColor = this.getController("color");
		this.ctrlCType = this.getController("cType");
		this.ctrlRare = this.getController("rare");
		this.ctrlCostColor = this.getController("costColor");
		this.imgPower = this.getChild("imgPower", fgui.GLoader);
		this.imgSkill = this.getChild("imgSkill", fgui.GLoader);
		this.imgAtk = this.getChild("imgAtk", fgui.GLoader);
		this.txtCost = this.getChild("txtCost", fgui.GTextField);
		this.txtName = this.getChild("txtName", fgui.GTextField);
		this.txtCont = this.getChild("txtCont", fgui.GTextField);
	}

	setCfg(cardCfg: CardCfg) {
		this.ctrlColor.selectedIndex = cardCfg.color;
		this.ctrlCType.selectedIndex = cardCfg.cType;
		this.ctrlRare.selectedIndex = cardCfg.rare;
		this.ctrlCostColor.selectedIndex = cardCfg.cost == -2 ? 5 : cardCfg.color;
		this.txtCost.text = cardCfg.cost == -1 ? "X" : cardCfg.cost.toFixed(0);
		this.txtName.text = cardCfg.name;
		switch (cardCfg.cType) {
			case CardType.Atk:
				this.imgAtk.url = "ui://SlayTheSpire/" + cardCfg.img;
				break;
			case CardType.Power:
				this.imgPower.url = "ui://SlayTheSpire/" + cardCfg.img;
				break;
			default:
				this.imgSkill.url = "ui://SlayTheSpire/" + cardCfg.img;
				break;
		}
	}
}