import { Asset } from "cc";
import { assetLoader } from "./asset-loader";
import { ProgressChecker } from "./util";

export type AssetConstructor<T = unknown> = new (...args: any[]) => T;
export class AssetPool {
    async init(progChecker: ProgressChecker) {
        await assetLoader.loadBundle("ui");
        progChecker.addProgress("asset", 25);
        await assetLoader.loadBundle("ui-language");
        progChecker.addProgress("asset", 25);
        await assetLoader.loadBundle("data");
        progChecker.addProgress("asset", 25);
        await assetLoader.loadBundle("font");
        progChecker.addProgress("asset", 25);
    }

    private _pool: Map<string, Asset> = new Map<string, Asset>();

    async getOrLoad<T extends Asset>(bundleName: string, assetName: string, assetType: AssetConstructor<T>): Promise<T> {
        const key = bundleName + "&" + assetName;
        if (this._pool.has(key))
            return this._pool.get(key) as T;

        const asset = await assetLoader.loadBundleAsset(bundleName, assetName, assetType);
        this._pool.set(key, asset);
        return asset as T;
    }

    get(bundleName: string, assetName: string) {
        const key = bundleName + "&" + assetName;
        return this._pool.get(key);
    }
}

export const assetPool = new AssetPool();
