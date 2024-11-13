<template>
  <a-result title="Để bắt đầu sử dụng tài khoản của bạn hãy xác thực tài khoản qua email của bạn">
    <template #extra>
      <a-form-item has-feedback>
        <a-input v-model:value="email" autocomplete="off" placeholder="Email của bạn" />
      </a-form-item>
      <a-button type="primary" @click="verifyAccount">Gửi email</a-button>
      <a-button @click="backBtn" type="secondary">Quay trở lại</a-button>
    </template>
  </a-result>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

export default {
  data() {
    return {
      email: ref('')
    }
  },
  methods: {
    backBtn() {
      console.log('Backbtn btuoon')
      this.$router.push('/client/login')
    },
    verifyAccount() {
      const store = useUserStore()

      console.log(store.verify(this.email))
    }
  }
}
</script>
<style lang=""></style>
