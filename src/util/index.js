import { registerMicroApps, start } from '../../micro'

/** 子应用注册到微前端框架里*/
export const registerApp = (list) => {
    // 注册子应用到微前端框架
    registerMicroApps(list)
    
    // 运行微前端框架
    start()
}
