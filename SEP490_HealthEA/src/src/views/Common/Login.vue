<template>
    <div class="auth-wrapper" style="padding-top: 200px;">
        <div class="auth-inner">
            <form @submit.prevent="login">
                <h3>Login Page</h3>

                <div class="form-group">
                    <label>Username</label>
                    <input type="text" class="form-control" v-model="user.username" placeholder="Username" />
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="user.password" placeholder="Password" />
                </div>

                <button class="btn btn-primary btn-block">Login</button>

            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
        }
    },
    methods: {
        login() {
            this.$request.post('/auth/token', {
                username: this.user.username,
                password: this.user.password
            }).then(res => {
                console.log(res)
                localStorage.setItem('token', res.data.result.token)
                window.location.href = '/'
            }).catch(error => {
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