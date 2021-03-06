import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import LandingView from './views/LandingView.vue'
import AddView from './views/AddView.vue'
import TransactionsView from './views/TransactionsView.vue'
import DebtView from './views/DebtView.vue'
import SparandeView from './views/SparandeView.vue'
import SettingsView from './views/SettingsView.vue'
import HistoryView from './views/HistoryView.vue'
import ChartView from './views/ChartView.vue'
import CalenderView from './views/CalenderView.vue'
import BudgetView from './views/BudgetView.vue'

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
      component: HistoryView,
      path: '/history',
      meta: { requiresAuth: true },
      children: [
        {
          path: 'list',
          component: TransactionsView
        },
        {
          path: 'chart',
          component: ChartView
        },
        {
          path: 'calender',
          component: CalenderView
        }
      ]
    },
    {
      component: DebtView,
      path: '/debt'
    },
    {
      component: SparandeView,
      path: '/sparande',
      meta: { requiresAuth: true }
    },
    {
      component: SparandeView,
      path: '/sparande',
      meta: { requiresAuth: true }
    },
    {
      component: SettingsView,
      path: '/settings',
      meta: { requiresAuth: true }
    },
    { component: BudgetView, path: '/budget', meta: { requiresAuth: true } },
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
