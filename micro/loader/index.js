import { fetchReSource } from '../utils/fetchReSource'
/** 加载 html*/
export const loader = async (app) => {
    let { entry, container } = app;
    // 子应用内容显示容器 - container

    //  子应用入口文件 - entry
    const [dom, script] = await parseHtml(entry)

    let ct = document.querySelector(container)

    if (!ct) {
        throw new Error("请检查子应用容器")
    }

    //  容器内容重写
    ct.innerHTML = dom

    console.log(dom, script, '-loader')

    return app
}

/** 解析子应用 html*/
export const parseHtml = async (entry) => {
    //  通过请求获取html -> fetch
    let html = await fetchReSource(entry)

    //  全部 script 内容集合
    let allScripts = []

    const div = document.createElement('div')
    div.innerHTML = html

    //  处理标签, link, script(src, js)
    const [dom, scripUrl, script] = await parseJS(div, entry)

    //  获取 js 的内容
    let fetchScripts = await Promise.all(scripUrl.map(async item => await fetchReSource(item)));

    allScripts = script.concat(fetchScripts)

    return [dom, allScripts];
}

export const parseJS = async (root, entry) => {
    const dom = root.outerHTML;    //  包含本身在内的 所有html 内容
    const scripUrl = [];
    const script = [];

    //  深度解析
    function deepParse(element) {
        const children = element.children;
        const parent = element.parent;

        //  处理 script 中的内容
        if (element.nodeName.toLowerCase() === 'script') {
            let src = element.getAttribute('src')
            if (!src) {
                script.push(element.outerHTML)
            } else {
                if (src.startsWith('http')) {
                    scripUrl.push(src);
                } else {
                    scripUrl.push(`http:${entry}/${src}`);
                }
            }
        }

        if (parent) {
            parent.replaceChild(document.createComment(`此 js 文件已经被微前端替换`), element)
        }

        //  处理 link 中也会有 js 内容
        if (element.nodeName.toLowerCase() === 'link') {
            let href = element.getAttribute('href')
            if (href.endsWith('.js')) {
                if (href.startsWith('http')) {
                    scripUrl.push(href)
                } else {
                    scripUrl.push(`http:${entry}/${href}`)
                }
            }
        }

        for (let i = 0; i < children.length; i++) {
            deepParse(children[i])
        }
    }

    deepParse(root)
    return [dom, scripUrl, script]
}