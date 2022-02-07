import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import LoginView from './views/LoginView.vue'
import LandingView from './views/LandingView.vue'
<<<<<<< HEAD
import AddView from './views/AddView.vue'
=======
import TransactionsView from './views/TransactionsView.vue'
>>>>>>> a153fde (added transaction page)

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
<<<<<<< HEAD
      component: AddView,
      path: '/add'
=======
      component: TransactionsView,
      path: '/history'
>>>>>>> a153fde (added transaction page)
    }
  ]
})
