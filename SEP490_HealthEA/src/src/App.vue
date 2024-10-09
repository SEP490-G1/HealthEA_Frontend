<template>
  <div id="app">
    <Nav :user="user" />

    <div>
      <router-view :user="user" />
    </div>
  </div>
</template>

<script>
import Nav from './components/NavBar.vue'
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Nav
  },
  data() {
    return {
      token: localStorage.getItem('token'),  // Lưu token vào reactive data
      user: null
    };
  },
  watch: {
    token(newToken, oldToken) {
      console.log('Token changed:', newToken);
      this.loadUserInfo();  // Gọi API khi token thay đổi
    }
  },
  methods: {
    async loadUserInfo() {
      if (this.token) {
        try {
          const response = await this.$request.get('/users/myinfo', {
            headers: {
              Authorization: 'Bearer ' + this.token,
            },
          }).then(res => {
            this.user = res.data.result
            localStorage.setItem('userRole', this.user.role.id)
          });
          console.log('User info loaded:', this.user);
        } catch (error) {
          console.error('Error loading user info:', error);
        }
      }
    },
    updateToken() {
      this.token = localStorage.getItem('token');  // Cập nhật token từ localStorage
    }
  },
  created() {
    this.loadUserInfo();  // Gọi khi component khởi tạo
  }
};

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

* {
  box-sizing: border-box;
}

#app {
  text-align: center;
}

body {
  background: #1C8EF9 !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: 'Fira Sans', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
  font-family: 'Fira Sans', sans-serif;
}

body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 100%;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label {
  font-weight: 400;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff;
}
</style>
