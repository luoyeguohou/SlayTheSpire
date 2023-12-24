import { Component, director, Scene, Vec2, Node, Vec3 } from "cc";
import { ecsLoader } from "../ecs/ecs-loader";

// 多项目复用，没用上的也别删除

export const capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
};

export class Random {
    public static IntRange(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    public static Bool() {
        return Random.IntRange(0, 1) === 1;
    }

    public static FloatRange(min: number, max: number) {
        return Math.random() * (max - min) + min
    }

    public static Ele<T>(ary: Array<T>): T | null {
        if (ary.length == 0) return null;
        return ary[Random.IntRange(0, ary.length - 1)];
    }

    public static EleMap<T>(map: Map<any, T>) {
        return Random.Ele(Array.from(map.values()));
    }
}

export function copyAry<T>(ary: ReadonlyArray<T>) {
    return ary.map(ele => ele);
}

export function copyMap<K, V>(map: ReadonlyMap<K, V>) {
    const mapRet = new Map<K, V>();
    map.forEach((val, key) => {
        mapRet.set(key, val);
    });
    return mapRet;
}

export const lerp = (a: number, b: number, r: number) => {
    return r * (b - a) + a;
}

export function any<T>(ary: ReadonlyArray<T>, func: (ele: T) => boolean) {
    var ret = false;
    ary.forEach(ele => {
        if (func(ele))
            ret = true;
    });
    return ret;
}

export function anyMap<K, T>(ary: Map<K, T>, func: (ele: T, key?: K) => boolean) {
    var ret = false;
    ary.forEach((ele, key) => {
        if (func(ele, key))
            ret = true;
    });
    return ret;
}

export function all<T>(ary: ReadonlyArray<T>, func: (ele: T) => boolean) {
    var all = true;
    ary.forEach(ele => {
        if (!func(ele))
            all = false;
    });
    return all;
}

export function allMap<K, T>(ary: Map<K, T>, func: (ele: T, key?: K) => boolean) {
    var all = true;
    ary.forEach((ele, key) => {
        if (!func(ele, key))
            all = false;
    });
    return all;
}

export function findEle<T>(ary: ReadonlyArray<T>, func: (ele: T) => boolean) {
    var ret: T = undefined;
    ary.forEach(ele => {
        if (func(ele))
            ret = ele;
    });
    return ret as T;
}

export const v2AryContains = (ary: Array<Vec2>, aim: Vec2) => {
    var contains = false;
    ary.forEach(ele => {
        if (ele.x === aim.x && ele.y === aim.y) {
            contains = true;
        }
    })
    return contains;
}

export function contains<T>(ary: Array<T>, aim: T) {
    var contains = false;
    ary.forEach(ele => {
        if (ele === aim) {
            contains = true;
        }
    })
    return contains;
}

export const v2AryRemove = (ary: Array<Vec2>, aim: Vec2) => {
    return ary.filter(ele => !(ele.x === aim.x && ele.y === aim.y));
}

export function aryRemove<T>(ary: Array<T>, aim: T) {
    return ary.filter(ele => ele != aim);
}

export function countMap<K, V>(map: Map<K, V>, func: (ele: V) => boolean) {
    var cnt = 0;
    map.forEach(ele => { if (func(ele)) cnt++; });
    return cnt;
}

export function count<V>(ary: Array<V>, func: (ele: V) => boolean) {
    var cnt = 0;
    ary.forEach(ele => { if (func(ele)) cnt++; });
    return cnt;
}


export function shuffle<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
    return array;
};

interface RandomPoolEle<T> {
    ele: T,
    prop: number
}

export class RandomPool<T> {
    private _data: Array<RandomPoolEle<T>> = new Array<RandomPoolEle<T>>();

    setEle(ele: T, prop: number) {
        const contain = any(this._data, poolEle => {
            if (poolEle.ele === ele)
                poolEle.prop = prop;
            return poolEle.ele === ele;
        });

        if (contain)
            return;

        this._data.push({ ele: ele, prop: prop })
    }

