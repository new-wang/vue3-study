import { h } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import Dashboard from '../components/Dashboard.vue'
import Todos from '../components/todos/Todos.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Dashboard,
            name:'dashboard'
        },
        {
            path: '/todos',
            component: Todos,
            name:'todos'
        }
    ]
})

// 特性：动态路由

router.addRoute({
    path:'/about',
    name:'about',
    component:()=>import('../components/About.vue')
})
router.addRoute('about',{
    path:'/about/info',
    name:'info',
    component:{
        render(){
            return h('div', 'info page')
        }
    }
})

export default router