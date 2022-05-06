import { getList } from '../const/subApps'

/** 路由 - 补丁*/
export const patchRouter = (globalEvent, eventName) => {
    return function () {
        const e = new Event(eventName)
        globalEvent.apply(this, arguments)
        window.dispatchEvent(e)
    }
}

/** 查找当前路由*/
export const currentApp = () => {
    const currentUrl = window.location.pathname;
    return filterApp('activeRoute', currentUrl)
}

/** 根据 router 查找子应用*/
export const findAppByRoute = (router) => {
    return filterApp('activeRoute', router)
}

const filterApp = (key, value) => {
    const currentApp = getList().filter((item) => item[key] === value)
    return (currentApp && currentApp.length > 0) ? currentApp[0] : {}
}

/** 判断子应用是否做了切换*/
export const isTurnChild = () => {
    //  保存上一个子应用
    window.__ORIGIN_SUB_APP__ = window.__CURRENT_SUB_APP__;

    const currentApp = window.location.pathname.match(/(\/[\w|-]+)/);
    if (window.__CURRENT_SUB_APP__ === currentApp[0]) {
        return false
    }
    //  子应用发生切换, 重新保存为当前子应用
    if (!currentApp) return
    window.__CURRENT_SUB_APP__ = currentApp[0];
    return true
}