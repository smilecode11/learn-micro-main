import { registerMicroApps, start } from '../../micro'
import { changeLoading } from '../store/loading'

/** 子应用注册到微前端框架里*/
export const registerApp = (list) => {

    // 注册子应用到微前端框架
    registerMicroApps(list, {
        beforeMount: [() => {
            console.log('主应用加载前')
            changeLoading(true)
        }],
        mounted: [() => {
            console.log('主应用加载完成')
            changeLoading(false)
        }],
        destoryed: [() => {
            console.log('主应用卸载')
        }]
    })

    // 运行微前端框架
    start()
}
