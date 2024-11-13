<template lang="">
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      :title="title"
      :breadcrumb="{ listBread }"
      v-model:sub-title="subtitle"
    />
    <slot :subtile="subtitle"></slot>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  props: ['title'],
  data() {
    return {
      subtitle: ref('Đây là tiêu đề của từng tag')
    }
  }
}
</script>
<style lang=""></style>
