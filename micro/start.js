import { setList, getList } from './const/subApps'
import { setMainLifeCycle } from './const/mainLifeCycle'
import { currentApp } from './utils'
import { rewriteRouter } from './router/rewriteRouter'

// 实现路由拦截
rewriteRouter()

/** 注册子应用*/
export const registerMicroApps = (appList, lifeCycle) => {
    setList(appList)

    //  主应用生命周期写入
    setMainLifeCycle(lifeCycle)

    // lifeCycle.beforeLoad[0]()

    // setTimeout(() => {
    //     lifeCycle.mounted[0]()
    // }, (3000));
}

/** 启动微前端框架*/
export const start = () => {
    //  验证子应用列表是否为空
    const apps = getList()
    if (!apps.length) throw Error("子应用列表为空, 请正确注册")

    //  查找符合当前路由的子应用路由
    const app = currentApp()

    const { pathname, hash } = window.location
    if (app) {
        const url = pathname + hash

        window.__CURRENT_SUB_APP__ = app.activeRoute

        window.history.pushState('', '', url)
    }
}