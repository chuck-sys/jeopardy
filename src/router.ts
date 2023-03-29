import { createWebHistory, createRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'play',
    component: () => import('./components/Play.vue'),
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('./components/Edit.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
