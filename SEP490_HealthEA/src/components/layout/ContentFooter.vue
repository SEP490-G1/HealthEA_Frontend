<script setup>
import TheFooter from '@/components/common/TheFooter'
</script>
<template lang="">
  <a-layout-content style="padding: 0 50px">
    <div class="layout">
      <slot></slot>
    </div>
  </a-layout-content>
  <TheFooter />
</template>
<script>
export default {}
</script>
<style scoped>
.layout {
  margin-top: 20px;
  background-color: #fff;
  padding: 24px;
  min-height: 100vh;
}
</style>
