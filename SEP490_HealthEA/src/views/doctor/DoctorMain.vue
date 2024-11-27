<template lang="">
  <ContentFooter>
    <RouterView />
  </ContentFooter>
</template>
<script>
import ContentFooter from '@/components/layout/ContentFooter.vue'
import { RouterView } from 'vue-router'
export default {
  components: { ContentFooter, RouterView }
}
</script>
<style lang=""></style>
