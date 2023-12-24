import { sys } from "cc";
import log from "loglevel";
import { Either, isLeft } from "../third-party/fp-ts/Either";
import { md5 } from "../third-party/md5";
import { Client } from "./http";
import { ServerMSG } from "./server-msg";
import { ecsLoader } from "../ecs/ecs-loader";
// import { OnServerConnCloseMSG, ReconnectFailedMSG } from "../ecs/ecs-message";
import { WeChat } from "../sdk/wechat/wx-sdk";

function Utf8ArrayToStr(array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = array.length;
    i = 0;
    while (i < len) {
        c = array[i++];
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c);
                break;
            case 12: case 13:
                // 110x xxxx 10xx xxxx
                char2 = array[i++];
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
            case 14:
                // 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = array[i++];
                char3 = array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}

function ab2str(buf) {
    return Utf8ArrayToStr(new Uint8Array(buf))
}

export function isNative() {
    return typeof wx !== 'undefined'
}

class WebSocketManager {
    private declare _uid: string;
    private declare _token: string;
    private declare _pwd: string;
    private declare _aid: string;
    private declare _socket: WebSocket;

    constructor(conn: Conn) {
        this._belongServerManager = conn;
    }

    get connected(): boolean {
        return this._socket != null && this._socket.readyState === WebSocket.OPEN;
    }

    private declare _belongServerManager: Conn;

    connect(token: string, pwd: string, gameUrl: string) {
        if (this._socket) {
            this._socket.close();
        }

        this._token = token;
        this._pwd = pwd;
        this._socket = new WebSocket(gameUrl);
        console.log("new this._socket " + gameUrl);
        let p = new Promise<void>((resolve, reject) => {
            this._socket.onmessage = async evt => {
                console.log(evt.data)
                var resp
                if (isNative()) {
                    resp = ab2str(evt.data)
                } else {
                    resp = await evt.data.text()
                }
                console.log("recv server msg: " + resp);
                const data = JSON.parse(resp);
                this._belongServerManager.msgHandler(data[0], data[1]);
            };
            this._socket.onopen = () => {
                console.log("socket onOpen");
                resolve();
                this.sendMsg(ServerMSG.Login, { "startup_ts": -1, "pid": 0, "p": this._pwd, "token": token });
            };
            this._socket.onerror = (err) => {
                console.log("ws connection error");
                reject(err);
            };
            this._socket.onclose = () => {
                console.log("this._socket close");
                this._socket = undefined;
                // ecsLoader.e.dispatch(new OnServerConnCloseMSG());
            };
        });
        return p;
    }

    sendMsg(cmd: number, param?: object) {
        if (!this.connected) {
            return Promise.reject(new Error('Not connected.'));
        }
        const msg = JSON.stringify([cmd, param]);
        console.log("send msg to server: " + msg);
        this._socket.send(msg);
    }
}

interface ServerConfig {
    url: string,
    load: string,
    zid: number,
    name: string,
    type: number,
}

class Conn {
    private _accountUrl: string = "https://tj.taojingame.com:12345/summoner/account/api";
    private _client: Client = new Client();

    private _serverList: Map<number, ServerConfig> = new Map<number, ServerConfig>();
    get serverList(): Map<number, ServerConfig> { return this._serverList; }

    newServerList: Map<number, ServerConfig> = new Map<number, ServerConfig>();

    private declare _gateURL: string;
    private declare _token: string;
    private declare _aid: string;
    private declare _pwd: string;
    private declare _setting: Map<string, string>;

    private declare _histories: Array<any>;
    private declare _recommends: any;

    private declare _ws: WebSocketManager;
    get ws(): WebSocketManager { return this._ws; }

    private declare _defaultZid: number;

    private reconnectCnt: number = 0;

    declare msgHandler: (msgID: number, param: object) => void;

    declare redirectURL: string;

    constructor() {
        this._ws = new WebSocketManager(this);
    }

    private setConnData(data, pwd: string) {
        this._gateURL = data.gate_url;
        console.log(this._gateURL)
        this._token = data.token;
        this._setting = data.setting;

        this._aid = data.aid;
        this._pwd = data.p;
        sys.localStorage.setItem("aid", data.aid.toString());
        if (data.p !== undefined) {
            sys.localStorage.setItem("pw", data.p.toString());
        } else {
            let store_pw = sys.localStorage.getItem("pw");
            if (store_pw !== pwd) {
                sys.localStorage.setItem("pw", pwd);
            }
        }

        this._histories = data.zoneinfo.list.Historys
        this._recommends = data.zoneinfo.list.Recos

        if (this._histories.length > 0) {
            this._histories.forEach(data => {
                const zid = data.zid;
                const name = data.zname;
                const zType = data.ztype;
                this.newServerList.set(zid, { url: "", zid: zid, name: name, type: zType, load: "" });
            });
        } else {
            const zid = this._recommends[0].zid;
            const name = this._recommends[0].zname;
            const zType = this._recommends[0].ztype;
            this.newServerList.set(zid, { url: "", zid: zid, name: name, type: zType, load: "" });
        }
    }

