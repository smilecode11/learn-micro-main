import { registerMicroApps, start, createStore } from '../../micro'
import { changeLoading } from '../store/loading'

const store = createStore()
window.store = store;   //  赋值给 window 作属性

const storeData = store.getStore()

store.subscribe((value, oldValue) => {
    console.log(value, oldValue, '- subscribe')
})

store.update({
    ...storeData,
    a: 123
})

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
