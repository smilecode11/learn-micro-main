import { performScript } from './performScript'
// import { SnapShotSandbox } from './snapShotSandbox'
import { ProxySandbox } from './proxySandbox'

const isCheckLifeCycle = (lifeCycle) => lifeCycle &&
    lifeCycle.bootstrap &&
    lifeCycle.mount &&
    lifeCycle.unmount
    ;

/** 子应用生命周期, 环境变量设置*/
export const sandBox = (app, script) => {
    // 设置环境变量 - 启用微前端环境
    window.__MICRO_WEB__ = true

    let proxy = new ProxySandbox()

    if (!app.proxy) {
        app.proxy = proxy
    }

    //  运行 js 文件
    const lifeCycle = performScript(script, app.name, app.proxy.proxy)

    //  生命周期挂载到 app 上
    if (isCheckLifeCycle(lifeCycle)) {
        app.bootstrap = lifeCycle.bootstrap
        app.mount = lifeCycle.mount
        app.unmount = lifeCycle.unmount
    }
}