    multiProp(ele: T, prop: number) {
        this._data.forEach(poolEle => {
            if (poolEle.ele === ele)
                poolEle.prop *= prop;
        })
    }

    clear() {
        this._data = new Array<RandomPoolEle<T>>();
    }

    chooseOne(removeChosen: boolean) {
        var cnt = 0;
        this._data.forEach(ele => {
            cnt += ele.prop;
        });

        var r = Math.random() * cnt;
        var chosen: T = undefined;
        this._data = this._data.filter(ele => {
            r -= ele.prop;
            if (r <= 0 && chosen === undefined) {
                chosen = ele.ele;
                return !removeChosen;
            }
            return true;
        });

        return chosen;
    }
}

export function shuffleLightly<T>(array: Array<T>, maxIdx: number) {
    const randomBitAry = new Array<number>();
    array.forEach(() => randomBitAry.push(0));
    for (var i = 0; i < array.length; i++) {
        if (randomBitAry[i] === 0) {
            const avaIdx = new Array<number>();
            for (var j = i - maxIdx; j <= i + maxIdx; j++) {
                if (randomBitAry[j] === 0 && j >= 0 && j < array.length)
                    avaIdx.push(j)
            }
            const rIdx = Random.Ele(avaIdx);
            const tmp = array[i];
            array[i] = array[rIdx];
            array[rIdx] = tmp;
            if (i != rIdx) {
                randomBitAry[i] = 1;
                randomBitAry[rIdx] = 1;
            }
        }
    }
    return array
}

export const sum = (array: Array<number>) => {
    var sum = 0;
    array.forEach(ele => sum += ele);
    return sum;
};

export class ProgressChecker {
    private _checkPoints = new Map<string, Array<number>>();
    private _sum: number = 0;
    private _cur: number = 0;
    private handlers: Array<(prog: number) => void> = new Array<(prog: number) => void>();

    addCheckPoint(key: string, sum: number) {
        if (this._checkPoints.has(key)) {
            console.error("dup add key")
            return;
        }

        if (sum == 0)
            return;

        this._checkPoints.set(key, [0, sum]);
        this._sum += sum;
    }

    addProgress(key: string, prog: number) {
        if (!this._checkPoints.has(key))
            return;
        if (this._sum == 0)
            return;
        const cpAry = this._checkPoints.get(key);
        var ori = cpAry[0];
        cpAry[0] = Math.min(cpAry[0] + prog, cpAry[1]);
        this._cur += cpAry[0] - ori;
        this.handlers.forEach(handler => handler(this._cur / this._sum));
    }

    bindFunc(handler: (prog: number) => void) {
        this.handlers.push(handler);
    }
}


export const hasBit = (mask: number, bitPos: number) => {
    let n = 1 << bitPos;
    return (mask & n) !== 0;
};

export const setBit = (mask: number, bitPos: number) => {
    let n = 1 << bitPos;
    return mask | n;
};

export const clrBit = (mask: number, bitPos: number) => {
    let n = 1 << bitPos;
    return mask & ~n;
};

export class BigBit {
    private _data: Array<number>;

    constructor(data: Array<number>) {
        this._data = data;
    }

    hasBit(bitPos: number) {
        const idx = bitPos / 32;

        if (!this._data[idx])
            return false;

        let n = 1 << bitPos % 32;
        return (this._data[idx] & n) !== 0;
    }

    setBit(bitPos: number) {
        if (bitPos < 0)
            return -1;
        const idx = bitPos / 32;

        // todo support expand length
        if (!this._data[idx])
            return -1;
        let n = 1 << bitPos;
        return this._data[idx] | n;
    }

    clrBit(bitPos: number) {
        if (bitPos < 0)
            return -1;

        const idx = bitPos / 32;

        // todo support expand length
        if (!this._data[idx])
            return -1;

        let n = 1 << bitPos;
        return this._data[idx] & ~n;
    }
}

