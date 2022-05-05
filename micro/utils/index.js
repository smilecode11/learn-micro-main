
/** 路由 - 补丁*/
export const patchRouter = (globalEvent, eventName) => {

    return function () {
        const e = new Event(eventName)
        globalEvent.apply(this, arguments)
        window.dispatchEvent(e)
    }
}