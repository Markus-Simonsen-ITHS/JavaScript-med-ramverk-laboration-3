import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import LandingView from './views/LandingView.vue'
import AddView from './views/AddView.vue'
import TransactionsView from './views/TransactionsView.vue'
import DebtView from './views/DebtView.vue'

import { auth } from './firebase'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: HomeView,
      path: '/',
      // Defines if the user is required to be logged in to visit this path
      meta: { requiresAuth: true }
    },
    {
      component: LoginView,
      path: '/login'
    },
    {
      component: LandingView,
      path: '/landing'
    },
    {
      component: AddView,
      path: '/add',
      meta: { requiresAuth: true }
    },
    {
      component: TransactionsView,
      path: '/history',
      meta: { requiresAuth: true }
    },
    {
      component: DebtView,
      path: '/debt',
      meta: { requiresAuth: true }
    },
    {
      path: '/:notFound(.*)',
      redirect: '/'
    }
  ]
})

// Runs before each change in router.
// As parameters, takes information about next path (to), which path it is coming from (from)
// and a function to trigger next path which can be overrided (next)
router.beforeEach((to, from, next) => {

  // Checks if the path to be visited requires authentication
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth)
  
  // If it requires authentication and no user is present, redirect to /landing else go to expected path
  if (requiresAuth && !auth.currentUser) {
    next('/landing')
  } else {
    next()
  }
})

export default router
