import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FeatureOne from '@/views/home/FeatureOne'
import FeatureTwo from '@/views/home/FeatureTwo'
import PageNotFound from '@/views/common/NotFoundView'
import ClientView from '@/views/ClientView'
import AdminView from '@/views/AdminView.vue'
import ProfileHealth from '@/views/ProfileHealthView'
import UserProfile from '@/views/UserProfile.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'function1',
          component: FeatureOne
        },
        {
          path: 'function2',
          component: FeatureTwo
        }
      ]
    },
    {
      path: '/client',
      name: 'client',
      component: ClientView,
      children: [
        {
          path: 'login',
          component: () => import('@/components/login/LoginForm')
        },
        {
          path: 'register',
          component: () => import('@/components/login/RegisterForm')
        },
        {
          path: 'verifyEmail:email',
          name: 'verifyEmail',
          component: () => import('@/components/login/VerifyEmailForm')
        },
        {
            path: 'verify', 
            name: 'verifyToken',
            component: () => import('@/components/login/VerifyToken'),
            props: (route) => ({ token: route.query.token })
        }
      ]
    },
    {
      path: '/userProfile',
      name: 'User Profile',
      component: UserProfile,
      children:[
        {
          path: '', 
          redirect: '/userProfile/profile'
        },
        {
          path: 'profile',
          component: () => import('@/components/userProfile/Profile')
        },
        {
          path: 'password',
          component: () => import('@/components/userProfile/ChangePassword')
        },
      ]
    },
    {
      path: '/profileHealth',
      name: 'Profile hearlth',
      component: ProfileHealth
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children:[
        {
          path: '', 
          redirect: '/admin/userList'
        },
        {
          path: 'userList',
          name: 'userList',
          component: () => import('@/components/userManage/UserListView')
        },
        {
          path: 'createUser',
          name: 'createUser',
          component: () => import('@/components/userManage/CreateUserForm')
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', component: PageNotFound }
  ]
})

export default router
