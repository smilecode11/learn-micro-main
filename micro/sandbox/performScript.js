/** 执行 js 脚本 - new Function */
export const performScript = (script) => {
    new Function(script).call(window, window)
}

/** 执行 js 脚本 - eval */
export const performScriptForEval = (script) => {
    eval(script)
}