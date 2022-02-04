import { createStore } from 'vuex'
import { auth } from './firebase'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'

const mutations = {
    setUser(state, user) {
      state.user = user
    }
  },
  state = {
    counter: 0,
    user: {}
  },
  actions = {
    signIn(state, payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password).then(
        () => {
          state.dispatch('fetchUser')
        }
      )
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
