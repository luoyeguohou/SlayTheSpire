import * as E from "../third-party/fp-ts/Either";

export interface ClientConfig {
    timeoutMs: number;
}

const DEFAULT_TIMEOUT_MSEC = 1000;

export class Client {
    public config: ClientConfig = { timeoutMs: DEFAULT_TIMEOUT_MSEC };

    constructor(cliCfg?: ClientConfig) {
        this.config = cliCfg || this.config;
    }

    public GET(url: string): Promise<E.Either<Error, string>> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.timeout = this.config.timeoutMs;
            xhr.onload = (progress) => {
                resolve(E.right(xhr.responseText));
            };
            xhr.ontimeout = (progress) => {
                reject(E.left(new Error(`get ${url} timeout`)));
            };
            xhr.send();
        });
    };


    public POST(url: string, body: string): Promise<E.Either<Error, string>> {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.timeout = this.config.timeoutMs;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");
            xhr.onload = function (evt) {
                console.log(xhr.responseText);
                resolve(E.right(xhr.responseText));
            };
            xhr.ontimeout = function (evt) {
                reject(E.left(new Error(`get ${url} timeout`)));
            };
            xhr.onerror = function (evt) {
                console.log(evt)
                console.log(xhr.status)
                reject(E.left(new Error(`get ${url} error: ${xhr.status}`)));
            };
            xhr.send(body);
        });
    }
}


