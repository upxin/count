import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      // redirect: '/drag',
      redirect: '/home',
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/home/Home.vue'),
    },
    {
      name: 'drag',
      path: '/drag',
      component: () => import('@/views/drag/Drag.vue'),
    },
    {
      name: 'test',
      path: '/test',
      component: () => import('@/views/test'),
    },
  ],
});

export default router;
