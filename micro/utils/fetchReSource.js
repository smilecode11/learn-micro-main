export const fetchReSource = async (url) => {
    return window.fetch(url).then(async resp => await resp.text())
}