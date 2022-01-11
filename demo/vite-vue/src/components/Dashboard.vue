<template>
    <div>
        <!-- 传统写法 -->
        <p :class="$style['click-count']" @click="$store.commit('add')">
            store.state.count：{{ $store.state.count }}
        </p>

        <!-- commposition写法 -->
        <p :class="$style['click-count']" @click="add">{{ state.count }}</p>

        <!-- toRefs -->
        <p :class="$style['click-count']" @click="add">{{ count }}</p>

        <ul>
            <li>
                <!-- <router-link to = "/" >dashboard</router-link> -->
                <NavLink to="/"></NavLink>
            </li>
            <li>
                <!-- <router-link to = '/todos'>todos</router-link> -->
                <NavLink to="/todos"></NavLink>
            </li>
            <li>
                <!-- <router-link to = '/about'>about</router-link> -->
                <NavLink to="/about"></NavLink>
            </li>
        </ul>
    </div>
</template>

<script>
import { toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import NavLink from "./NavLink.vue";
export default {
    components: {
        NavLink
    },
    setup() {
        const store = useStore();
        console.log(store);
        return {
            state: store.state,
            ...toRefs(store.state),
            add() {
                store.commit("add");
            }
        };
    }
};
</script>

<style module>
.click-count {
    background-color: salmon;
}
</style>
