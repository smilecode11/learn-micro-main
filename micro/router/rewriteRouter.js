import { patchRouter } from '../utils/index'
import { turnApp } from './routerHandler'
export const rewriteRouter = () => {
    window.history.pushState = patchRouter(window.history.pushState, 'micro_push')
    window.history.replaceState = patchRouter(window.history.replaceState, 'micro_replace')

    //  注册 push 和 repace
    window.addEventListener('micro_push', turnApp)
    window.addEventListener('micro_replace', turnApp)

    //  侦听浏览器返回
    window.onpopstate = function () {
        turnApp()
    }
}