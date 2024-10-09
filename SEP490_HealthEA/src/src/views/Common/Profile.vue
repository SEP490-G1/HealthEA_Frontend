<template>
    <div style="display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left; padding: 80px 55px 45px 55px;">
        <!-- Updaye Profile -->
        <div class="row">
            <div class="col-md-6">
                <div class="card p-4 shadow-sm mb-4">
                    <h4>Profile Information</h4>
                    <form @submit.prevent="updateUserProfile">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username:</label>
                            <input type="text" class="form-control" v-model="user.username" id="username" readonly />
                        </div>

                        <div class="mb-3">
                            <label for="email" class="form-label">Email:</label>
                            <input type="email" class="form-control" v-model="user.email" id="email" />
                        </div>

                        <div class="mb-3">
                            <label for="phone" class="form-label">Phone:</label>
                            <input type="text" class="form-control" v-model="user.phone" placeholder="Phone" required
                                @blur="validatePhoneNumber()" v-bind:class="{ 'is-invalid': error.phoneNumber }" />
                            <div class="invalid-feedback" v-if="error.phoneNumber">
                                {{ error.phoneNumber }}
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="firstName" class="form-label">First Name:</label>
                            <input type="text" class="form-control" v-model="user.firstName" id="firstName" />
                        </div>

                        <div class="mb-3">
                            <label for="lastName" class="form-label">Last Name:</label>
                            <input type="text" class="form-control" v-model="user.lastName" id="lastName" required />
                        </div>

                        <div class="mb-3">
                            <label for="dob" class="form-label">Date of Birth:</label>
                            <input type="date" class="form-control" v-model="user.dob" id="dob" required />
                        </div>

                        <div class="mb-3">
                            <label for="gender" class="form-label">Gender:</label>
                            <select class="form-select" v-model="user.gender" required style="margin-left: 20px;">
                                <option :value="true">Male</option>
                                <option :value="false">Female</option>
                            </select>
                        </div>

                        <button type="submit" class="btn btn-primary">Update Profile</button>
                    </form>
                </div>
            </div>

            <!-- Change Password -->
            <div class="col-md-6">
                <div class="card p-4 shadow-sm mb-4">
                    <h4>Change Password</h4>
                    <form @submit.prevent="changePassword">
                        <div class="mb-3">
                            <label for="currentPassword" class="form-label">Current Password:</label>
                            <input type="password" class="form-control" v-model="passwordData.currentPassword"
                                id="currentPassword" required />
                        </div>

                        <div class="mb-3">
                            <label for="newPassword" class="form-label">New Password:</label>
                            <input type="password" class="form-control" v-model="passwordData.newPassword"
                                id="newPassword" required />
                        </div>

                        <div class="mb-3">
                            <label for="confirmPassword" class="form-label">Confirm New Password:</label>
                            <input type="password" class="form-control" v-model="password_confirm"
                                placeholder="Confirm Password" required @blur="validatePassword()"
                                v-bind:class="{ 'is-invalid': error.confirm_pass }" />
                            <div class="invalid-feedback" v-if="error.confirm_pass">
                                {{ error.confirm_pass }}
                            </div>
                        </div>

                        <button type="submit" class="btn btn-warning">Change Password</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'profile',
    props: ['user'],
    data() {
        return {
            // users: {
            //     username: "",
            //     email: "",
            //     firstName: "",
            //     lastName: "",
            //     dob: "",
            //     gender: null,
            // },
            passwordData: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            error: {
                phoneNumber: '',
                confirm_pass: ''
            }
        };
    },
    methods: {
        validatePhoneNumber() {
            const phoneRegex = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;
            if (!phoneRegex.test(this.user.phone)) {
                this.error.phoneNumber = "Số điện thoại không hợp lệ. Vui lòng nhập lại!";
                return false;
            }
            this.error.phoneNumber = "";
            return true;
        },
        validatePassword() {
            let isValid = true
            if (this.passwordData.password != this.passwordData.password_confirm) {
                this.error.confirm_pass = "Password and Confirm password must be the same!"
                isValid = false
            }

            return isValid
        },
        updateUserProfile() {
            if (this.validatePhoneNumber()) {
                this.$request.put('/users/' + this.user.id, {
                    email: this.user.email,
                    firstName: this.user.firstName,
                    lastName: this.user.lastName,
                    phone: this.user.phone,
                    dob: this.user.dob,
                    gender: this.user.gender
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }

                }).then(res => {
                    console.log(res)
                    alert('Update successfully')
                }).catch(error => {
                    if (error.response && error.response.data) {
                        alert("Error: " + error.response.data.message);
                    } else {
                        alert("An unexpected error occurred");
                    }
                });
            }
        },
        changePassword() {
            if (this.validatePassword()) {
                this.$request.put('/users/changePass/' + this.user.id, {
                    oldPass: this.passwordData.currentPassword,
                    newPass: this.passwordData.newPassword,
                }, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }

                }).then(res => {
                    console.log(res)
                    alert('Change passowrd successfully')
                }).catch(error => {
                    if (error.response && error.response.data) {
                        alert("Error: " + error.response.data.message);
                    } else {
                        alert("An unexpected error occurred");
                    }
                });
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