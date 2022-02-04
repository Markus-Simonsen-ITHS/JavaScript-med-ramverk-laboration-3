import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import { auth } from './firebase'

createApp(App).use(router).use(store).mount('#app')

auth.onAuthStateChanged(function (user) {
  if (user) {
    store.dispatch('fetchUser', user.uid)
  } else {
    // No user is signed in.
  }
})
