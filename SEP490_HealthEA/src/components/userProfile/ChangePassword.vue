<template>
    <div class="col-md-6">
        <div class="card p-4 shadow-sm mb-4">
            <h4>Đổi mật khẩu</h4>
            <form @submit.prevent="changePassword">
                <div class="mb-3">
                    <label for="currentPassword" class="form-label">Mật khẩu hiện tại</label>
                    <input type="password" class="form-control" v-model="passwordData.currentPassword"
                        id="currentPassword" required />
                </div>

                <div class="mb-3">
                    <label for="newPassword" class="form-label">Mật khẩu mới</label>
                    <input type="password" class="form-control" v-model="passwordData.newPassword" id="newPassword"
                        required />
                </div>

                <div class="mb-3">
                    <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
                    <input type="password" class="form-control" v-model="passwordData.confirmPassword" required
                        @blur="validatePassword()" v-bind:class="{ 'is-invalid': error.confirm_pass }" />
                    <div class="invalid-feedback" v-if="error.confirm_pass">
                        {{ error.confirm_pass }}
                    </div>
                </div>

                <button type="submit" class="btn btn-warning">Lưu</button>
            </form>
        </div>
    </div>
</template>

<script>
import { updatePassword } from '@/service/main'
import { useUserStore } from '@/stores/user'

export default {
    data() {
        return {
            passwordData: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            error: {
                confirm_pass: ''
            }
        };
    },
    methods: {
        validatePassword() {
            let isValid = true
            if (this.passwordData.newPassword != this.passwordData.confirmPassword) {
                this.error.confirm_pass = "Password and Confirm password must be the same!"
                isValid = false
            }

            return isValid
        },
        async changePassword() {
            if (this.validatePassword()) {
                try {
                    const userStore = useUserStore()
                    console.log(userStore)

                    const bodyParameters = {
                        oldPass: this.passwordData.currentPassword,
                        newPass: this.passwordData.newPassword
                    }
                    const response = await updatePassword('http://localhost:9090/identity/users/changePass/' + userStore.id, bodyParameters)
                    alert("Update successfully")

                } catch (error) {
                }
            }
        },
    },
};
</script>

<style scoped>
.container {
    max-width: 1200px;
}

.card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

img.rounded-circle {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

h3 {
    margin-bottom: 0;
}

p {
    color: #666;
}

.mb-3 {
    margin-bottom: 1.5rem;
}

button {
    margin-top: 1rem;
}
</style>