import { createWebHashHistory, createRouter } from 'vue-router'
import { NAV_LIST } from '../const/nav'

let navRoutes = NAV_LIST.map(item => ({
    path: item.url,
    component: () => import('../App.vue')
}))

const routes = [...navRoutes]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router