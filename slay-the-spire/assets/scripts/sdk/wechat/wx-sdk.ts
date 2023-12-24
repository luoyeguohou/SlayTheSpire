import { AudioClip, AudioSource } from "cc";
import { ecsLoader } from "../../ecs/ecs-loader";
import { UpdateWeChatDataMsg } from "../../ecs/ecs-message";
import { delay } from "../../util/util";

export class WeChat {
    public static data: any = null;
    public static code: any = null;

    public static hasRequestCode() {
        return WeChat.code != null;
    }

    public static getUserName(): string {
        if (WeChat.data == null) {
            return "";
        }
        return WeChat.data.userInfo.nickName;
    }

    public static getAvatarUrl(): string {
        if (WeChat.data == null) {
            return "";
        }
        return WeChat.data.userInfo.avatarUrl;
    }

    public static createUserButton() {
        let sysInfo = wx.getSystemInfoSync();
        let width = sysInfo.screenWidth;
        let height = sysInfo.screenHeight;
        let button = wx.createUserInfoButton({
            type: 'text',
            text: '',
            style: {
                left: 0,
                top: 0,
                width: width,
                height: height,
                backgroundColor: '#00000000',
                color: '#ffffff',
                textAlign: 'center',
                fontSize: 16,
            }
        });

        button.show();

        return new Promise<void>((resolved, reject) => {
            button.onTap(
                async (res) => {
                    if (res.userInfo) {
                        console.log("auth userData:");
                        console.log(res);
                        WeChat.data = res;
                        resolved();
                    }
                    else {
                        console.log("user deny weChat auth");
                        reject();
                    }
                    button.destroy();
                }
            );
        })
    }

    static async loginUntilSucceed() {
        while (true) {
            await WeChat.login();
            if (WeChat.hasRequestCode()) {
                break;
            }
            await delay(1000);
        }
    }


    static async requestCode() {
        console.log("requestCode");
        await WeChat.loginUntilSucceed();
        const hasAuth = await WeChat.getSetting();
        if (hasAuth) {
            await WeChat.getUseInfo();
            return;
        }

        try {
            await WeChat.createUserButton();
        }
        catch (err) {
        }
    }

    private static async getSetting() {
        return new Promise<boolean>((resolved, reject) => {
            wx.getSetting({
                async success(res) {
                    console.log("getSetting");
                    console.log(res);
                    resolved(res.authSetting["scope.userInfo"])
                }
            });
        });
    }

    public static async getUseInfo() {
        console.log("get user info");
        return new Promise<void>((resolved) => {
            wx.getUserInfo({
                success: function (res) {
                    console.log("user info");
                    console.log(res);
                    WeChat.data = res;
                    resolved();
                },
                fail: function (res) {
                    console.log("fail");
                    console.log(res);
                }
            });
        });
    }

    private static async login() {
        return new Promise<string>((resolved) => {
            wx.login({
                timeout: 10000,
                success: async (res) => {
                    console.log("login info");
                    console.log(res);
                    WeChat.code = res.code;
                    resolved(res.code);
                }
            });
        });
    }

}

let audioPool: Map<string, { audioArr: any[]; count: number }> = new Map();

export function loadAudio(clip: AudioClip) {
    if (!clip) return;

    //@ts-ignore

    let url: string = clip.nativeUrl;

    let data = audioPool.get(url);

    if (!data) {
        data = {
            audioArr: [],
            count: 0,
        };
        audioPool.set(url, data);
    }

    let audioArr = data.audioArr;
    let audio = wx.createInnerAudioContext({
        useWebAudioImplement: true,
    });
    data.count++;
    audioArr.push(audio);
}

export function playAudio(clip: AudioClip, volume = 1) {
    if (!clip) return;
    //@ts-ignore
    let url: string = clip.nativeUrl;
    let data = audioPool.get(url);
    if (!data) {
        data = {
            audioArr: [],
            count: 0,
        };
        audioPool.set(url, data);
    }

    let audioArr = data.audioArr;

    let count: number = data.count;

    let audio = audioArr.shift();

    if (!audio) {
        if (count > 6) {
            return;
        }
        count++;
        data.count = count;
        //@ts-ignore
        audio = wx.createInnerAudioContext({
            useWebAudioImplement: true,
        });
        audio.src = url;
        audio.volume = volume;
        audio.onEnded(() => {
            audioArr.push(audio);
        });
    }
    audio.play();
}