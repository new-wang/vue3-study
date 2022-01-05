import { createRouter, createWebHashHistory } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Todos from '../components/todos/Todos.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Dashboard
        },
        {
            path: '/todos',
            component: Todos
        }
    ]
})
export default router