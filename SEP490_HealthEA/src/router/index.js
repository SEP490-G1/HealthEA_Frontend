import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FeatureOne from '@/views/home/FeatureOne'
import FeatureTwo from '@/views/home/FeatureTwo'
import PageNotFound from '@/views/common/NotFoundView'
import ClientView from '@/views/ClientView'
import LoginFrom from '@/components/login/LoginFrom'
import RegisterFrom from '@/components/login/RegisterFrom'
import ProfileHealth from '@/views/ProfileHealthView'
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
          component: LoginFrom
        },
        {
          path: 'register',
          component: RegisterFrom
        }
      ]
    },
    {
      path: '/profileHealth',
      name: 'Profile hearlth',
      component: ProfileHealth
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/:pathMatch(.*)*', component: PageNotFound }
  ]
})

export default router