const DEFAULT_SCRIPT_NODE_NAME = "script";

export const getSceneScript = (scene: Scene, scriptNodeName?: string | null): Component => {
    scriptNodeName = scriptNodeName || DEFAULT_SCRIPT_NODE_NAME;
    return scene.getChildByName(scriptNodeName).getComponent(capitalize(scene.name));
};

export const getCurrentSceneScript = <T extends Component>(scriptNodeName?: string | null): T => {
    return getSceneScript(director.getScene(), scriptNodeName) as T;
};

export const getNodeScript = (nodePath: string, scriptName: string): Component => {
    return director.getScene().getChildByPath(nodePath).getComponent(capitalize(scriptName));
};

export const getCurCanvasNode = (): Node => {
    return director.getScene().getChildByPath("Canvas");
};

// export function waitForSeconds(sec: number) {
//     return new Promise<void>((resolve) => {
//         const cntTimeComp = ecsLoader.e.sharedConfig.get(CountTimeComp);
//         cntTimeComp.handlers.push({ handler: resolve, aimTime: cntTimeComp.timeSinceStart + sec });
//     });
// }

export function getRemainSec(aim: Date) {
    const now = new Date();
    return (aim.getTime() - now.getTime()) / 1000;
}

export function secToHourMinuteSec(sumSec: number) {
    const sec = sumSec % 60;
    const hour = Math.floor(sumSec / 3600);
    const minute = Math.floor((sumSec - hour * 3600) / 60);
    return { hour: hour, minute: minute, sec: sec };
}

export function secToHourMinuteSecStr(sumSec: number) {
    const sec = sumSec % 60;
    const hour = Math.floor(sumSec / 3600);
    const minute = Math.floor((sumSec - hour * 3600) / 60);
    return hour.toFixed(0).padStart(2, '0') + ":" + minute.toFixed(0).padStart(2, '0') + ":" + sec.toFixed(0).padStart(2, '0');
}

export function doubleDigitToStr(num: number) {
    if (num < 10) return "0" + num.toFixed(0);
    return num.toFixed(0);
}

export function threeDigitToStr(num: number) {
    if (num < 10) return "00" + num.toFixed(0);
    else if (num < 100) return "0" + num.toFixed(0);
    return num.toFixed(0);
}

// quadratic equation y = a * x^2 + b * x + c
type P = Vec2 | Vec3;
export class QuadEquation {
    a: number;
    b: number;
    c: number;

    constructor(p1: P, p2: P, p3: P) {
        this.a = ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
            ((p1.x - p3.x) * (p1.x * p1.x - p2.x * p2.x) - (p1.x - p2.x) * (p1.x * p1.x - p3.x * p3.x));
        this.b = ((p1.y - p2.y) - this.a * (p1.x * p1.x - p2.x * p2.x)) / (p1.x - p2.x);
        this.c = p1.y - this.a * p1.x * p1.x - this.b * p1.x;
    }

    calVal(x: number) {
        return this.a * x * x + this.b * x + this.c
    }
}

export function getQuadEquation(pos1: Vec2, pos2: Vec2, height: number) {
    if (pos1.y > pos2.y) {
        var temp = pos1;
        pos1 = pos2;
        pos2 = temp;
    }

    // pos1's y is smaller
    const minHeight = pos1.y - height;
    const deltaHeight2 = pos2.y - minHeight;
    const x2_chu_x1 = Math.sqrt(deltaHeight2 / height);

    const deltaX = Math.abs(pos1.x - pos2.x);

    const deltaX2 = deltaX / (1 + 1 / x2_chu_x1)

    var pos3 = new Vec2();
    pos3.y = minHeight;
    if (pos1.x > pos2.x) {
        pos3.x = pos2.x + deltaX2;
    } else {
        pos3.x = pos2.x - deltaX2;
    }

    return new QuadEquation(pos1, pos2, pos3);
}

// 尽量别用，是给ecs初始化之前用的，正常游戏内请使用WaitForSecond
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
