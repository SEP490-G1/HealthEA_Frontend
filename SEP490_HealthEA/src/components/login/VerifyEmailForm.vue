<template>
  <div class="verification-container">
    <div class="verification-card">
      <div class="icon-container">
        <img src="@/assets/img/email-icon.png" alt="email-icon" class="email-icon" />
      </div>
      <h2>Xác minh email</h2>
      <p>Để bắt đầu sử dụng tài khoản của bạn, bạn cần xác nhận địa chỉ email.</p>
      <button v-if="!showResendButton" @click="verifyEmail" class="verify-button" :disabled="isDisabled">Xác minh địa
        chỉ email</button>

      <p v-if="showResendButton" class="resend-text">
        Không nhận được email? Bạn có thể gửi lại sau {{ timer }} giây.
      </p>
      <button v-if="!isDisabled && showResendButton" @click="resendEmail" class="resend-button"
        :disabled="isResendDisabled">
        Gửi lại email
      </button>
    </div>
  </div>
</template>
<script>

import { verifyEmail } from '@/service/main'

export default {
  data() {
    return {
      isDisabled: false,
      isResendDisabled: true,
      showResendButton: false,
      timer: 30,
      resendTimeout: null,
      userEmail: ''
    }
  },
  created() {
    this.userEmail = this.$route.params.email;
  },
  methods: {
    verifyEmail() {
      this.sendEmail(this.userEmail);
      this.$swal({
        title: 'Success!',
        text: 'Verification email sent! Please check your inbox.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      this.startResendTimer();
    },
    resendEmail() {
      this.sendEmail(this.userEmail);
      this.$swal({
        title: 'Success!',
        text: 'Verification email resent! Please check your inbox.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      this.startResendTimer();
      this.startResendTimer();
    },
    startResendTimer() {
      this.isDisabled = true;
      this.isResendDisabled = true;
      this.showResendButton = true;
      this.timer = 30;


      this.resendTimeout = setInterval(() => {
        this.timer--;

        if (this.timer <= 0) {
          clearInterval(this.resendTimeout);
          this.isDisabled = false;
          this.isResendDisabled = false;
        }
      }, 1000);
    },
    async sendEmail(userEmail) {
      try {
        const response = await verifyEmail('http://localhost:9090/identity/emails/sendVerifyEmail/' + userEmail)
        console.log(response)
      } catch (error) {
        if (error.response && error.response.data) {
          this.$swal({
            title: 'Error!',
            text: error.response.data.message || 'Something went wrong!',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    }
  }
}
</script>
<style scoped>
.verification-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.verification-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 400px;
  text-align: center;
}

.icon-container {
  margin-bottom: 20px;
}

.email-icon {
  width: 60px;
}

h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  color: #666;
}

.verify-button,
.resend-button {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin: 20px 0;
}

.verify-button:disabled,
.resend-button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}

.verify-button:hover:not([disabled]),
.resend-button:hover:not([disabled]) {
  background-color: #0056b3;
}

.footer-text {
  font-size: 12px;
  color: #999;
}

.resend-text {
  font-size: 14px;
  color: #666;
}
</style>