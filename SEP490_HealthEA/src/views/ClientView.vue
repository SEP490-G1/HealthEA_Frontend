<script setup>
import ContentFooter from '@/components/layout/ContentFooter'
</script>
<template lang="">
  <ContentFooter>
    <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
      <RouterView />
    </a-layout-content>
  </ContentFooter>
</template>
<script>
export default {}
</script>
<style scoped></style>
