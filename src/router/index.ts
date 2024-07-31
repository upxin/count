import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/repl',
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/views/home/Home'),
    },
    {
      name: 'drag',
      path: '/drag',
      component: () => import('@/views/drag/Drag.vue'),
    },
  ],
});

export default router;
