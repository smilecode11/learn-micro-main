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
    const { pathname, hash } = window.location
    const url = pathname + hash

    const currentPrefix = url.match(/(\/[\w|-]+)/g)

    if (currentPrefix && currentPrefix[0] === window.__CURRENT_SUB_APP__) {
        return false
    }

    //  保存上一个子应用
    window.__ORIGIN_SUB_APP__ = window.__CURRENT_SUB_APP__;

    const currentSubApp = window.location.pathname.match(/(\/[\w|-]+)/);
    if (!currentSubApp) return

    // TODO: vue3 路由读取 location.pathname 待解决
    // console.log(window.__CURRENT_SUB_APP__, '- isTurnChild')

    //  子应用发生切换, 重新保存为当前子应用
    window.__CURRENT_SUB_APP__ = currentSubApp[0];
    return true
} 