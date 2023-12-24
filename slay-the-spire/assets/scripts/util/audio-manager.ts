import { AudioClip, AudioSource, Prefab, instantiate, sys } from "cc";
import { assetPool } from "./asset-pool";
import { getCurrentSceneScript } from "./util";
import { dd } from "../cfg/design";

// 仅在Main场景中使用，Loading场景请自己处理，别来沾边儿。
export class AudioManager {
    private audioSourcesAry: Array<AudioSource> = new Array<AudioSource>();
    private bgmAudioSource: AudioSource;

    private async getOrGenAudioSource(clip: AudioClip) {
        for (var i = 0; i < this.audioSourcesAry.length; i++) {
            if (!this.audioSourcesAry[i].playing) {
                this.audioSourcesAry[i].clip = clip;
                return this.audioSourcesAry[i];
            }
        }

        // 留一些备用的给bgm等
        if (this.audioSourcesAry.length >= AudioSource.maxAudioChannel - 3) return;

        const prefab = await assetPool.getOrLoad("prefab", "audio-source", Prefab);
        var source = instantiate(prefab).getComponent(AudioSource);
        source.node.setParent(getCurrentSceneScript().node);
        source.clip = clip;
        this.audioSourcesAry.push(source);
        return source;
    }

    private async play(clip: AudioClip, volume = 1) {
        if (!clip) return;
        const audioSource = await this.getOrGenAudioSource(clip);
        if (audioSource === undefined) return;
        audioSource.volume = volume;
        audioSource.play();
        return audioSource;
    }

    async playName(key: string) {
        // const name = dd.audioCfgs.get(key)[AudioManager.audioSettings.get(key)].name;
        // const clip = await assetPool.getOrLoad("audio", name, AudioClip);
        // await this.play(clip);
    }

    async playBgm(key: string) {
        // const name = dd.audioCfgs.get(key)[AudioManager.audioSettings.get(key)].name;
        // const clip = await assetPool.getOrLoad("audio", name, AudioClip);

        // if (!this.bgmAudioSource)
        //     this.bgmAudioSource = await this.getOrGenAudioSource(clip);
        // else {
        //     this.bgmAudioSource.stop();
        //     this.bgmAudioSource.clip = clip;
        // }
        // this.bgmAudioSource.loop = true;
        // this.bgmAudioSource.play()
    }

    clear() {
        this.audioSourcesAry = new Array<AudioSource>();
        this.bgmAudioSource = null;
    }

    static audioSettings: Map<string, number> = new Map<string, number>();
    private static loaded: boolean;

    static load() {
        if (AudioManager.loaded) return;
        AudioManager.loaded = true;
        const str = sys.localStorage.getItem("audioSetting")
        if (str == "" || str == null) {
            // dd.audioCfgs.forEach((_, key) => {
            //     AudioManager.audioSettings.set(key, 0);
            // })
            return;
        }
        const tbl = JSON.parse(str)
        for (var key in tbl) {
            AudioManager.audioSettings.set(key, tbl[key])
        } 
    }

    static save() {
        const saveTbl = {}
        AudioManager.audioSettings.forEach((val, key) => {
            saveTbl[key] = val
        })
        sys.localStorage.setItem("audioSetting", JSON.stringify(saveTbl))
    }
}

export const audioManager = new AudioManager();


