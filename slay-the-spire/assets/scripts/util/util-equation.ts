import { lerp, Node, tween, Vec2, Vec3 } from "cc";

type P = Vec2 | Vec3;

// 函数图，传入x返回y，或者返回Vec2、Vec3

export abstract class Equation {
    abstract calVal(x: number): number;
    calV2(x: number): Vec2 {
        return new Vec2(x, this.calVal(x));
    }
    calV3(x: number): Vec3 { 
        return new Vec3(x, this.calVal(x));
    }
}

// quadratic equation y = a * x^2 + b * x + c
export class QuadEquation extends Equation {
    a: number;
    b: number;
    c: number;

    constructor(p1: P, p2: P, p3: P) {
        super();
        this.a = ((p1.y - p2.y) * (p1.x - p3.x) - (p1.y - p3.y) * (p1.x - p2.x)) /
            ((p1.x - p3.x) * (p1.x * p1.x - p2.x * p2.x) - (p1.x - p2.x) * (p1.x * p1.x - p3.x * p3.x));
        this.b = ((p1.y - p2.y) - this.a * (p1.x * p1.x - p2.x * p2.x)) / (p1.x - p2.x);
        this.c = p1.y - this.a * p1.x * p1.x - this.b * p1.x;
    }

    calVal(x: number) {
        return this.a * x * x + this.b * x + this.c
    }

    getSymmetry(x: number) {
        return new QuadEquation(new Vec2(x, this.calVal(x)), new Vec2(x + 1, this.calVal(x - 1)), new Vec2(x + 2, this.calVal(x - 2)));
    }
}

// section function
export class SectionEquation extends Equation {
    equations: Array<Equation>;
    sections: Array<number>;

    constructor(equations: Array<Equation>, sections: Array<number>) {
        super();
        console.assert(equations.length - 1 === sections.length);
        this.equations = equations;
        this.sections = sections;
    }

    calVal(x: number): number {
        if (x < this.sections[0])
            return this.equations[0].calVal(x);

        for (var i = this.sections.length; i >= 0; i--) {
            if (x >= this.sections[i])
                return this.equations[i + 1].calVal(x);
        }
        // return tan(90 degree)
        return -1;
    }
}

export class LinerEquation extends Equation {
    a: number;
    b: number;

    constructor(p1: P, p2: P) {
        super();
        this.a = (p1.y - p2.y) / (p1.x - p2.x);
        this.b = p1.y - this.a * p1.x;
    }

    calVal(x: number): number {
        return this.a * x + this.b;
    }
}

export class VerLinerEquation extends Equation {
    x: number;
    constructor(x: number) {
        super();
        this.x = x;
    }

    calVal(y: number): number {
        return this.x;
    }

    calV3(y: number) {
        return new Vec3(this.x, y);
    }

    calV2(y: number) {
        return new Vec2(this.x, y);
    }
}


export class SinEquation extends Equation {
    // a *  Math.sin(b * x + c) + d
    a: number;
    b: number;
    c: number;
    d: number;

    constructor(p1: P, a: number, b: number) {
        super();
        this.a = a;
        this.b = b;
        this.d = p1.y;
        this.c = Math.asin(0) - this.b * p1.x;
    }

    calVal(x: number): number {
        return this.a * Math.sin(this.b * x + this.c) + this.d;
    }
}

export const tweenEquation = (node: Node, startX: number, endX: number, equation: Equation, duration: number, onComplete?: () => void) => {
    return tween(node.position).to(duration, equation.calV3(endX), {
        onUpdate: (target: Vec3, ratio: number) => {
            if (!node.activeInHierarchy)
                return;
            const x = lerp(startX, endX, ratio);
            node.worldPosition = equation.calV3(x);
        },
        onComplete: onComplete,
    }).start();
}