import { initGlobalState, registerMicroApps, start, setDefaultMountApp } from 'qiankun'
import { changeLoading } from '../store/loading'
import * as appInfo from '../store'

const state = {
    a: 123,
    b: 234
}
const actions = initGlobalState(state);

actions.onGlobalStateChange((state, prev) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev, '- actions change');
});
actions.setGlobalState(state);
// actions.offGlobalStateChange();

/** 子应用注册到微前端框架里*/
export const registerApp = () => {

    // 注册子应用到微前端框架
    registerMicroApps([
        {
            name: 'micro-vue2', //  子应用唯一标识
            entry: '//localhost:9004',  //  子应用应用入口
            container: '#micro-container',  //  应用与 DOM 对象
            activeRule: '/micro-vue2', //  激活路由
            props: { ...appInfo, actions }
        },
        {
            name: 'micro-vue3',
            activeRule: '/micro-vue3',
            container: '#micro-container',
            entry: '//localhost:9005',
            props: appInfo
        },
        {
            name: 'micro-react17',
            activeRule: '/micro-react17',
            container: '#micro-container',
            entry: '//localhost:9002',
            props: appInfo
        }
    ],
        //  主应用生命周期
        {
            beforeLoad: [() => {
                console.log('主应用加载')
                changeLoading(true)
            }],
            afterMount: [() => {
                console.log('主应用加载完成')
                changeLoading(false)
            }],
            afterUnmount: [() => {
            }]
        })


    // 运行微前端框架
    start()

    setDefaultMountApp('/micro-vue3/#/home-page')
}
