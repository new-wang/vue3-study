import { h } from "vue";
import { createRouter, createWebHistory } from "vue-router";
// import { createWebHashHistory } from "vue-router";

import Dashboard from "../components/Dashboard.vue";
import Todos from "../components/todos/Todos.vue";
import Notfound from "../components/Notfound.vue";

// 实例创建方式
const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory("/base-directory"),
    // mode:'history',
    routes: [
        {
            path: "/",
            component: Dashboard,
            name: "dashboard"
        },
        {
            path: "/todos",
            component: Todos,
            name: "todos"
        },
        {
            path: "/:pathMatch(.*)*",
            component: Notfound,
            name: "not-found"
        }
        // 通配符 移除
        // {
        //     path: '/*',
        // }
    ],
    scrollBehavior(to, from, savedPosition) {
        // {x:10,y:10}  now {left:10,top:10}
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 10 };
        }
    }
});

// 使用命名导航至404页面
// router.resolve({
//     name:'not-found',
//     param:{
//         pathMatch:['not','found']
//     }
// })
// .href
// /not.found

// 特性：动态路由

router.addRoute({
    path: "/about",
    name: "about",
    component: () => import("../components/About.vue")
});
router.addRoute("about", {
    path: "/about/info",
    name: "info",
    component: {
        render() {
            return h("div", "info page");
        }
    }
});

export default router;
