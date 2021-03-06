import { createApp } from 'vue'
import App from './App.vue'
import { auth } from './firebase'
import router from './router'
import store from './store'
import { Chart, registerables } from 'chart.js'
import { SetupCalendar, DatePicker } from 'v-calendar'
Chart.register(...registerables)

// Initialize app
let app

// When logging out or logging in (state change) create app if it is not already created
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = createApp(App)
    app.use(store)
    app.use(router)
    app.use(SetupCalendar, {})
    app.component('DatePicker', DatePicker)
    app.mount('#app')
  }

  // If user exists, fetch data from db
  if (user) {
    store.dispatch('fetchUser', user.uid)
    store.dispatch('fetchFlow', user.uid)

    // Check user theme
    if (
      (window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        store.getters.getTheme === 'dark') ||
      !store.getters.getTheme
    ) {
      // dark mode
      store.dispatch('changeTheme', 'dark')
    } else {
      // light mode
      store.dispatch('changeTheme', 'light')
      // No user is signed in.
    }
  }
})
