<template>
  <a-result :title="title">
    {{ this.token }}
    <template #extra> </template>
  </a-result>
</template>
<script>
import { useUserStore } from '@/stores/user'

export default {
  props: ['token'],
  data() {
    return {
      title: ''
    }
  },
  mounted() {
    this.ValidateThat()
  },
  methods: {
    async ValidateThat() {
      const store = useUserStore()
      const response = await store.verifyById(this.token)
      console.log('ssssssss',response)
      if (response.data.code == 0) {
        this.title = response.data.result
        return
      }

    }
  }
}
</script>
<style></style>
