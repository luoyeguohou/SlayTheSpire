interface ProfilerData {
    cnt: number;
    duration: number;
    name: string;
}

export class Profiler {
    public useDebug = false;
    public data: Map<string, ProfilerData> = new Map<string, ProfilerData>();
    public tmpData: Map<string, number> = new Map<string, number>();

    start(name: string) {
        if (!this.useDebug)
            return;
        this.tmpData.set(name, new Date().getTime());
    }

    end(name: string) {
        if (!this.useDebug)
            return;
        const duration = new Date().getTime() - this.tmpData.get(name);

        if (!this.data.has(name))
            this.data.set(name, { cnt: 0, duration: 0, name: name });

        this.data.get(name).cnt += 1;
        this.data.get(name).duration += duration;
    }

    log() {
        this.data.forEach(data => {
            console.log(data.name + " call cnt:" + data.cnt + ". spend:" + data.duration + " ms.");
        })
        this.data = new Map<string, ProfilerData>();
    }
}

export const profiler = new Profiler();



