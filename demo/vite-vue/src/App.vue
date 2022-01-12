<template>
    <!-- <img alt="Vue logo" height="1000" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
    <Todos></Todos>

    <!-- <router-view></router-view> -->

    <router-view v-slot="{ Component }">
        <transition>
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </transition>
    </router-view>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Todos from '/comps/todos/Todos.vue'
// import Todos from './components/todos/Todos.vue'


fetch("/api/users")
  .then(response => response.json())
  .then(json => console.log('proxy:',json));

export default {
    name: "App",
    components: {
        // HelloWorld,
        Todos
    }
};
</script>
