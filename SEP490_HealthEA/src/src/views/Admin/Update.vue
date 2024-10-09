<template>
    <div style="margin-top: 100px;">
        <div class="container mt-4">
            <h3 class="text-center">{{ $t('user.update') }}</h3>
            <form @submit.prevent="updateUser">
                <div class="form-group row">
                    <label for="username" class="col-sm-2 col-form-label">{{ $t('user.username') }}</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="" v-model="user.username">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="firstName" class="col-sm-2 col-form-label">{{ $t('user.firstName') }}</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="firstName" v-model="user.firstName">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="lastName" class="col-sm-2 col-form-label">{{ $t('user.lastName') }}</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="lastName" v-model="user.lastName">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-2 col-form-label">{{ $t('user.email') }}</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="email" v-model="user.email">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="phone" class="col-sm-2 col-form-label">{{ $t('user.phone') }}</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="phone" v-model="user.phone">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="dob" class="col-sm-2 col-form-label">{{ $t('user.dob') }}</label>
                    <div class="col-sm-10">
                        <input type="date" class="form-control" id="dob" v-model="user.dob">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="gender" class="col-sm-2 col-form-label">{{ $t('user.gender') }}</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="gender" v-model="user.gender">
                            <option value="true">{{ $t('user.male') }}</option>
                            <option value="false">{{ $t('user.female') }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="status" class="col-sm-2 col-form-label">{{ $t('user.status') }}</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="status" v-model="user.status">
                            <option value="ACTIVE">{{ $t('user.active') }}</option>
                            <option value="INACTIVE">{{ $t('user.inactive') }}</option>
                            <option value="BANNED">{{ $t('user.ban') }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="role" class="col-sm-2 col-form-label">{{ $t('user.role') }}</label>
                    <div class="col-sm-10">
                        <select class="form-control" id="status" v-model="user.role.id">
                            <option value="1">{{ $t('user.admin') }}</option>
                            <option value="2">{{ $t('user.manager') }}</option>
                            <option value="3">{{ $t('user.resident') }}</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">{{ $t('button.update') }}</button>&nbsp;
                <router-link to="/getAllUsers">
                    <button type="submit" class="btn btn-primary">{{ $t('button.back') }}</button>
                </router-link>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                id: '',
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dob: '',
                gender: '',
                status: '',
                role: {
                    id: '',
                    name: ''
                }
            }
        }
    },
    created() {
        let updateUserId = this.$route.params.id;
        console.log(updateUserId)
        this.$request.get('/users/' + updateUserId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.user = res.data.result
        }).catch(error => {
            if (error.response && error.response.data) {
                alert("Error: " + error.response.data.message);
            } else {
                alert("An unexpected error occurred");
            }
        });
    },
    methods: {
        updateUser() {
            console.log("Updating user:", this.user);
            this.$request.put(`/users/` + this.user.id,
                this.user,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response => {
                    this.$router.push({ name: 'getAllUsers' });
                })
                .catch(error => {
                    if (error.response && error.response.data) {
                        alert("Error: " + error.response.data.message);
                    } else {
                        alert("An unexpected error occurred");
                    }
                });
        }
    }
}
</script>

<style scoped>
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