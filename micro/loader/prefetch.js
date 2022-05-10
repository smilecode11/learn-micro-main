import { parseHtml } from './index'
import { getList } from '../const/subApps'

export const prefetch = async () => {
    //  1. 获取到所有子应用 - 不包括正在显示的
    const list = getList().filter(item => !window.location.pathname.startsWith(item.activeRoute))

    //  2. 预计在剩下的所有子应用
    await Promise.all(list.map(async item => await parseHtml(item.entry, item.name)))
}