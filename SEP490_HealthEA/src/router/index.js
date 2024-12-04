import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import FeatureOne from '@/views/home/FeatureOne'
import FeatureTwo from '@/views/home/FeatureTwo'
import PageNotFound from '@/views/common/NotFoundView'
import ClientView from '@/views/ClientView'
import LoginFrom from '@/components/login/LoginFrom'
import RegisterFrom from '@/components/login/RegisterFrom'
import ProfileHealth from '@/views/ProfileHealthView'

import AddDailyMetricView from '@/views/AddDailyMetricView.vue'

import { useUserStore } from '@/stores/user'

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
    path: '/alldoctor',
    component: () => import('@/views/DoctorView.vue'),
    children: [
      {
        path: 'list',
        component: () => import('@/components/doctor/doctorList')
      },
      {
        path: 'detail/:id',
        component: () => import('@/components/doctor/doctorDetail')
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
      },
      {
        path: 'password',
        component: () => import('@/components/personal/Password.vue')
      }
    ]
  },
  {
    path: '/dailymetric',
    name: 'upload',
    component: DailyMetricView,
    children: [
      {
        path: 'add',
        component: AddDailyMetricView
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
    path: '/doctor',
    name: 'doctorPage',
    component: () => import('@/views/doctor/DoctorMain.vue'),
    children: [
      {
        path: 'apoinemnt',
        component: () => DoctorApoinment
      },
      {
        path: 'profile',
        component: () => import('@/components/doctor/doctorList')
      }
    ]
  },
  {
    path: '/appointments',
    name: 'Appointments List',
    component: UserAppointment
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
    path: '/chat',
    name: 'chat',
    component: () => import('@/components/dailymetric/Chat')
  },
  {
    path: '/callVideo',
    name: 'videoCall',
    component: () => import('@/views/VideoCallView.vue')
  },
  {
    path: '/profileHealth/medical_record',
    name: 'medicalrecord',
    component: ProfileHealth,
    children: [
      {
        path: 'diagnostic_image/:id',
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
        path: 'Prehistoric/:id',
        name: 'Prehistoric',
        component: () => import('@/components/medical/PrehistoricPage')
      },
      {
        path: 'prescription/:id',
        name: 'prescription',
        component: () => import('@/components/medical/PrescriptionPage')
      },
      {
        path: 'prescription/:id/detail/:idD',
        name: 'prescriptionDetail',
        component: () => import('@/components/medical/PrescriptionDetail')
      },
      {
        path: 'testing/:id',
        name: 'tesing result',
        component: () => import('@/components/medical/TestingPage')
      },
      {
        path: 'testing/:id/detail/:idD',
        name: 'tesing result detail',
        component: () => import('@/components/medical/TestingPageDetail')
      },
      {
        path: 'vaccination/:id',
        name: 'Vaccination',
        component: () => import('@/components/medical/VaccinationPage')
      },
      {
        path: 'vaccination/:id/detail/:idD',
        name: 'VaccinationDetail',
        component: () => import('@/components/medical/VaccinationDetailPage')
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
  {
    path: '/listDoctor',
    name: 'doctors',
    component: () => DoctorListView
  },
  {
    path: '/listDoctor/:id',
    name: 'Doctor Detail',
    component: () => DoctorDetailView
  },
  {
    path: '/doctors/update',
    name: 'Update doctor details',
    component: () => DoctorUpdateView
  },
  {
    path: '/doctors/schedules/add',
    name: 'Add Schedules',
    component: () => DoctorCreateScheduleView
  },
  {
    path: '/report',
    name: 'Report',
    component: () => ReportView
  },
  {
    path: '/admin/reports',
    name: 'Report Lists',
    component: () => ReportListView
  },
  {
    path: '/admin/reports/:id',
    name: 'Report Details',
    component: () => ReportDetailsView
  },
  {
    path: '/admin/news/create',
    name: 'Create News',
    component: () => CreateNewsView
  },
  {
    path: '/news/:id',
    name: 'News',
    component: () => NewsView
  },
  {
    path: '/news',
    name: 'News List',
    component: () => NewsListView
  },
  {
    path: '/doctors/me',
    name: 'Doctor Info',
    component: () => DoctorRedirectView
  },
  {
    path: '/doctors/call',
    name: 'Doctor Call',
    component: () => DoctorCall
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
    path: '/call',
    name: 'Video Call ',
    component: () => CustomerCall
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: () => NotificationListView
  },
  {
    path: '/error/404',
    name: 'Not Found',
    component: PageNotFound
  },
  { path: '/:pathMatch(.*)*', redirect: '/error/404' }
]

const history = createWebHistory(import.meta.env.BASE_URL)

const router = createRouter({
  history: history,
  routes
})

import { message } from 'ant-design-vue'
import UserManagementView from '@/views/admin/UserManagementView.vue'
import AdminView from '@/views/AdminView.vue'
import DailyMetricView from '@/views/DailyMetricView.vue'
import DailyMetricHistory from '@/components/dailyMetric/DailyMetricHistory.vue'
import DoctorListView from '@/views/doctor/DoctorListView.vue'
import DoctorDetailView from '@/views/doctor/DoctorDetailView.vue'
import ReportView from '@/views/report/ReportView.vue'
import DoctorUpdateView from '@/views/doctor/DoctorUpdateView.vue'
import ReportListView from '@/views/report/ReportListView.vue'
import ReportDetailsView from '@/views/report/ReportDetailsView.vue'
import DoctorCreateScheduleView from '@/views/doctor/DoctorCreateScheduleView.vue'
import CreateNewsView from '@/views/news/CreateNewsView.vue'
import NewsView from '@/views/news/NewsView.vue'
import NewsListView from '@/views/news/NewsListView.vue'
import RemindView from '@/views/RemindView.vue'
import CalendarRemind from '@/components/remind/CalendarRemind.vue'
import DoctorRedirectView from '@/views/DoctorRedirectView.vue'
import VerifyPage from '@/components/login/VerifyPage.vue'
import AccpetVerify from '@/components/login/AccpetVerify.vue'
import Profile from '@/views/common/MyProfile.vue'
import DoctorManagementView from '@/views/admin/DoctorManagementView.vue'
import DoctorApoinment from '@/components/doctor/DoctorApoinment.vue'
import NotificationListView from '@/views/notifications/NotificationListView.vue'
import CustomerCall from '@/views/CustomerCall.vue'
import DoctorCall from '@/views/DoctorCall.vue'
import UserAppointment from '@/components/doctor/UserAppointment.vue'
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
  if(to.path == '/' || to.path == '/about'){
    return
  }
  if (to.path.includes('/profileHealth/medical_record')) {
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
        return exitUser()
      }
      return
    }
  }
})

export default router
