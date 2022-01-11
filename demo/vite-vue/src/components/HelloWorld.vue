<template>
    <h1>{{ msg }}</h1>
    <button @click="count++">count is: {{ count }}</button>
    <p>
        Edit <code>components/HelloWorld.vue</code> to test hot module
        replacement.
    </p>

    <!-- teleport -->
    <ModelButton></ModelButton>

    <!-- Emits选项 -->
    <!-- <Emits @click="onClick"></Emits> -->
    <Emits @my-click="onClick"></Emits>

    <!-- v-model的使用 -->
    <!-- <VmodelTest v-model = "count"></VmodelTest> -->
    <!-- <VmodelTest :modelValue="count" @update:modelValue="count=$event"></VmodelTest>   -->

    <VmodelTest v-model:counter="count"></VmodelTest>
    <!-- 等效于 -->
    <!-- <VmodelTest :counter = "count" @update:counter = "count = $event"></VmodelTest> -->

    <!-- render api变化 -->
    <RenderTest v-model:counter="count">
        <template v-slot:default>
            <p>Render 默认插槽</p>
        </template>
        <template v-slot:content>
            <p>Render content 具名插槽</p>
        </template>
    </RenderTest>

    <!-- 函数式组件 -->
    <Functional level="3">函数式组件：这是一个h3</Functional>

    <!-- 异步组件 -->
    <AsyncComp></AsyncComp>

    <!-- 自定义指令 -->
    <p v-highlight="'green'">自定义指令</p>

    <!-- 过渡 -->
    <TransitionTest></TransitionTest>

    <!-- $on，$off 和 $once：事件派发和监听 -->
    <button @click="sendMsg">emit event</button>
</template>

<script>
import { defineAsyncComponent, h } from "vue";

import ModelButton from "./ModelButton.vue";
import Emits from "./Emits.vue";
import VmodelTest from "./VmodelTest.vue";
// import RenderTest from './functional'
import Functional from "./functional";
import TransitionTest from "./TransitionTest.vue";

// 事件派发和监听
import mitt from "mitt";

// 创建emitter
export const emitter = mitt();

export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    components: {
        ModelButton,
        Emits,
        VmodelTest,
        RenderTest: {
            props: {
                counter: {
                    type: Number,
                    default: 0
                }
            },
            methods: {
                onClick() {
                    this.$emit("update:counter", this.counter + 1);
                }
            },
            render() {
                // 获取插槽
                // 2.x this.$scopedSlots.content()
                // this.$slots.default()
                // console.log(this.$slots.content())
                // const emit = this.$emit;
                return h("div", [
                    h(
                        "div",
                        {},
                        `i am renderTest, ${this.counter}`,
                        this.$slots.default(),
                        this.$slots.content()
                    ),
                    h(
                        "button",
                        {
                            onClick: this.onClick
                        },
                        "buty it!"
                    )
                ]);
            }
        },
        Functional,
        // AsyncComp:()=>import('./other.vue')
        AsyncComp: defineAsyncComponent(() => import("./other.vue")),
        TransitionTest
    },
    data() {
        return {
            count: 0
        };
    },
    methods: {
        onClick() {
            // 如果Emits中不加emits 原生事件干扰会执行两次

            console.log("click me");
        },
        sendMsg() {
            // 派发事件 在 other.vue中监听
            emitter.emit("someEvent", "foo ");
        }
    }
};
</script>
