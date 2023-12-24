import { isNative } from "./conn";

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

export var wsNew: WebSocket

export var handleFunc = (msgID: number, param: object) => {

}

export class Tbl {
    declare msgHandler: (msgID: number, param: object) => void
}

export const tbl = new Tbl();

export function createConn() {
    // wsNew = new WebSocket("wss://116.62.129.73:8080/ws");
    wsNew = new WebSocket("ws://116.62.129.73:8080/ws");
    let p = new Promise<void>((resolve, reject) => {
        wsNew.onopen = function () {
            console.log("WebSocket connection opened.");
            resolve();
        };
        wsNew.onmessage = async function (event) {
            console.log(event.data)
            var resp
            if (isNative()) {
                resp = event.data//ab2str(event.data)
            } else {
                resp = event.data
            }
            console.log("recv server msg: " + resp);
            const data = JSON.parse(resp);
            tbl.msgHandler(data[0], data[1]);
        };
        wsNew.onclose = function () {
            console.log("WebSocket connection closed.");
        };
        wsNew.onerror = function (err) {
            console.log("WebSocket error: " + event);
            reject(err);
        };
    });

    return p;
}

export function sendMsgNew(cmd: number, param?: object) {
    const msg = JSON.stringify([cmd, param]);
    console.log("send msg to server: " + msg);
    wsNew.send(msg);
}

