//  沙箱快照 - 隔离应用变量
export class SnapShotSandbox {
    constructor() {
        //  代理对象
        this.proxy = window

        this.active()
    }

    //  沙箱激活
    active() {
        //  创建一个沙箱快照
        this.snapshot = new Map()

        //  遍历全局变量
        for (const key in window) {
            this.snapshot[key] = window;
        }
    }

    //  沙箱销毁
    inActive() {
        for (const key in window) {
            if (window[key] !== this.snapshot[key]) {
                // TODO: TypeError: Cannot set property document of #<Window> which has only a getter
                // window[key] = this.snapshot[key]
            }
        }
    }
}
