import { createStore } from 'vuex'
import { auth, db } from './firebase'
import router from './router'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword
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
    },
    setLoginError(state, error) {
      state.loginError = error
    },
    setBudget(state, budgetArr) {
      state.budget = budgetArr
    }
  },
  state = {
    counter: 0,
    user: {},
    logoutMessage: 'none',
    loginError: '',
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
    budget: [
      {
        title: '',
        sum: 0,
        id: '',
        amountSpent: 0,
        expenses: []
      }
    ]
  },
  actions = {
    signIn(state, payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(() => {
          state.dispatch('fetchUser')
          router.push('/')
          state.commit('setLoginError', '')
        })
        .catch((error) => {
          state.commit('setLoginError', error)
        })
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
        .then(() => {
          state.commit('setLoginError', '')
          router.push('/')
        })
        .catch((error) => {
          state.commit('setLoginError', error)
        })
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

      state.commit('setExpenses', expensesArr)
    },
    async fetchBudgetsForUser(state, userId) {
      // Creates a query which specifies that only documents which matches user id is to be fetched
      const q = query(collection(db, 'budget'), where('id', '==', userId))

      // Fetches all documents that matches the query
      const budgetSnapshots = await getDocs(q)

      // Creating an array with a default value for expenses which do not have a category
      const budgetArr = [
        {
          title: 'Övrigt',
          sum: 0,
          budgetId: Math.random(),
          id: userId,
          amountSpent: 0,
          expenses: []
        }
      ]

      // Looping through each budgetitem and adding them to the budget array
      budgetSnapshots.forEach((budgetSnapshot) => {
        // Storing the data from the snapshot firebase sends
        let budgetItem = budgetSnapshot.data()
        // Adding id to the object
        budgetItem.bugetId = budgetSnapshot.id

        budgetArr.push(budgetItem)
      })

      // Looping through all expenses and adding them to a budget in the budget array
      state.state.expenses.forEach((expense) => {
        // Checking if the category field in expense is found in the title field in the budget array
        const foundIndex = budgetArr.findIndex(
          (budget) =>
            budget.title.toLocaleLowerCase() ===
            expense.category.toLocaleLowerCase()
        )
        // -1 equals not found. Push to default object in array. Else push to matching object in array
        if (foundIndex === -1) {
          budgetArr[0].expenses.push(expense)
          budgetArr[0].amountSpent =
            parseInt(budgetArr[0].amountSpent) + parseInt(expense.amount)
        } else {
          // If expenses are defined push to expenses, else create expenses as an array with expense as first object
          if (budgetArr[foundIndex].expenses) {
            budgetArr[foundIndex].expenses.push(expense)
            budgetArr[foundIndex].amountSpent =
              parseInt(budgetArr[foundIndex].amountSpent) +
              parseInt(expense.amount)
          } else {
            budgetArr[foundIndex].expenses = [expense]
            budgetArr[foundIndex].amountSpent = parseInt(expense.amount)
          }
        }
      })

      state.commit('setBudget', budgetArr)
    },
    // Change password (Seems like firebase has a bug with changing password)
    changePassword(state, payload) {
      console.log(payload)
      signInWithEmailAndPassword(auth, payload.email, payload.oldPassword)
        .then(() => {
          updatePassword(auth, payload.oldPassword, payload.newPassword)
            .then(() => {
              state.commit('setLoginError', '')
              console.log('Password changed')
            })
            .catch((error) => {
              state.commit('setLoginError', error)
              console.log(error)
            })
        })
        .catch((error) => {
          state.commit('setLoginError', error)
          console.log(error)
        })
    },
    // Delete account
    deleteAccount(state, payload) {
      console.log(payload)
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then(() => {
          auth.currentUser.delete().then(() => {
            state.commit('setLoginError', '')
            console.log('Account deleted')
          })
        })
        .catch((error) => {
          state.commit('setLoginError', error)
          console.log(error)
        })
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
    },
    getLoginError(state) {
      return state.loginError
    },
    getBudget(state) {
      return state.budget
    }
  }
export default createStore({ mutations, state, actions, getters, strict: true })
