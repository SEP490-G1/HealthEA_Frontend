<script setup>
import TheMainHeader from '@/components/common/TheMainHeader.vue'
import { ref } from 'vue'
</script>
<template>
  <div>
    <a-layout-header class="header">
      <TheMainHeader />
    </a-layout-header>
  </div>
</template>
<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      role: ref('')
    }
  }
}
</script>
<style lang=""></style>
