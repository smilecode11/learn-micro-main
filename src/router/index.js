import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../App.vue'),
    },
    {
        path: '/micro-vue3',
        component: () => import('../App.vue'),
    },
    {
        path: '/micro-vue2',
        component: () => import('../App.vue'),
    },
    {
        path: '/micro-react17',
        component: () => import('../App.vue'),
    }
]

const router = (basename = '') => createRouter({
    history: createWebHistory(basename),
    routes,
})

export default router