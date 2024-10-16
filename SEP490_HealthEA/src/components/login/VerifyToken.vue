<template>
    <div class="verification-container">
        <div class="verification-card">
            <div class="icon-container">
                <img src="@/assets/img/email-icon.png" alt="email-icon" class="email-icon" />
            </div>
            <h1>Xác minh email</h1>
            <p v-if="status === 'success'">Email của bạn đã được xác minh thành công!</p>
            <p v-if="status === 'error'">Token không hợp lệ hoặc đã hết hạn.</p>
        </div>
    </div>
</template>
<script>

import { verifyToken } from '@/service/main'

export default {
    data() {
        return {
            status: ''
        };
    },
    created() {
        const token = this.$route.query.token;
        this.verifyToken(token);
    },
    methods: {
        verifyToken(token) {
            try {
                const response = verifyToken('http://localhost:9090/identity/emails/verifyEmail/' + token)
                this.$swal({
                    title: 'Success!',
                    text: 'Verification email sucessfully. You can login to the system now.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                });
                this.status = 'success';
            } catch (error) {
                console.log("Error verify token: ", error)
                this.$swal({
                    title: 'Error!',
                    text: 'Invalid or expired token. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                this.status = 'error';
            }
        }
    }
};
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