<template>
    <input
        type="text"
        :value="todoTitle"
        @input="onInputChange"
        v-bind="$attrs"
    />
    <!-- 非属性特性展开 -->
</template>

<script>
export default {
    props: {
        // modelValue: {
        //     type: String,
        //     default: ''
        // },
        todoTitle: {
            type: String,
            default: ""
        }
    },
    methods: {
        onInputChange(e) {
            // this.$emit("update:modelValue",e.target.value)
            this.$emit("update:todoTitle", e.target.value);
        }
    }
};
</script>

<style lang="scss" scoped></style>
