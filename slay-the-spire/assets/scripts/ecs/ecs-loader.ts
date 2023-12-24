import { Engine } from "../third-party/kick-knock/src";


export class ECSLoader {
    isLoaded: boolean = false;
    e: Engine;

    load() {
        this.e = new Engine();

        this.isLoaded = true;
    }
}

export const ecsLoader = new ECSLoader();