<template>
    <div>
        other for AsyncComp
    </div>
</template>

<script>
    import { emitter } from './HelloWorld.vue'
    export default {
        mounted(){
            // 监听事件
            emitter.on('someEvent',msg=>{
                console.log(msg)
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>