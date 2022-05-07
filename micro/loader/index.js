import { fetchReSource } from '../utils/fetchReSource'
/** 加载 html*/
export const loader = async (app) => {
    let { entry, container } = app;
    // 子应用内容显示容器 - container

    //  子应用入口文件 - entry
    const html = await parseHtml(entry)

    let ct = document.querySelector(container)

    if (!ct) {
        throw new Error("请检查子应用容器")
    }

    //  容器内容重写
    ct.innerHTML = html

    return app
}

/** 解析子应用 html*/
export const parseHtml = async (entry) => {
    //  通过请求获取html -> fetch
    let html = await fetchReSource(entry)

    const div = document.createElement('div')
    div.innerHTML = html

    //  处理标签, link, script(src, js)
    // const [dom, scripUrl, script] = await parseJS()

    return html;
}

export const parseJS = async () => {
    // retrun [dom, scripUrl, script]
}