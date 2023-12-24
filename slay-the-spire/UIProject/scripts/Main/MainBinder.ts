/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import ConfirmInput from "./ConfirmInput";
import ToufuIcon from "./ToufuIcon";
import GameToufuNew from "./GameToufuNew";
import ToufuItemNew from "./ToufuItemNew";
import Main from "./Main";
import Room from "./Room";
import RoomItem from "./RoomItem";
import GameToufu from "./GameToufu";
import ToufuItem from "./ToufuItem";
import ToufuResult from "./ToufuResult";
import ToufuConfirm from "./ToufuConfirm";
import ToufuGameEnd from "./ToufuGameEnd";
import ConfirmWin from "./ConfirmWin";

export default class MainBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(ConfirmInput.URL, ConfirmInput);
		fgui.UIObjectFactory.setExtension(ToufuIcon.URL, ToufuIcon);
		fgui.UIObjectFactory.setExtension(GameToufuNew.URL, GameToufuNew);
		fgui.UIObjectFactory.setExtension(ToufuItemNew.URL, ToufuItemNew);
		fgui.UIObjectFactory.setExtension(Main.URL, Main);
		fgui.UIObjectFactory.setExtension(Room.URL, Room);
		fgui.UIObjectFactory.setExtension(RoomItem.URL, RoomItem);
		fgui.UIObjectFactory.setExtension(GameToufu.URL, GameToufu);
		fgui.UIObjectFactory.setExtension(ToufuItem.URL, ToufuItem);
		fgui.UIObjectFactory.setExtension(ToufuResult.URL, ToufuResult);
		fgui.UIObjectFactory.setExtension(ToufuConfirm.URL, ToufuConfirm);
		fgui.UIObjectFactory.setExtension(ToufuGameEnd.URL, ToufuGameEnd);
		fgui.UIObjectFactory.setExtension(ConfirmWin.URL, ConfirmWin);
	}
}