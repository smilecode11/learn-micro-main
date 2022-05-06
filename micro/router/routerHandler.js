import { isTurnChild } from '../utils'
import { lifeCycle } from '../lifeCycle'
export const turnApp = async () => {
    if (isTurnChild()) {
        // 执行微前端框架生命周期
        await lifeCycle()
        console.log("路由更新")
    }
}