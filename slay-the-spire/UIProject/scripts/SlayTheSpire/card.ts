/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import * as fgui from "fairygui-cc";
export class Card extends fgui.GComponent {
	declare ctrlColor:fgui.Controller;
	declare ctrlCType:fgui.Controller;
	declare ctrlRare:fgui.Controller;
	declare ctrlCostColor:fgui.Controller;
	declare imgPower:fgui.GLoader;
	declare imgSkill:fgui.GLoader;
	declare imgAtk:fgui.GLoader;
	declare txtCost:fgui.GTextField;
	declare txtName:fgui.GTextField;
	declare txtCont:fgui.GRichTextField;

	protected onConstruct():void {
		this.ctrlColor = this.getController("color");
		this.ctrlCType = this.getController("cType");
		this.ctrlRare = this.getController("rare");
		this.ctrlCostColor = this.getController("costColor");
		this.imgPower = this.getChild("imgPower",fgui.GLoader);
		this.imgSkill = this.getChild("imgSkill",fgui.GLoader);
		this.imgAtk = this.getChild("imgAtk",fgui.GLoader);
		this.txtCost = this.getChild("txtCost",fgui.GTextField);
		this.txtName = this.getChild("txtName",fgui.GTextField);
		this.txtCont = this.getChild("txtCont",fgui.GRichTextField);
	}
}