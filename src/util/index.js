import { registerMicroApps, start } from '../../micro'
import { changeLoading } from '../store/loading'

/** 子应用注册到微前端框架里*/
export const registerApp = (list) => {

    // 注册子应用到微前端框架
    registerMicroApps(list, {
        beforeLoad: [() => {
            changeLoading(true)
        }],
        mounted: [() => {
            changeLoading(false)
        }],
        destoryed: [() => {
        }]
    })

    // 运行微前端框架
    start()
}
