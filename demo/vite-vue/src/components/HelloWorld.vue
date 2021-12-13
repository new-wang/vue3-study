<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>

  <!-- teleport -->
  <ModelButton></ModelButton>

  <!-- Emits选项 -->
  <!-- <Emits @click="onClick"></Emits> -->
  <Emits @my-click="onClick"></Emits>

</template>

<script>
import ModelButton from "./ModelButton.vue"
import Emits from "./Emits.vue"


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    ModelButton,
    Emits
  },
  data() {
    return {
      count: 0
    }
  },
  methods: {
    onClick(){
      // 如果Emits中不加emits 原生事件干扰会执行两次
      
      
      console.log('click me')

    }
  }
}
</script>
