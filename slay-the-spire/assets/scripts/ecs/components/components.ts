import { Buff } from "../../interfaces";
import { Entity } from "../../third-party/kick-knock/src";

export class CardComp{
    id:number;
}

export class OutBattleDeckComp{
    cards:Array<Entity>;
}

export class InBattleCardComp{
    deck:Array<Entity>;
    hand:Array<Entity>;
    disposeCards:Array<Entity>;
}

export class UnitComp{
    hp:number;
    maxHp:number;
    armor:number;
    buff:Map<number,Buff>;
    isPlayer:boolean;
}