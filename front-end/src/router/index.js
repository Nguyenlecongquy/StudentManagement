import { createRouter, createWebHistory } from 'vue-router'
import HomeCom from '../components/HomeCom.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeCom
    },
  ]
})

export default router
