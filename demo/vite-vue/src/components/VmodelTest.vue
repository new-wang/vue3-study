<template>
    <!-- <div @click="$emit('update:modelValue',modelValue + 1)">
        update:modelValue:{{modelValue}}
    </div> -->
    <div @click="$emit('update:counter', counter + 1)">
        vModel:update:counter:{{ counter }}
    </div>
</template>
<script>
export default {
    props: {
        // modelValue:{
        //     type:Number,
        //     default:0
        // },
        counter: {
            type: Number,
            default: 0
        }
    }
};
</script>
