<template>
  <div @click="$emit('my-click')">
    <h3>自定义事件</h3>
  </div>
</template>

<script>
export default {
//   emits: ['click']
  emits: ['my-click']
}
</script>