import { createRouter, createWebHistory } from 'vue-router'
import SignIn from '@/views/Login/SignIn.vue'
import Main from '@/views/main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/signin',
    component: SignIn
  },{
    path: '/',
    redirect: 'main',
  },{
    path: '/',
    name: 'main',
    component: Main
  },
],
})

export default router
