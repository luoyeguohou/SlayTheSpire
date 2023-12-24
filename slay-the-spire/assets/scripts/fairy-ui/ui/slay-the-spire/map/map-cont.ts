import * as fgui from "fairygui-cc";
import { BossMapItem } from "./boss-map-item";
import { Random, RandomPool, contains } from "../../../../util/util";
import { fairyUI } from "../../../fairy-ui";
import { Vec2 } from "cc";

// 0宝箱  1 精英 2 问号 3 怪 4休息 5商店

class LinkNode {
	up: Array<number> = new Array<number>();
	down: Array<number> = new Array<number>();
	node: fgui.GComponent;

	constructor(public val: number, public cType: number) { }
}

export class MapCont extends fgui.GComponent {
	declare leftTop: fgui.GGraph;
	declare boss: BossMapItem;
	declare rightBot: fgui.GGraph;

	pool = new RandomPool<number>();

	protected onConstruct(): void {
		this.leftTop = this.getChild("leftTop", fgui.GGraph);
		this.boss = this.getChild("boss", BossMapItem);
		this.rightBot = this.getChild("rightBot", fgui.GGraph);

		this.pool.setEle(0, 2);
		this.pool.setEle(1, 10);
		this.pool.setEle(2, 15);
		this.pool.setEle(3, 45);
		this.pool.setEle(4, 5);
		this.pool.setEle(5, 8);
		this.initMap();

	}

	private getPos(x: number, y: number, lineCnt: number) {
		const posY = (this.leftTop.y - this.rightBot.y) / 15 * (y + 0.5) + this.rightBot.y + Random.IntRange(-30, 30);
		const posX = (this.leftTop.x - this.rightBot.x) / lineCnt * (x + 0.5) + this.rightBot.x;
		return new Vec2(posX, posY)
	}

	private getLinePos(y: number, line: Array<LinkNode>) {
		const posRet = new Array<Vec2>();
		const randoms = new Array<number>();
		var sum = Random.IntRange(20, 100);
		line.forEach((ele, x) => {
			const r = Random.IntRange(60, 100);
			randoms.push(r);
			sum += r;
			posRet.push(this.getPos(x, y, line.length))
		});
		var posNow = 0;
		line.forEach((ele, x) => {
			posRet[x].x = (randoms[x] + posNow) / sum * (this.leftTop.x - this.rightBot.x) + this.rightBot.x;
			posNow += randoms[x];
		});
		return posRet;
	}

	private getRandomCType(y: number) {
		if (y == 0) return 3
		if (y == 7) return 0
		if (y == 14) return 4
		return this.pool.chooseOne(false);
	}

	private initMap() {
		const maps: Array<Array<LinkNode>> = new Array<Array<LinkNode>>();
		for (var i = 0; i < 15; i++) {
			const ary = new Array<LinkNode>();
			for (var j = 0; j < Random.IntRange(3, 5); j++) {
				ary.push(new LinkNode(j, this.getRandomCType(i)));
			}
			maps.push(ary);
		}

		maps.forEach((mapLine, y) => {
			const linePos = this.getLinePos(y, mapLine);
			mapLine.forEach((ele, x) => {
				var win = fgui.UIPackage.createObject("SlayTheSpire", "MapItem");
				win.setPivot(0.5, 0.5, true);
				console.log(linePos[x])
				win.setPosition(linePos[x].x, linePos[x].y);
				console.log(win.x + "  " + win.y)
				this.addChild(win);
				console.log(win.x + "  " + win.y)
				ele.node = win.asCom;
			})
		})

		for (var y = 0; y < 14; y++) {
			this.link(maps[y + 1], maps[y]);
			maps[y].forEach((ele, x) => {
				ele.up.forEach(up => {
					this.genLine(new Vec2(ele.node.x, ele.node.y), new Vec2(maps[y + 1][up].node.x, maps[y + 1][up].node.y))
				});
			})
		}
		maps[14].forEach((ele, x) => {
			this.genLine(new Vec2(ele.node.x, ele.node.y), new Vec2(this.boss.x, this.boss.y));
		})

		maps.forEach((mapLine, y) => {
			mapLine.forEach((ele, x) => {
				ele.node.asCom.getController("iType").selectedIndex = ele.cType;
			})
		})

	}

	genLine(posA: Vec2, posB: Vec2) {
		var win = fgui.UIPackage.createObject("SlayTheSpire", "MapLine");
		win.setPivot(0.5, 0.5, true);
		win.setPosition((posA.x + posB.x) / 2, (posA.y + posB.y) / 2);
		win.rotation = (posA.x > posB.x ? -1 : 1) * Vec2.angle(posA.clone().subtract(posB), new Vec2(0, 1)) * 180 / Math.PI;
		this.addChild(win);
		win.height = Vec2.len(posA.clone().subtract(posB));

		// win.height  win.width

		const lineCnt = Math.floor((win.height - 60) / 20);
		const curPos = new Vec2(40, win.height - 40);
		for (var i = 0; i < lineCnt; i++) {
			var lineItem = fgui.UIPackage.createObject("SlayTheSpire", "MapLineItem");
			lineItem.setPivot(0.5, 1, true);
			win.asCom.addChild(lineItem);
			curPos.x += Random.IntRange(-5, 5)
			curPos.y += Random.IntRange(-5, 5)
			lineItem.setPosition(curPos.x, curPos.y);
			lineItem.rotation = Random.IntRange(-15, 15)
			curPos.x -= 0;
			curPos.y -= 20;
		}
	}

	link = (ups: Array<LinkNode>, downs: Array<LinkNode>) => {
		var upIdx = 0
		var downIdx = 0

		// 基础link
		while (true) {
			// 连接
			ups[upIdx].down.push(downIdx)
			downs[downIdx].up.push(upIdx)
			const upRemain = ups.length - 1 - upIdx
			const downRemain = downs.length - 1 - downIdx
			if (upRemain >= downRemain * 2) {
				upIdx++;
			} else if (downRemain >= upRemain * 2) {
				downIdx++;
			} else {
				// 小概率停留，大概率走一步
				var upAdd = false;
				var downAdd = false;
				if (Math.random() > 0.3) {
					upIdx++;
					upAdd = true;
				}
				if (Math.random() > 0.3) {
					downIdx++;
					downAdd = true;
				}

				if (!upAdd && !downAdd) {
					if (Math.random() > 0.5)
						upIdx++;
					else
						downIdx++;
				}
			}

			if (upIdx == ups.length - 1 && downIdx == downs.length - 1) {
				ups[upIdx].down.push(downIdx)
				downs[downIdx].up.push(upIdx)
				break;
			}
		}

		// 额外连接
		const extraLinks = Array<Array<number>>();
		downs.forEach((down, idx) => {
			if (down.up[down.up.length - 1] + 1 <= ups.length - 1) {
				// 右边的没有跟down.up[down.up.length - 1]连接

				if (!contains(downs[idx + 1].up, down.up[down.up.length - 1])) {
					extraLinks.push([down.val, down.up[down.up.length - 1] + 1])
				}
			}
			if (down.up[0] - 1 >= 0) {
				if (!contains(downs[idx - 1].up, down.up[0])) {
					extraLinks.push([down.val, down.up[0] - 1]);
				}
			}
		})

		if (Math.random() > 0.5 && extraLinks.length > 0) {
			const extraEle = Random.Ele(extraLinks);
			ups[extraEle[1]].down.push(extraEle[0]);
			downs[extraEle[0]].up.push(extraEle[1]);
		}
	}
}