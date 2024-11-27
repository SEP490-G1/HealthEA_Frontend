<script setup></script>
<template lang="">
  <div style="box-sizing: border-box; margin: 20px 70px">
    <a-layout-content >
      <div class="layout">
        <slot></slot>
      </div>
    </a-layout-content>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
.layout {
  background-color: #fff;
  padding: 24px;
  min-height: 90vh;
  height: auto;
}
</style>
