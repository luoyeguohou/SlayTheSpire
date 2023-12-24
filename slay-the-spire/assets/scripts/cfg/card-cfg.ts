export class CardCfg {
    declare id: number;
    declare cType: number;
    declare color: number;
    declare rare: number;
    declare name: string;
    declare cost: number;
    declare img: string;

    constructor(cfg: any) {
        this.id = cfg.id;
        this.cType = cfg.cType;
        this.color = cfg.color;
        this.rare = cfg.rare;
        this.name = cfg.name;
        this.cost = cfg.cost;
        this.img = cfg.img;
    }
}

export function createCardCfg(datas: Array<any>): Map<number, Array<CardCfg>> {
    const ret = new Map<number, Array<CardCfg>>();
    datas.forEach(data => {
        const cfg = new CardCfg(data);
        console.log(cfg.name)
        if (!ret.has(cfg.color)) ret.set(cfg.color, new Array<CardCfg>());
        ret.get(cfg.color).push(cfg)
    });
    return ret;
}

