<template>
    <div class="auth-wrapper" style="padding-top: 150px;">
        <div class="auth-inner">
            <form @submit.prevent="register">
                <h3>Sign Up Page</h3>

                <div class="form-group">
                    <label>First Name</label>
                    <input type="text" class="form-control" v-model="user.first_name" placeholder="First Name"
                        required />
                </div>

                <div class="form-group">
                    <label>Last Name</label>
                    <input type="text" class="form-control" v-model="user.last_name" placeholder="Last Name" required />
                </div>

                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" v-model="user.username" placeholder="User Name" required />
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" placeholder="Email" required />
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="user.phone" placeholder="Phone" required
                        @blur="validatePhoneNumber()" v-bind:class="{ 'is-invalid': error.phoneNumber }" />
                    <div class="invalid-feedback" v-if="error.phoneNumber">
                        {{ error.phoneNumber }}
                    </div>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="user.password" placeholder="Password"
                        required />
                </div>

                <div class="form-group">
                    <label>Confirm Password</label>
                    <input type="password" class="form-control" v-model="password_confirm"
                        placeholder="Confirm Password" required @blur="validatePassword()"
                        v-bind:class="{ 'is-invalid': error.confirm_pass }" />
                    <div class="invalid-feedback" v-if="error.confirm_pass">
                        {{ error.confirm_pass }}
                    </div>
                </div>

                <button class="btn btn-primary btn-block">Sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            user: {
                first_name: '',
                last_name: '',
                username: '',
                password: '',
                email: '',
                phone: ''
            },
            password_confirm: '',
            error: {
                phoneNumber: '',
                confirm_pass: ''
            },
        }
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
            if (this.user.password != this.password_confirm) {
                this.error.confirm_pass = "Password and Confirm password must be the same!"
                isValid = false
            }

            return isValid
        },
        register() {
            if (this.validatePassword() && this.validatePhoneNumber()) {
                this.$request.post('/users', {
                    username: this.user.username,
                    password: this.user.password,
                    email: this.user.email,
                    phone: this.user.phone,
                    firstName: this.user.first_name,
                    lastName: this.user.last_name
                }).then(res => {
                    console.log(res)
                    this.$router.push({ name: 'verifyEmail', params: { email: this.user.email } });
                    // this.$router.push({ name: 'verifyEmail', query: { email: this.user.email } });
                }).catch(error => {
                    console.log(error)
                    if (error.response && error.response.data) {
                        alert("Error: " + error.response.data.message);
                    } else {
                    alert("An unexpected error occurred");
                    }
                });
            }
        }
    }
}
</script>