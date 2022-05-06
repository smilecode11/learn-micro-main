export const subNavList = [
    {
        name: 'micro-vue2', //  子应用唯一标识
        activeRoute: '/micro-vue2/', //  激活路由
        container: '#micro-container',  //  应用与 DOM 对象
        entry: '//localhost:9004/'  //  子应用应用入口
    },
    {
        name: 'micro-vue3',
        activeRoute: '/micro-vue3/',
        container: '#micro-container',
        entry: '//localhost:9005/'
    },
    {
        name: 'micro-react17',
        activeRoute: '/micro-react17/',
        container: '#micro-container',
        entry: '//localhost:9002/'
    }
]