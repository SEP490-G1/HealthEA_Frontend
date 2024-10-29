import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FeatureOne from '@/views/home/FeatureOne'
import FeatureTwo from '@/views/home/FeatureTwo'
import PageNotFound from '@/views/common/NotFoundView'
import ClientView from '@/views/ClientView'
import LoginFrom from '@/components/login/LoginFrom'
import RegisterFrom from '@/components/login/RegisterFrom'
import ProfileHealth from '@/views/ProfileHealthView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      headerClass: '1'
    },
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
    path: '/admin',
    name: 'adminpage',
    component: AdminView,
    children: [
      {
        path: 'UserManagement',
        component: UserManagementView
      },
      {
        path: 'register',
        component: RegisterFrom
      }
    ]
  },
  {
    path: '/profileHealth/medical_record/',
    name: 'medicalrecord',
    component: ProfileHealth,
    children: [
      {
        path: 'diagnostic_image',
        name: 'Diagnostic Imageing',
        component: () => import('@/components/medical/DiagnosticImaging')
      },
      {
        path: 'history_examination',
        name: 'History Examination',
        component: () => import('@/components/medical/HistoryExamination')
      },
      {
        path: 'information',
        name: 'Information Page',
        component: () => import('@/components/medical/InformationPage')
      },
      {
        path: 'prehistoric',
        name: 'Prehistoric',
        component: () => import('@/components/medical/PrehistoricPage')
      },
      {
        path: 'prescription',
        name: 'prescription',
        component: () => import('@/components/medical/PrescriptionPage')
      },
      {
        path: 'testing',
        name: 'tesing result',
        component: () => import('@/components/medical/TestingPage')
      },
      {
        path: 'vaccination',
        name: 'Vaccination',
        component: () => import('@/components/medical/VaccinationPage')
      }
    ]
  },
  {
    path: '/profileHealth',
    name: 'Profile hearlth',
    component: () => import('@/components/medical/ListMedicalRecord')
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

const history = createWebHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history: history,
  routes
})

import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores/user'
import UserManagementView from '@/views/admin/UserManagementView.vue'
import AdminView from '@/views/AdminView.vue'

router.beforeEach(async (to) => {
  // gọi store
  const userStore = useUserStore()
  //nếu đã đăng nhập và truy cập vào trang login register sẽ bị đuổi sang home
  if (userStore.user.auth == true) {
    if (to.path.includes('/client')) {
      message.info('Bạn đã đăng nhập!')
      return '/'
    }
    if (userStore.user.role != 'ADMIN') {
      if (to.path.includes('/admin')) {
        message.info('Bạn phải có quyền admin!')
        return '/'
      }
    }
  }
  // Nếu là role là admin thì sẽ truy cập
  // nếu không đăng nhập thì chỉ vào được home và client
  else if (userStore.user.auth == false) {
    if (to.path == '/') {
      // continue
    } else if (!to.path.includes('/client')) {
      message.info('Bạn phải đăng nhập!')
      return '/client/login'
    }
  }
})

export default router
