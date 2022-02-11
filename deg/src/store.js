import { createStore } from 'vuex'
import { auth, db } from './firebase'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

const mutations = {
    setUser(state, user) {
      state.user = user
    },
    displayLogoutMessage(state) {
      state.logoutMessage = 'block'
    },
    setIncome(state, incomeArr) {
      state.income = incomeArr
    },
    setExpenses(state, expensesArr) {
      state.expenses = expensesArr
    },
    setExpensesCategories(state, categoriesArr) {
      state.expensesCategories = categoriesArr
    }
  },
  state = {
    counter: 0,
    user: {},
    logoutMessage: 'none',
    income: [
      {
        name: '',
        amount: 0,
        category: '',
        date: '',
        id: '',
        title: ''
      }
    ],
    expenses: [
      {
        name: '',
        amount: 0,
        category: '',
        date: '',
        id: '',
        title: ''
      }
    ],
    expensesCategories: [
      {
        name: '',
        expenses: []
      }
    ]
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
      let user = auth.currentUser
      user.id = auth.currentUser.uid
      state.commit('setUser', user)
    },
    registerUser(state, payload) {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
    },
    async fetchAllIncomeForUser(state, userId) {
      // Creates a query where the id matches the passed userId
      const q = query(collection(db, 'inkomst'), where('id', '==', userId))
      // Fetching all documents that matches query
      const allIncome = await getDocs(q)

      const incomeArr = []

      // Iterating through all documents and saving the data from them
      allIncome.forEach((income) => {
        incomeArr.push(income.data())
      })
      state.commit('setIncome', incomeArr)
    },
    async fetchAllExpensesForUser(state, userId) {
      // Creates a query where the id matches the passed userId
      const q = query(collection(db, 'utgift'), where('id', '==', userId))
      // Fetching all documents that matches query
      const allExpenses = await getDocs(q)

      const expensesArr = []

      // Iterating through all documents and saving the data from them
      allExpenses.forEach((expense) => {
        expensesArr.push(expense.data())
      })
      state.dispatch('createExpenseCategories', expensesArr)
      state.commit('setExpenses', expensesArr)
    },
    // Temporary function which creates a category for all found categories in expenses
    createExpenseCategories(state, expensesArr) {
      // Create new array to store categories in
      const categoriesArr = []

      expensesArr.forEach((expenseObject) => {
        // Searches categoriesArr if category exists. foundIndex will be -1 if not found
        const foundIndex = categoriesArr.findIndex(
          (category) => category.name === expenseObject.category
        )

        // If not found, create new object and push to categoriesArr else add to existing index of array
        if (foundIndex === -1) {
          categoriesArr.push({
            name: expenseObject.category,
            expenses: [expenseObject],
            amountSpent: expenseObject.amount,
            // Temporary static budget amount
            budget: 1000
          })
        } else {
          categoriesArr[foundIndex].expenses.push(expenseObject)
          categoriesArr[foundIndex].amountSpent =
            parseInt(categoriesArr[foundIndex].amountSpent) +
            parseInt(expenseObject.amount)
        }
      })

      state.commit('setExpensesCategories', categoriesArr)
    }
  },
  getters = {
    getUser(state) {
      return state.user
    },
    getIncome(state) {
      return state.income
    },
    getExpenses(state) {
      return state.expenses
    },
    getExpenseCategories(state) {
      return state.expensesCategories
    }
  }
export default createStore({ mutations, state, actions, getters, strict: true })
