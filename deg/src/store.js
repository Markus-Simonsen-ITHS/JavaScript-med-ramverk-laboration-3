import { createStore } from 'vuex'
import { auth } from './firebase'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'

const mutations = {
    setUser(state, user) {
      state.user = user
    },
    displayLogoutMessage(state) {
      state.logoutMessage = 'block'
    }
  },
  state = {
    counter: 0,
    user: {},
    logoutMessage: 'none'
  },
  actions = {
    signIn(state, payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password).then(
        () => {
          state.dispatch('fetchUser')
        }
      )
    },
    logOut(state) {
      signOut(auth).then(() => {
        state.commit('displayLogoutMessage')
      })
    },
    fetchUser(state) {
      const user = auth.currentUser
      state.commit('setUser', user)
    },
    registerUser(state, payload) {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
    }
  },
  getters = {
    getUser(state) {
      return state.user
    }
  }
export default createStore({ mutations, state, actions, getters, strict: true })
