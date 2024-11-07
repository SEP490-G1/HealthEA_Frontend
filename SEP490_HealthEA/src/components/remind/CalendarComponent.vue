<script setup>
const value = defineModel('valueZ')
</script>
<template>
  <div>
    <a-calendar mode="week" v-model:value="value" @panelChange="onPanelChange" />
  </div>
</template>
<script>
export default {
  methods: {
    onPanelChange(value, mode) {
      console.log(value, mode)
    }
  }
}
</script>
<style lang=""></style>
