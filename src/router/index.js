import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // {
  //   path: '/',
  //   name: 'login',
  //   component: Login
  // },
  //   懒加载的方式
  {
    path: '/',
    name: 'login',
    component:()=>import('@/views/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component:()=>import('@/views/Main.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
