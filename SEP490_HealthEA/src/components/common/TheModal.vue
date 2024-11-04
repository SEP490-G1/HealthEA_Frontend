<template lang="">
  <a-modal
    :open="open"
    :title="title"
    :okText="okText"
    :cancelText="cancelText"
    @cancel="handleCancel()"
    @ok="handleOk()"
    :width="width"
  >
    <slot></slot>
  </a-modal>
</template>
<script>
export default {
  props: ['open', 'title', 'okText', 'cancelText', 'handleOk', 'handleCancel', 'width'],
  methods: {}
}
</script>
<style lang=""></style>
