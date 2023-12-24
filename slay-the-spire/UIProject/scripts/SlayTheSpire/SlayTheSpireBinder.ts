/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import Card from "./Card";
import AtkFrame from "./AtkFrame";
import SkillFrame from "./SkillFrame";
import PowerFrame from "./PowerFrame";
import RedCard from "./RedCard";
import PurpleCard from "./PurpleCard";
import GreenCard from "./GreenCard";
import BlueCard from "./BlueCard";
import ColoressCard from "./ColoressCard";
import MapCont from "./MapCont";
import Map from "./Map";
import CardLibraryCont from "./CardLibraryCont";
import BtnTag from "./BtnTag";
import CardLibrary from "./CardLibrary";
import BossMapItem from "./BossMapItem";
import MapItem from "./MapItem";
import Welcome from "./Welcome";

export default class SlayTheSpireBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(Card.URL, Card);
		fgui.UIObjectFactory.setExtension(AtkFrame.URL, AtkFrame);
		fgui.UIObjectFactory.setExtension(SkillFrame.URL, SkillFrame);
		fgui.UIObjectFactory.setExtension(PowerFrame.URL, PowerFrame);
		fgui.UIObjectFactory.setExtension(RedCard.URL, RedCard);
		fgui.UIObjectFactory.setExtension(PurpleCard.URL, PurpleCard);
		fgui.UIObjectFactory.setExtension(GreenCard.URL, GreenCard);
		fgui.UIObjectFactory.setExtension(BlueCard.URL, BlueCard);
		fgui.UIObjectFactory.setExtension(ColoressCard.URL, ColoressCard);
		fgui.UIObjectFactory.setExtension(MapCont.URL, MapCont);
		fgui.UIObjectFactory.setExtension(Map.URL, Map);
		fgui.UIObjectFactory.setExtension(CardLibraryCont.URL, CardLibraryCont);
		fgui.UIObjectFactory.setExtension(BtnTag.URL, BtnTag);
		fgui.UIObjectFactory.setExtension(CardLibrary.URL, CardLibrary);
		fgui.UIObjectFactory.setExtension(BossMapItem.URL, BossMapItem);
		fgui.UIObjectFactory.setExtension(MapItem.URL, MapItem);
		fgui.UIObjectFactory.setExtension(Welcome.URL, Welcome);
	}
}