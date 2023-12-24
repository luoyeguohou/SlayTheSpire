import { JsonAsset } from "cc";
import { assetLoader } from "../util/asset-loader";
import { ProgressChecker } from "../util/util";
import { CardCfg, createCardCfg } from "./card-cfg";

export class DesignData {
    // card
    declare cardCfgs: Map<number, Array<CardCfg>>;

    private loadJsonData(designData: any) {
        //card
        this.cardCfgs = createCardCfg(designData.CardCfg);
    }

    public async load(progChecker: ProgressChecker) {
        console.log("load cfg design");
        let jsonAsset = await assetLoader.loadBundleAsset("data", "design", JsonAsset);
        progChecker.addProgress("design", 10);
        this.loadJsonData(jsonAsset.json);
    }
}

export const dd = new DesignData();