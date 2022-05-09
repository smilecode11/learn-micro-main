/** 执行 js 脚本 - new Function */
export const performScript = (script, appName, global) => {
    //  通过 window[appName] 获取子应用的 生命周期
    window.proxy = global
    let scriptText = `
        return ((window)=>{
            ${script}
            return window['${appName}']
        })(window.proxy)
    `
    return new Function(scriptText)()
}

/** 执行 js 脚本 - eval */
export const performScriptForEval = (script, appName, global) => {
    window.proxy = global;
    let scriptText = `
        ((window)=>{
            ${script}
            return window['${appName}']
        })(window.proxy)
    `
    return eval(scriptText)
}