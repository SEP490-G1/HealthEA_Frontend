<template>
    <h3 class="text-center">Tạo mới người dùng</h3>
    <form @submit.prevent="handleCreateUser">
        <div class="form-group row">
            <label for="username" class="col-sm-2 col-form-label">Tên đăng nhập</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="" v-model="user.username">
            </div>
        </div>
        <div class="form-group row">
            <label for="password" class="col-sm-2 col-form-label">Mật khẩu</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="" v-model="user.password">
            </div>
        </div>
        <div class="form-group row">
            <label for="firstName" class="col-sm-2 col-form-label">Tên</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="firstName" v-model="user.firstName">
            </div>
        </div>
        <div class="form-group row">
            <label for="lastName" class="col-sm-2 col-form-label">Họ</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="lastName" v-model="user.lastName">
            </div>
        </div>
        <div class="form-group row">
            <label for="email" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="email" v-model="user.email">
            </div>
        </div>
        <div class="form-group row">
            <label for="phone" class="col-sm-2 col-form-label">Số điện thoại</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="phone" v-model="user.phone">
            </div>
        </div>
        <div class="form-group row">
            <label for="dob" class="col-sm-2 col-form-label">Ngày sinh</label>
            <div class="col-sm-10">
                <input type="date" class="form-control" id="dob" v-model="user.dob">
            </div>
        </div>
        <div class="form-group row">
            <label for="gender" class="col-sm-2 col-form-label">Giới tính</label>
            <div class="col-sm-10">
                <select class="form-control" id="gender" v-model="user.gender">
                    <option value="true">Nam</option>
                    <option value="false">Nữ</option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <label for="status" class="col-sm-2 col-form-label">Trạng thái</label>
            <div class="col-sm-10">
                <select class="form-control" id="status" v-model="user.status">
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="BANNED">Banned</option>
                </select>
            </div>
        </div>
        <div class="form-group row">
            <label for="role" class="col-sm-2 col-form-label">Vai trò</label>
            <div class="col-sm-10">
                <select class="form-control" id="status" v-model="user.role">
                    <option value="ADMIN">Admin</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="DOCTOR">Doctor</option>
                </select>
            </div>
        </div>
        <div class="form-group row justify-content-center">
            <button type="submit" class="btn btn-primary btn-save">Lưu</button>
        </div>
    </form>
</template>
<script setup>
import { createUser } from '@/service/main'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

// Sử dụng `ref` để tạo state cho dữ liệu người dùng
const user = ref({
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    status: '',
    role: ''
})

const router = useRouter()

// Hàm tạo người dùng mới với `async/await`
const handleCreateUser = async () => {
    try {
        console.log("Create user");
        const response = await createUser('http://localhost:9090/identity/users', user.value)
        
        console.log(response)
        // Điều hướng đến danh sách người dùng sau khi tạo thành công
        router.push({ name: 'userList' })
    } catch (error) {
        if (error.response && error.response.data) {
            alert("Error: " + error.response.data.message);
        } else {
            alert("View: An unexpected error occurred");
        }
    }
}
</script>

<!-- <script setup>
import { createUser } from '@/service/main'
import { useRouter } from 'vue-router'

export default {
    data() {
        return {
            user: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dob: '',
                gender: '',
                status: '',
                role: '',
            }
        }
    },
    methods: {
        createUser() {
            console.log("Create user");
            try {
                const response = createUser('http://localhost:9090/identity/users', this.user)
                const router = useRouter()

                console.log(response)
                router.push({ name: 'userList' })
            } catch (error) {
                if (error.response && error.response.data) {
                    alert("Error: " + error.response.data.message);
                } else {
                    alert("View: An unexpected error occurred");
                }
            }
        }
    }
}
</script> -->

<style scoped>
.form-group {
    margin-top: 20px
}

.form-group.row.justify-content-center {
    display: flex;
    justify-content: center;
}

.btn-save {
    width: 100px;
    background-color: #007bff;
    border-color: #007bff;
    margin-top: 50px;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group label {
    font-weight: bold;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}
</style>