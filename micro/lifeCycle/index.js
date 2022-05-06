import { getMainLifeCycle } from '../const/mainLifeCycle'
import { findAppByRoute } from '../utils'
/** 微前端框架生命周期*/
export const lifeCycle = async () => {
    //  获取上一个子应用
    let prevApp = findAppByRoute(window.__ORIGIN_SUB_APP__)

    //  获取即将跳转到的子应用
    let nextApp = findAppByRoute(window.__CURRENT_SUB_APP__)

    console.log(prevApp, '-prevApp', nextApp, '-nextApp')

    // 没有匹配到下一个子应用, return
    if (!nextApp.name) return

    //  存在上一个子应用, 执行子应用的卸载
    if (prevApp.name) {
        await destoryed(prevApp)
    }

    // 子应用加载
    const app = await beforeLoad(nextApp)

    // 子应用加载完成
    await mounted(app)

}

/** 加载前生命周期 - 主应用先执行加载前, 子应用才能走到加载前*/
export const beforeLoad = async (app) => {
    await runMainLifeCycle('beforeLoad')
    app && app.beforeLoad && app.beforeLoad()
    //  加载完成需要返回一个 app 上下文, 用于 mounted 内部使用
    let appContext = null
    return appContext
}

/** 加载完成生命周期 - 子应用加载完成时, 主应用也会执行该生命周期*/
export const mounted = async (app) => {
    app && app.mounted && app.mounted()
    await runMainLifeCycle('mounted')
}

/** 卸载生命周期 - 子应用卸载时, 主应用也需要执行卸载*/
export const destoryed = async (app) => {
    app && app.destoryed && app.destoryed()
    // 执行主应用对应的生命周期
    await runMainLifeCycle('destoryed')
}

export const runMainLifeCycle = async (type) => {
    const mainLifeCycle = getMainLifeCycle()
    await Promise.all(mainLifeCycle[type].map(async (item) => await item()))
}   