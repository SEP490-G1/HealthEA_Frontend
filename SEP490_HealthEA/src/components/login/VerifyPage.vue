<template>
  <a-result :title="title">
    <template #extra>
      <a-form-item has-feedback>
        <a-input v-model:value="email" autocomplete="off" placeholder="Email của bạn" />
      </a-form-item>
      <a-button type="primary" :disabled="loading" @click="sendEmail">
        <div style="display: flex">
          Gửi email
          <div v-if="loading">&#160; {{ this.second }}</div>
        </div>
      </a-button>
      <a-button @click="backBtn" type="secondary">Quay trở lại</a-button>
    </template>
  </a-result>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { message } from 'ant-design-vue'
export default {
  data() {
    return {
      second: 30,
      loading: ref(false),
      statusForm: '',
      title: ref('Để bắt đầu sử dụng tài khoản của bạn hãy xác thực tài khoản qua email của bạn'),
      email: ref('')
    }
  },
  methods: {
    backBtn() {
      this.$router.push('/client/login')
    },
    countdown() {
      message.success('đã gửi mail xác nhận hãy đợi 30 giây để gửi tiếp mail', 10)
      this.loading = true
      var interval = setInterval(() => {
        this.second--
        console.log(this.second)
        if (this.second === 0) {
          clearInterval(interval)
          this.loading = false
          this.second = 30
        }
      }, 1000)
      return
    },
    async asyncverifyEmail() {
      const store = useUserStore()
      const response = await store.verify(this.email)
      console.log('sssssss', response.status)

      this.countdown()

      return
    },
    async sendEmail() {
      await this.asyncverifyEmail()
    }
  }
}
</script>
<style lang=""></style>
