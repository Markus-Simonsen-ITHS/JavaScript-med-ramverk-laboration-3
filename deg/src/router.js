import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import LandingView from './views/LandingView.vue'
import AddView from './views/AddView.vue'
import TransactionsView from './views/TransactionsView.vue'
import DebtView from './views/DebtView.vue'
import SparandeView from './views/SparandeView.vue'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: HomeView,
      path: '/'
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
      path: '/add'
    },
    {
      component: TransactionsView,
      path: '/history'
    },
    {
      component: DebtView,
      path: '/debt'
    },
    {
      component: SparandeView,
      path: '/sparande'
    }
  ]
})
