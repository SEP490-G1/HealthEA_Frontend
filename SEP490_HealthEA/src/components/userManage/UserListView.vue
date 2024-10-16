<template>
    <!-- Card to contain the title and the table -->
    <!-- <div class="user-management-card card-deck mb-3"
            style="margin: 80px 30px 0px 30px; justify-content: center; text-align: center;"> -->
    <div class="pricing-header text-center">
        <h2 class="display-4">Danh sách người dùng</h2>
        <p><router-link to="/createUser">Tạo người dùng mới</router-link></p>
    </div>

    <!-- Search user -->
    <div class="search-form container">
        <form @submit.prevent="searchUsers" class="form-inline" style="display: flex;">
            <div class="form-group mx-2">
                <input v-model="filters.username" type="text" placeholder="Username" class="form-control">
            </div>
            <div class="form-group mx-2">
                <input v-model="filters.email" type="text" placeholder="Email" class="form-control">
            </div>
            <div class="form-group mx-2">
                <select v-model="filters.status" class="form-control">
                    <option value="">Trạng thái</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="BANNED">Banned</option>
                </select>
            </div>
            <div class="form-group mx-2">
                <select v-model="filters.role" class="form-control">
                    <option value="">Vai trò</option>
                    <option value="ADMIN">Admin</option>
                    <option value="CUSTOMER">Customer</option>
                    <option value="DOCTOR">Doctor</option>
                </select>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Tìm kiếm</button>
            </div>
        </form>
    </div>

    <!-- Table for user list -->
    <div class="container">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col" width="120">#</th>
                    <th scope="col">Tên đăng nhập</th>
                    <th scope="col">Họ tên</th>
                    <th scope="col">Email</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Ngày sinh</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Vai trò</th>
                    <th scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr :key="index" v-for="(user, index) in users" :index="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.username }}</td>
                    <td>{{ user.firstName }} {{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.dob }}</td>
                    <td>{{ user.gender ? 'Male' : 'Female' }}</td>
                    <td>{{ user.status }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                        <!-- <router-link :to="{ name: 'user.updateUser', params: { id: user.id } }">
                            <button class="btn btn-primary">Chỉnh sửa</button>
                        </router-link> -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="pagination-container">
        <div class="page-size-selector">
            <label for="pageSize">Page Size:</label> &nbsp;
            <select v-model="pageSize" @change="getAllUser(0, pageSize)">
                <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
            </select>
        </div>

        <div class="pagination">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 0">Trước</button>
            <button v-for="page in totalPages" :key="page" @click="changePage(page - 1)"
                :class="{ active: currentPage === page - 1 }">
                {{ page }}
            </button>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages - 1">Sau</button>
        </div>
    </div>
</template>


<script>
import { getTotalUsers } from '@/service/main'
import { getAllUsers } from '@/service/main'
import { searchUsers } from '@/service/main'

export default {
    data() {
        return {
            users: [],
            filters: {
                username: '',
                email: '',
                status: '',
                role: '',
            },
            pageSizes: [5, 10, 15, 20],
            currentPage: 0,
            pageSize: 10,
            totalPages: 0,
            totalElements: 0,
        };
    },
    created() {
        this.getTotalUser();
        this.getAllUser();
    },
    methods: {
        async getTotalUser() {
            try {
                const response = await getTotalUsers('http://localhost:9090/identity/users/total')
                this.totalElements = response.data.result
                this.totalPages = Math.ceil(this.totalElements / this.pageSize)
                console.log(this.totalElements)
            } catch (error) {
                console.log(error)
            }
        },

        async getAllUser(page = this.currentPage, size = this.pageSize) {
            this.totalPages = Math.ceil(this.totalElements / this.pageSize)
            try {
                const bodyParameter = {
                    page: page,
                    size: size
                }
                const response = await getAllUsers('http://localhost:9090/identity/users', bodyParameter)
                this.users = response.data.result
                console.log(this.users)
            } catch (error) {
                console.log(error)
            }
        },

        async searchUsers() {
            try {
                const bodyParameter = this.filters
                const response = await searchUsers('http://localhost:9090/identity/users/search', bodyParameter)
                this.users = response.data.result
                console.log(this.users)
            } catch (error) {
                console.log(error)
            }
            // this.$request.get('/users/search', {
            //     params: this.filters,
            //     headers: {
            //         Authorization: 'Bearer ' + localStorage.getItem('token')
            //     }
            // })
            //     .then(res => {
            //         this.users = res.data.result;
            //     })
            //     .catch(error => {
            //         if (error.response && error.response.data) {
            //             alert("Error: " + error.response.data.message);
            //         } else {
            //             alert("An unexpected error occurred");
            //         }
            //     });
        },
        changePage(page) {
            this.currentPage = page;
            this.getAllUser(page, this.pageSize);
        }
    }
};
</script>

<style scoped>
.search-form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin: 20px 0;
}

.form-group {
    flex: 1;
    min-width: 150px;
    margin-bottom: 0;
}

.form-group select,
.form-group input {
    width: 100%;
}

.btn-primary {
    margin-left: 15px;
}

.container {
    max-width: 100%;
    overflow-x: auto;
}

.pricing-header {
    margin-bottom: 20px;
    padding: 20px;
    border-bottom: 1px solid #dee2e6;
    border-radius: 12px 12px 0 0;
}

.pricing-header h2 {
    font-size: 32px;
    font-weight: 700;
    color: #343a40;
}

.pricing-header p {
    margin-top: 10px;
    font-size: 14px;
    color: #6c757d;
}

.table {
    width: 100%;
    max-width: 100%;
    background-color: white;
    margin-top: 0;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    border-radius: 0 0 12px 12px;
}

.table th,
.table td {
    text-align: left;
    padding: 12px;
    vertical-align: middle;
    border: none;
}

.table th {
    font-weight: 600;
    font-size: 14px;
    color: #6c757d;
    border-bottom: 2px solid #dee2e6;
}

.table td {
    font-size: 14px;
    color: #495057;
    background-color: white;
    border-bottom: 1px solid #dee2e6;
    border-radius: 8px;
}

.table tr {
    transition: all 0.3s ease-in-out;
}

.table tr:hover {
    background-color: #f8f9fa;
}

.table .btn {
    padding: 6px 12px;
    font-size: 12px;
}

.table .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.table .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
}

.table .checkbox-cell {
    text-align: center;
    width: 50px;
}

.container {
    max-width: 95%;
}

th,
td {
    text-align: left;
    white-space: nowrap;
}

.table .table-bordered {
    border: 1px solid #dee2e6;
}

.table th[scope="col"] {
    background-color: #f4f6f9;
    font-weight: 600;
}

.search-form {
    margin: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.user-list {
    margin-top: 20px;
}

.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.page-size-selector {
    margin-right: 20px;
}

.pagination {
    display: flex;
    list-style: none;
    padding: 0;
}

.pagination li {
    margin: 0 5px;
}

.pagination li button {
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

.pagination li.disabled button {
    background-color: #d6d6d6;
    cursor: not-allowed;
}

.pagination li.active button {
    background-color: #0056b3;
}

.pagination button {
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
}

.pagination .active {
    background-color: #007bff;
    color: white;
}
</style>