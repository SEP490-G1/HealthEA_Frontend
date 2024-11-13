<template lang="">
  <div>
    Thông tin dịch tễ
    <a-button type="primary" @click="buttonAS"> Thông </a-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      idNew: null
    }
  },
  methods: {
    buttonAS() {
      const id = this.$route.params.id
      console.log(id)
    }
  }
}
</script>
<style lang=""></style>
