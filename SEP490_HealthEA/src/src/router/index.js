import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Common/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Common/Register.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/Common/Profile.vue')
  },
  {
    path: '/verifyEmail:email',
    name: 'verifyEmail',
    component: () => import('../views/Common/EmailVerify.vue')
  },
  {
      path: '/verify', 
      name: 'verifyToken',
      component: () => import('../views/Common/TokenVerify.vue'),
      // Chấp nhận query parameter (ví dụ: /verify?token=<token>)
      props: (route) => ({ token: route.query.token })
  },
  {
    path: '/getAllUsers',
    name: 'getAllUsers',
    component: () => import('../views/Admin/List.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/updateUser:id',
    name: 'user.updateUser',
    component: () => import('../views/Admin/Update.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/createUser',
    name: 'user.createUser',
    component: () => import('../views/Admin/Create.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/apartment.list',
    name: 'apartment.list',
    component: () => import('../views/Apartment/List.vue')
  },
  {
    path: '/apartment.create',
    name: 'apartment.create',
    component: () => import('../views/Apartment/Create.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/apartment.update:id',
    name: 'apartment.update',
    component: () => import('../views/Apartment/Update.vue')
  },
  {
    path: '/apartment.detail:id',
    name: 'apartment.detail',
    component: () => import('../views/Apartment/Detail.vue')
  },
  {
    path: '/resident.list',
    name: 'resident.list',
    component: () => import('../views/Residents/List.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/resident.create',
    name: 'resident.create',
    component: () => import('../views/Residents/Create.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/resident.update:id',
    name: 'resident.update',
    component: () => import('../views/Residents/Update.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/bill.list',
    name: 'bill.list',
    component: () => import('../views/Bill/List.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/bill.create',
    name: 'bill.create',
    component: () => import('../views/Bill/Create.vue'),
    meta: { requiresRole: 1 }
  },
  {
    path: '/bill.update:id',
    name: 'bill.update',
    component: () => import('../views/Bill/Update.vue'),
    meta: { requiresRole: 1 }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userRole = localStorage.getItem('userRole');

  if (to.matched.some(record => record.meta.requiresRole)) {
    if (parseInt(userRole) !== to.meta.requiresRole) {
      alert('You do not have permission to access this page.');
      return next('/');
    }
  }

  next();
});

export default router
