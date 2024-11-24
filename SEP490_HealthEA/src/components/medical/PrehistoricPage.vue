<script setup>
import TheRichEditor from '../common/TheRichEditor.vue'
</script>
<template lang="">
  <div>
    <TheRichEditor v-model="contentRich" />
    <div class="output-group">
      <label>Content</label>
      <code>{{ contentRich }}</code>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contentRich: '<p>A Vue.js wrapper component for Tiptap to use <code>v-model</code>.</p>'
    }
  }
}
</script>
<style lang=""></style>
