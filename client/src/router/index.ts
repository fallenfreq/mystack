import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import zitadelAuth from '../services/zitadelAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/test-form',
      name: 'testForm',
      component: () => import('../views/TestForm.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        authName: zitadelAuth.oidcAuth.authName
      },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        authName: zitadelAuth.oidcAuth.authName
      },
      component: () => {
        if (zitadelAuth.hasRole('admin')) {
          return import('../views/AdminView.vue')
        }
        return import('../views/NoAccess.vue')
      }
    }
  ]
})

zitadelAuth.oidcAuth.useRouter(router)

export default router
