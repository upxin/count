import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/ssq.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/ssq',
    },
    {
      path: '/ssq',
      name: 'ssq',
      component: HomeView,
    },
    {
      path: '/dlt',
      name: 'dlt',
      component: () => import('../views/dlt.vue'),
    },
  ],
})

export default router
