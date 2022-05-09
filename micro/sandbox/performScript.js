/** 执行 js 脚本 - new Function */
export const performScript = (script, appName, global) => {
    //  通过 window[appName] 获取子应用的 生命周期
    let scriptText = `
        ${script}
        return window['${appName}']
    `
    return new Function(scriptText).call(global, global)
}

/** 执行 js 脚本 - eval */
export const performScriptForEval = (script, appName, global) => {
    let scriptText = `
        () => {
            ${script}
            return window['${appName}']
        }
    `
    return eval(scriptText).call(global, global)
}