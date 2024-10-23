<template lang="">
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Title"
      :breadcrumb="{ listBread }"
      sub-title="This is a subtitle"
    />
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: { listBread: [] }
}
</script>
<style lang=""></style>
