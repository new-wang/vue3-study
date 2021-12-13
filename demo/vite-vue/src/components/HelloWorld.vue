<template>
  <h1>{{ msg }}</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>

   <ModelButton></ModelButton>  


</template>

<script>
import ModelButton from "./ModelButton.vue"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    ModelButton
  },
  data() {
    return {
      count: 0
    }
  }
}
</script>
