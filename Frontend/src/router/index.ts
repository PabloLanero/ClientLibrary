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
        name: 'Landing',
        component: () => import('@/views/Landing/Landing.vue')
      },{
        path: '/Login',
        name: 'Login',
        component: () => import('@/views/Login/LogIn.vue')
      },{
        path: '/SigIn',
        name: 'Registro',
        component: () => import('@/views/Login/SignIn.vue')
      },{
        path: '/Books',
        name: 'Libros',
        component: () => import('@/views/Books/Book.vue')
      },{
        path: '/User',
        name: 'Perfil',
        component: () => import('@/views/Profile/User/User.vue')
      },{
        path: '/Admin',
        name: 'Perfil',
        component: () => import('@/views/Profile/Admin/Admin.vue')
      },{
        path: '/Admin/Users',
        name: 'Lista de Usuarios',
        component: () => import('@/views/Users/Users.vue')
      }]
    }
  ],
})

export default router
