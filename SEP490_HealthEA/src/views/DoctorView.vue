<template>
  <ContentFooter>
    <RouterView />
  </ContentFooter>
</template>
<script>
import { RouterView } from 'vue-router'
import ContentFooter from '@/components/layout/ContentFooter';
export default {
  components: {
    RouterView,
    ContentFooter
  }
}
</script>
<style lang=""></style>