    async connect(aid: string, pwd: string): Promise<Error | number> {
        console.log("requestToken")
        const ret = await this.requestToken(aid, pwd);
        if (ret !== 0) {
            return ret;
        }

        console.log("requestSrvList")
        const retSrvList = await this.requestSrvList();
        if (retSrvList !== 0) {
            return retSrvList;
        }

        await this.connectGameServer(this.newServerList.get(this._defaultZid).url);
        return 0;
    }

    async selectSrv(zid?: number): Promise<void> {
        zid = zid ? zid : this._defaultZid;
        const serverData = this._serverList.get(zid);
        sys.localStorage.setItem("SelectZid", serverData.zid.toString());
        await this.connectGameServer(serverData.url);
    }

    private async connectGameServer(url: string) {
        await this._ws.connect(this._token, this._pwd, url);
    }

    reconnect() {
        if (this.reconnectCnt > 3) {
            // ecsLoader.e.dispatch(new ReconnectFailedMSG());
            this.reconnectCnt = 0;
            return;
        }
        this.reconnectCnt++;
        setTimeout(() => this.realReconnect(), 3000);
    }

    private async realReconnect(): Promise<number | Error> {
        if (!this._token) {
            const ret = await this.requestToken(this._aid, this._pwd);
            if (ret !== 0) {
                return ret;
            }
        }

        if (this._serverList.size === 0) {
            const retSrvList = await this.requestSrvList();
            //101 present multi server 
            if (retSrvList !== 0 && retSrvList !== 101) {
                return retSrvList;
            }
        }

        await this.connectGameServer(this.newServerList.get(this._defaultZid).url);
        return 0;
    }

    async requestToken(aid: string, pwd: string): Promise<Error | number> {
        this._aid = aid;
        this._pwd = pwd;

        let ts = new Date().getTime();
        let post_data = {
            "cmd": "logincheck",
            "aid": +aid,
            "ts": ts,
            "b_str": "",
            "e_key": "801693",
            "chk_sum": md5.hex_md5(JSON.stringify({ ts: ts }) + pwd + (5273 * 8753).toString()),
        };

        if (isNative() && WeChat.hasRequestCode()) {
            const bStrData = {
                thirdLogin: {
                    "type": 2,
                    "wxcode": WeChat.code
                }
            }
            post_data.b_str = JSON.stringify(bStrData);
        }

        let ret: Either<Error, string> = await this._client.POST(this._accountUrl, JSON.stringify(post_data));

        let post_data2 = {
            "cmd": "GetZoneCatalog",
            "ts": ts,
            "chk_sum": md5.hex_md5(JSON.stringify({ ts: ts }) + (5273 * 8753).toString()),
        };
        let ret2: Either<Error, string> = await this._client.POST(this._accountUrl, JSON.stringify(post_data2));
        console.log(ret2);

        //Error
        if (isLeft(ret)) {
            console.log(ret.left)
            return ret.left;
        }

        let resp = JSON.parse(ret.right);
        console.log(resp)
        this.setConnData(resp.data, pwd);

        await this._client.POST(this._accountUrl, JSON.stringify({ "cmd": "ShowLog", "cont": "setConnData over", }));

        return resp.ret;
    }

    private async requestSrvList(): Promise<Error | number> {
        let zidStr: string = sys.localStorage.getItem("SelectZid");
        console.log("zidStr:" + zidStr)
        console.log(this.newServerList)
        var srvConfig: ServerConfig;

        await this._client.POST(this._accountUrl, JSON.stringify({ "cmd": "ShowLog", "cont": "ready set srvConfig", }));

        if (zidStr == "" || zidStr == null) {
            const srvAry = Array.from(this.newServerList.values());
            srvConfig = srvAry[0];
        } else if (parseInt(zidStr) != 0 && this.newServerList.size > 1) {
            srvConfig = this.newServerList.get(parseInt(zidStr));
        } else {
            const srvAry = Array.from(this.newServerList.values());
            srvConfig = srvAry[0];
        }
        await this._client.POST(this._accountUrl, JSON.stringify({ "cmd": "ShowLog", "cont": "set srvConfig over " + srvConfig.zid.toFixed(0), }));
        this._defaultZid = srvConfig.zid;
        sys.localStorage.setItem("SelectZid", srvConfig.zid.toFixed(0))

        let ret = await this._client.POST(this._gateURL, JSON.stringify({ token: this._token, t: 0, zid: srvConfig.zid }));
        console.log(ret)
        //Error
        if (isLeft(ret)) {
            await this._client.POST(this._accountUrl, JSON.stringify({ "cmd": "ShowLog", "cont": "set srvConfig over " + ret.left.message }));
            return ret.left;
        }

        await this._client.POST(this._accountUrl, JSON.stringify({ "cmd": "ShowLog", "cont": "set srvConfig over " + ret.right }));
        let resp = JSON.parse(ret.right);
        const data = resp[srvConfig.zid.toFixed(0)].servers[0]
        srvConfig.load = data.load;
        srvConfig.url = data.url;
        return 0;
    }
};

const conn = new Conn();

export { conn };