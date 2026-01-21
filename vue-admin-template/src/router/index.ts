import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   {
    path: '/',
    name: 'main-layout',
    component: () => import('@/Layout/LayoutView.vue'),
    children:[
       {
      path: '',
      name: 'home',
      component: () => import('@/view/HomeView.vue'),
    },
    
    {
      path: '/404',
      name: '404',
      component: () => import('@/view/404View.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
    ]
   },
   {
      path: '/login',
      name: 'login',
      component: () => import('@/view/LoginView.vue'),
    },
  ],
})

export default router
