import { createApp } from 'vue'
import App from './App.vue'
import { auth } from './firebase'
import router from './router'
import store from './store'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

// Initialize app
let app

// When logging out or logging in (state change) create app if it is not already created
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)
    app.use(store)
    app.use(router)
    app.mount('#app')
  }

  // If user exists, fetch data from db
  if (user) {
    store.dispatch('fetchUser', user.uid)
    store.dispatch('fetchAllIncomeForUser', user.uid)
    store.dispatch('fetchAllExpensesForUser', user.uid)
    store.dispatch('fetchBudgetsForUser', user.uid)
  } else {
    // No user is signed in.
  }
})
