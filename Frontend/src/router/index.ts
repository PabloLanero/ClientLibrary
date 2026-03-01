import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/Login/SignIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Landing',
      component: () => import('@/views/main.vue'),
      children: [{
        path: '/Landing',
        component: () => import('@/views/Landing/Landing.vue')
      },{
        path: '/Login',
        component: () => import('@/views/Login/LogIn.vue')
      },{
        path: '/SigIn',
        component: () => import('@/views/Login/SignIn.vue')
      },{
        path: '/Books',
        component: () => import('@/views/Books/Book.vue')
      },{
        path: '/User',
        component: () => import('@/views/Profile/User/User.vue')
      },{
        path: '/Admin',
        component: () => import('@/views/Profile/Admin/Admin.vue')
      }]
    }
  ],
})

export default router
