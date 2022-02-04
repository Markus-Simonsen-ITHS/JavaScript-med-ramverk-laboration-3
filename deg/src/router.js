import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import LandingView from './views/LandingView.vue'

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
    }
  ]
})
