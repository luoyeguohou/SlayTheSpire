import * as fgui from "fairygui-cc";
import { assetLoader } from "../util/asset-loader";
import { AssetManager, Font } from "cc";
import { assetPool } from "../util/asset-pool";
import { CardLibrary } from "./ui/slay-the-spire/card-library/card-library";
import { CardLibraryCont } from "./ui/slay-the-spire/card-library/card-library-cont";
import { Card } from "./ui/slay-the-spire/card/card";
import { MapCont } from "./ui/slay-the-spire/map/map-cont";
import { MapItem } from "./ui/slay-the-spire/map/map-item";
import { BossMapItem } from "./ui/slay-the-spire/map/boss-map-item";
import { MapWin } from "./ui/slay-the-spire/map/map";

export class FairyUI {
    async load() {
        console.log("FairyUI load start");
        const font = await assetPool.getOrLoad("font", "font", Font);
        fgui.registerFont("defFont", font);
        fgui.UIConfig.defaultFont = "defFont"

        const bundle = await assetLoader.loadBundle("ui");
        await this.loadPackage(bundle, "SlayTheSpire");
        console.log("FairyUI loaded");
        // Card
        fgui.UIObjectFactory.setExtension("ui://SlayTheSpire/Card", Card);
        // CardLibrary
        fgui.UIObjectFactory.setExtension("ui://SlayTheSpire/CardLibraryCont", CardLibraryCont);
        fgui.UIObjectFactory.setExtension("ui://SlayTheSpire/CardLibrary", CardLibrary);
        // Map
        fgui.UIObjectFactory.setExtension("ui://SlayTheSpire/Map", MapWin);
        fgui.UIObjectFactory.setExtension("ui://SlayTheSpire/MapCont", MapCont);
        fgui.UIObjectFactory.setExtension("ui://SlayTheSpire/MapItem", MapItem);
        fgui.UIObjectFactory.setExtension("ui://SlayTheSpire/BossMapItem", BossMapItem);
    }

    async loadPackage(bundle: AssetManager.Bundle, name: string) {
        return new Promise<void>((resolve, reject) => {
            fgui.UIPackage.loadPackage(bundle, name, (error: any, pkg: fgui.UIPackage) => {
                if (!error)
                    resolve();
                else
                    reject();
            });
        });
    }

    pool: Map<string, Array<fgui.GObject>> = new Map<string, Array<fgui.GObject>>();

    newWindow<T extends fgui.GComponent>(pkgName: string, winName: string) {
        const url = "ui://" + pkgName + "/" + winName;
        if (this.pool.has(url) && this.pool.get(url).length > 0) {
            const obj = this.pool.get(url).shift();
            fgui.GRoot.inst.addChild(obj);
            return obj as T;
        }
        var win = fgui.UIPackage.createObject(pkgName, winName);
        win.makeFullScreen();
        win.setPosition(0, 0);
        fgui.GRoot.inst.addChild(win);
        return win as T;
    }

    putWindowBack(pkgName: string, winName: string, obj: fgui.GObject) {
        const url = "ui://" + pkgName + "/" + winName;
        if (!this.pool.has(url))
            this.pool.set(url, new Array<fgui.GObject>);
        this.pool.get(url).push(obj);
        fgui.GRoot.inst.removeChild(obj);
    }
}

export const fairyUI = new FairyUI();  