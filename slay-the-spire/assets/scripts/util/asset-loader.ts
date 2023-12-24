import { _decorator, Asset, AssetManager, assetManager } from 'cc';
import { AssetConstructor } from './asset-pool';

export class AssetLoader {
    async loadAsset<T extends Asset>(bundle: AssetManager.Bundle, assetName: string, assetType: AssetConstructor<T>) {
        return new Promise<Asset>((resolve, reject) => {
            bundle.load(assetName, assetType, (err, asset) => {
                if (err) {
                    return reject(undefined);
                }
                resolve(asset as T);
            });
        });
    }

    private bundles = new Map<string, AssetManager.Bundle>();

    async loadBundle(name: string) {
        if (this.bundles.has(name))
            return this.bundles.get(name);

        return new Promise<AssetManager.Bundle>((resolve, reject) => {
            assetManager.loadBundle(name, (err, bundle) => {
                if (err) {
                    return reject(undefined);
                }
                this.bundles.set(name, bundle);
                resolve(bundle);
            });
        });
    }

    async loadBundleAsset<T extends Asset>(bundleName: string, assetName: string, assetType: AssetConstructor<T>) {
        const bundle = await this.loadBundle(bundleName);
        const asset = await this.loadAsset(bundle, assetName, assetType);
        return asset as T;
    }
}

export const assetLoader = new AssetLoader();