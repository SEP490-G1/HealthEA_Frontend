<template>
  <a-layout-content>
    <a-result :title="title">
      <template #extra>
        <a-button @click="toLogin" type="primary">Đăng nhập ngay</a-button>
      </template>
    </a-result>
  </a-layout-content>
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
    toLogin() {
      this.$router.push('login')
    },
    async ValidateThat() {
      const store = useUserStore()
      const response = await store.verifyById(this.token)
      console.log('ssssssss', response)
      if (response.data.code == 0) {
        this.title = response.data.result
        return
      }
    }
  }
}
</script>
<style></style>
