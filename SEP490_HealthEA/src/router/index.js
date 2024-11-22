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
    path: '/remind',
    name: 'Remind',
    component: RemindView,
    children: [
      {
        path: 'calendar',
        component: CalendarRemind
      }
    ]
  },
  {
    path: '/client/verify',
    component: AccpetVerify,
    props: (route) => ({ token: route.query.token })
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
        path: 'verifyEmail',
        component: VerifyPage
      },
      {
        path: 'register',
        component: RegisterFrom
      }
    ]
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: Profile,
    children: [
      {
        path: 'myInfo',
        component: () => import('@/components/personal/MyInformation.vue')
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
        path: 'DoctorManagement',
        component: DoctorManagementView
      }
    ]
  },
  {
    path: '/dailymetric',
    name: 'DailyMetric',
    component: DailyMetricView
  },
  {
    path: '/dailymetric/history',
    name: 'DailyMetricHistory',
    component: DailyMetricHistory
  },
  {
    path: '/profileHealth/medical_record',
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
        path: 'information/:id',
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
import DailyMetricView from '@/views/DailyMetricView.vue'
import DailyMetricHistory from '@/components/dailyMetric/DailyMetricHistory.vue'
import RemindView from '@/views/RemindView.vue'
import CalendarRemind from '@/components/remind/CalendarRemind.vue'
import VerifyPage from '@/components/login/VerifyPage.vue'
import AccpetVerify from '@/components/login/AccpetVerify.vue'
import Profile from '@/views/common/MyProfile.vue'
import DoctorManagementView from '@/views/admin/DoctorManagementView.vue'
function exitUser() {
  // gọi store
  const userStore = useUserStore()
  message.info('Bạn phải đăng nhập vào tài khoản tương ứng!')
  console.log('Token', userStore.token)
  return '/client/login'
}
router.beforeEach(async (to) => {
  // gọi store
  const userStore = useUserStore()
  if (to.path.includes('/profileHealth')) {
    return
  }
  // nếu truy cập vào các page:
  // - không có path /client
  // - không có quyền truy cập
  // Result: xóa cache người dùng và đưa về login page
  // không có quyền đưa về login page
  if (userStore.token == null && !to.path.includes('/client')) {
    return exitUser()
  }
  // phần này của các người dùng
  if (userStore.token != null) {
    // USER :
    // - nếu truy cập vào các page của client thì trả đưa về home
    if (to.path.includes('/client')) {
      message.info('Bạn đã đăng nhập!')
      return '/'
    }
    //ADMIN:
    // - nếu truy cập vào các page của admin bạn phải có quyền admin
    if (to.path.includes('/admin')) {
      if (userStore.user.role == 'ADMIN') {
        return
      } else {
        return exitUser()
      }
    }
    //Doctor:
    // - nếu truy cập vào các page của /doctor bạn phải có quyền doctor
    if (to.path.includes('/doctor')) {
      if (userStore.user.role != 'DOCTOR') {
        message.info('Bạn phải có quyền doctor!')
        return '/'
      }
      return exitUser()
    }
  }
})

export default router
