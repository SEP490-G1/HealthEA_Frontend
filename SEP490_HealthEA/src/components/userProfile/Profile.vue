<template>
    <div class="row">
        <div class="col-md-6">
            <div class="card p-4 shadow-sm mb-4">
                <h4>Hồ sơ người dùng</h4>
                <form @submit.prevent="updateUserProfile">
                    <div class="mb-3">
                        <label for="username" class="form-label">Tên đăng nhập</label>
                        <input type="text" class="form-control" v-model="user.username" id="username" readonly />
                    </div>

                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="user.email" id="email" />
                    </div>

                    <div class="mb-3">
                        <label for="phone" class="form-label">Số điện thoại</label>
                        <input type="text" class="form-control" v-model="user.phone" placeholder="Số điện thoại"
                            required @blur="validatePhoneNumber()" v-bind:class="{ 'is-invalid': error.phoneNumber }" />
                        <div class="invalid-feedback" v-if="error.phoneNumber">
                            {{ error.phoneNumber }}
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="firstName" class="form-label">Tên</label>
                        <input type="text" class="form-control" v-model="user.firstName" id="firstName" />
                    </div>

                    <div class="mb-3">
                        <label for="lastName" class="form-label">Họ</label>
                        <input type="text" class="form-control" v-model="user.lastName" id="lastName" required />
                    </div>

                    <div class="mb-3">
                        <label for="dob" class="form-label">Ngày sinh</label>
                        <input type="date" class="form-control" v-model="user.dob" id="dob" required />
                    </div>

                    <div class="mb-3">
                        <label for="gender" class="form-label">Giới tính</label>
                        <select class="form-select" v-model="user.gender" required>
                            <option :value="true">Nam</option>
                            <option :value="false">Nữ</option>
                        </select>
                    </div>

                    <button type="submit" class="btn btn-primary">Lưu</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { getMyInfo } from '@/service/main'
import { updateUserProfile } from '@/service/main'

export default {
    name: 'profile',
    data() {
        return {
            user: '',
            error: {
                phoneNumber: ''
            }
        };
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        async getUserInfo() {
            try {
                const infoResponse = await getMyInfo('http://localhost:9090/identity/users/myinfo')
                this.user = (infoResponse.data.result)
                console.log(this.user)
            } catch (error) {
                console.log("Error get user information: ", error)
            }
        },
        validatePhoneNumber() {
            const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
            if (!phoneRegex.test(this.user.phone)) {
                this.error.phoneNumber = "Số điện thoại không hợp lệ. Vui lòng nhập lại!";
                return false;
            }
            this.error.phoneNumber = "";
            return true;
        },
        async updateUserProfile() {
            try{
                const response = await updateUserProfile('http://localhost:9090/identity/users/' + this.user.id, this.user)

                console.log(response.data)
            }catch(error){
                console.log("Error update user profile: ", error)
            }
        }
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