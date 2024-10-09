<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
        <div class="container">
            <router-link to="/" class="navbar-brand">{{ $t('home') }}</router-link>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto" v-if="!user">
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">{{ $t('navbar.login') }}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/register" class="nav-link">{{ $t('navbar.signUp') }}</router-link>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" v-if="user">
                    <li class="nav-item">
                        <router-link to="/apartment.list" class="nav-link">{{ $t('navbar.apartment') }}</router-link>
                    </li>
                    <li class="nav-item" v-if="user.role.id == 1">
                        <router-link to="/resident.list" class="nav-link">{{ $t('navbar.resident') }}</router-link>
                    </li>
                    <li class="nav-item" v-if="user.role.id == 1">
                        <router-link to="/bill.list" class="nav-link">{{ $t('navbar.bill') }}</router-link>
                    </li>
                    <li class="nav-item" v-if="user.role.id == 1">
                        <router-link to="/getAllUsers" class="nav-link">{{ $t('navbar.user') }}</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/profile" class="nav-link">{{ $t('navbar.profile') }}</router-link>
                    </li>
                    <li class="nav-item">
                        <a href="javascript:void(0)" @click="logout" class="nav-link">{{ $t('navbar.logout') }}</a>
                    </li>
                    <li class="nav-item">
                        <div class="language-toggle">
                            <label class="switch" >
                                <input type="checkbox" v-model="isEnglish" @change="toggleLanguage">
                                <span class="slider round"></span>
                            </label>  &nbsp; &nbsp;
                            <span style="font-weight: 100; color: #00000080;">{{ isEnglish ? 'English' : 'Tiếng Việt' }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props: ['user'],
    data() {
        return {
            isEnglish: this.$i18n.locale === 'en'
        };
    },
    methods: {
        logout() {
            console.log(localStorage.getItem('token'))
            this.$request.post('/auth/logout', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                token: localStorage.getItem('token')
            }).then(res => {
                console.log('User has been logged out and token has been removed')
            })
            localStorage.removeItem('token')
            window.location.href = '/';
        },
        toggleLanguage() {
            if (this.isEnglish) {
                this.$i18n.locale = 'en';
                localStorage.setItem('locale', 'en');
            } else {
                this.$i18n.locale = 'vi';
                localStorage.setItem('locale', 'vi');
            }
        }
    },
    mounted() {
        const savedLocale = localStorage.getItem('locale');
        if (savedLocale) {
            this.$i18n.locale = savedLocale;
            this.isEnglish = savedLocale === 'en';
        }
    }
}
</script>
<style scoped>
.language-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4.5px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 25px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 25px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 21px;
  width: 21px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:checked + .slider:before {
  transform: translateX(25px);
}

.toggle-label {
  margin-left: 10px;
  font-size: 16px;
  line-height: 25px;
}

.nav-item{
    margin-right: 15px;
}
</style>




