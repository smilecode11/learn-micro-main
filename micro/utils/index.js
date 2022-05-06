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

const filterApp = (key, value) => {
    const currentApp = getList().filter((item) => item[key] === value)
    return (currentApp && currentApp.length > 0) ? currentApp[0] : {}
}

/** 子应用是否做了切换*/
export const isTurnChild = () => {
    console.log(window.__CURRENT_SUB_APP__, window.location.pathname, '- isTurnChild')
    if (window.__CURRENT_SUB_APP__ === window.location.pathname) {
        return false
    }
    return true
}