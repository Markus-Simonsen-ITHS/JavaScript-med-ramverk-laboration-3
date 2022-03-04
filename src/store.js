import { createStore } from 'vuex'
import { auth, db } from './firebase'
import router from './router'

import moment from 'moment'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'

const mutations = {
    setUser(state, user) {
      state.user = user
    },
    displayLogoutMessage(state) {
      state.logoutMessage = true
    },
    setIncome(state, incomeArr) {
      state.income = incomeArr
    },
    setExpenses(state, expensesArr) {
      state.expenses = expensesArr
    },
    setExpensesReocurring(state, expensesArr) {
      state.expensesReocurring = expensesArr
    },
    setExpensesCategories(state, categoriesArr) {
      state.expensesCategories = categoriesArr
    },
    setLoginError(state, error) {
      state.loginError = error
    },
    setBudget(state, budgetArr) {
      state.budget = budgetArr
    },
    setTheme(state, theme) {
      state.theme = theme
    },
    setDisplayOnlyReoccuring(state, payload) {
      state.displayOnlyReoccuring = payload
    },
    setTimeFilter(state, payload) {
      state.timeFilter = payload
    }
  },
  state = {
    user: {},
    theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : null,
    logoutMessage: false,
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
    expensesReocurring: [
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
        expenses: [],
        incomeList: []
      }
    ],
    displayOnlyReoccuring: false,
    timeFilter: 'oneMonth'
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
    changeTheme(state, theme) {
      localStorage.setItem('theme', theme)

      state.commit('setTheme', theme)
    },
    async fetchAllIncomeForUser(state, userId) {
      // Creates a query where the id matches the passed userId
      const q = query(collection(db, 'inkomst'), where('id', '==', userId))
      // Fetching all documents that matches query
      const allIncome = await getDocs(q)

      const incomeArr = []

      // Iterating through all documents and saving the data from them
      allIncome.forEach((income) => {
        const localIncome = income.data()
        localIncome.incomeId = income.id

        incomeArr.push(localIncome)
      })

      state.dispatch('fetchBudgetsForUser', userId)

      state.commit('setIncome', incomeArr)
    },
    async fetchAllExpensesForUser(state, userId) {
      // Creates a query where the id matches the passed userId
      const q = query(collection(db, 'utgift'), where('id', '==', userId))
      const que = query(
        collection(db, 'återkommandeUtgift'),
        where('id', '==', userId)
      )
      // Fetching all documents that matches query

      const allExpenses = await getDocs(q)
      const allExpensesReocurring = await getDocs(que)

      const expensesArr = []
      const expensesReArr = []

      // Iterating through all documents and saving the data from them
      allExpenses.forEach((expense) => {
        const localExpense = expense.data()
        localExpense.expenseId = expense.id
        localExpense.amount = parseInt(localExpense.amount)
        localExpense.collection = 'utgift'
        expensesArr.push(localExpense)
      })
      allExpensesReocurring.forEach((expense) => {
        const localReoccuringExpense = expense.data()
        localReoccuringExpense.expenseId = expense.id
        localReoccuringExpense.amount = parseInt(localReoccuringExpense.amount)
        localReoccuringExpense.collection = 'återkommandeUtgift'
        expensesReArr.push(localReoccuringExpense)
      })

      state.dispatch('fetchBudgetsForUser', userId)

      state.commit('setExpenses', expensesArr)
      state.commit('setExpensesReocurring', expensesReArr)
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
          amount: 0,
          budgetId: '101010',
          id: userId,
          amountSpent: 0,
          expenses: [],
          incomeList: []
        }
      ]

      // Looping through each budgetitem and adding them to the budget array
      budgetSnapshots.forEach((budgetSnapshot) => {
        // Storing the data from the snapshot firebase sends
        let budgetItem = budgetSnapshot.data()
        // Adding id to the object
        budgetItem.budgetId = budgetSnapshot.id

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

      state.state.income.forEach((income) => {
        const foundIndex = budgetArr.findIndex(
          (budget) =>
            budget.title.toLocaleLowerCase() ===
            income.category.toLocaleLowerCase()
        )

        if (foundIndex === -1) {
          budgetArr[0].incomeList.push(income)
        } else {
          if (budgetArr[foundIndex].incomeList) {
            budgetArr[foundIndex].incomeList.push(income)
          } else {
            budgetArr[foundIndex].incomeList = [income]
          }
        }
      })

      state.commit('setBudget', budgetArr)
    },
    changeDisplayReoccuring(state, payload) {
      if (payload === 'all') {
        payload = false
      } else {
        payload = true
      }

      state.commit('setDisplayOnlyReoccuring', payload)
    },
    changeTimeFilter(state, payload) {
      state.commit('setTimeFilter', payload)
    },

    async fetchFlow(state, userId) {
      state.dispatch('fetchAllIncomeForUser', userId)
      state.dispatch('fetchAllExpensesForUser', userId)
    },
    // Change password (Seems like firebase has a bug with changing password)
    async changePassword(state, payload) {
      const user = auth.currentUser
      let cred = EmailAuthProvider.credential(
        payload.email,
        payload.oldPassword
      )

      reauthenticateWithCredential(user, cred)
        .then(() => {
          // User re-authenticated.
          updatePassword(user, payload.newPassword)
            .then(() => {
              // Update successful.
              console.log('Succeed')
            })
            .catch((error) => {
              console.log('Failed', error)
              // An error ocurred
              // ...
            })
        })
        .catch((error) => {
          // An error ocurred
          // ...
          console.log(error)
        })
    },
    // Delete account
    deleteAccount(state, payload) {
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
    getExpensesReocurring(state) {
      return state.expensesReocurring
    },
    getExpenseCategories(state) {
      return state.expensesCategories
    },
    getLoginError(state) {
      return state.loginError
    },
    getBudget(state) {
      return state.budget
    },
    getTheme(state) {
      return state.theme
    },
    getFilteredExpenses(state) {
      const expenses = state.expenses
      const reocurringExpenses = state.expensesReocurring

      const endDate = moment().add(1, 'day').format('YYYY-MM-DD')
      let startDate

      if (state.timeFilter === 'oneMonth') {
        startDate = moment().subtract(1, 'months').format('YYYY-MM-DD')
      } else if (state.timeFilter === 'threeMonths') {
        startDate = moment().subtract(3, 'months').format('YYYY-MM-DD')
      } else if (state.timeFilter === 'oneYear') {
        startDate = moment().subtract(12, 'months').format('YYYY-MM-DD')
      }

      const filteredArr = []

      expenses.forEach((expense) => {
        const expenseDate = moment(expense.date)
        const isBetween = expenseDate.isBetween(startDate, endDate)
        if (isBetween && !state.displayOnlyReoccuring) {
          filteredArr.push(expense)
        }
      })
      reocurringExpenses.forEach((reoccuringExpense) => {
        const expenseDate = moment(reoccuringExpense.date)
        const isBetween = expenseDate.isBetween(startDate, endDate)
        if (isBetween) {
          filteredArr.push(reoccuringExpense)
        }
      })
      return filteredArr
    },
    getFilteredIncome(state) {
      const income = state.income

      const endDate = moment().add(1, 'day').format('YYYY-MM-DD')
      let startDate

      if (state.timeFilter === 'oneMonth') {
        startDate = moment().subtract(1, 'months').format('YYYY-MM-DD')
      } else if (state.timeFilter === 'threeMonths') {
        startDate = moment().subtract(3, 'months').format('YYYY-MM-DD')
      } else if (state.timeFilter === 'oneYear') {
        startDate = moment().subtract(12, 'months').format('YYYY-MM-DD')
      }

      const filteredArr = []

      income.forEach((incomeObject) => {
        const incomeDate = moment(incomeObject.date)
        const isBetween = incomeDate.isBetween(startDate, endDate)
        if (isBetween && !state.displayOnlyReoccuring) {
          filteredArr.push(incomeObject)
        }
      })

      return filteredArr
    },
    getFilteredBudgets(state) {
      const endDate = moment().add(1, 'day').format('YYYY-MM-DD')
      let startDate

      if (state.timeFilter === 'oneMonth') {
        startDate = moment().subtract(1, 'months').format('YYYY-MM-DD')
      } else if (state.timeFilter === 'threeMonths') {
        startDate = moment().subtract(3, 'months').format('YYYY-MM-DD')
      } else if (state.timeFilter === 'oneYear') {
        startDate = moment().subtract(12, 'months').format('YYYY-MM-DD')
      }

      const filteredArr = []

      state.budget.forEach((budget) => {
        let newBudgetItem = { ...budget }
        newBudgetItem.expenses = []
        newBudgetItem.incomeList = []
        if (budget.expenses) {
          budget.expenses.forEach((expense) => {
            const expenseDate = moment(expense.date)
            const isBetween = expenseDate.isBetween(startDate, endDate)
            if (isBetween && !state.displayOnlyReoccuring) {
              newBudgetItem.expenses.push(expense)
            }
          })
        }

        const reoccuringExpensesArr = []

        state.expensesReocurring.forEach((reoccuringExpense) => {
          if (
            reoccuringExpense.category.toLocaleLowerCase() ===
              newBudgetItem.title.toLocaleLowerCase() &&
            moment(reoccuringExpense.date).isBetween(startDate, endDate)
          ) {
            reoccuringExpensesArr.push(reoccuringExpense)
          } else if (
            newBudgetItem.title.toLocaleLowerCase() === 'övrigt' &&
            !reoccuringExpense.category &&
            moment(reoccuringExpense.date).isBetween(startDate, endDate)
          ) {
            reoccuringExpensesArr.push(reoccuringExpense)
          }
        })

        newBudgetItem.expenses = newBudgetItem.expenses.concat(
          reoccuringExpensesArr
        )

        if (budget.incomeList) {
          budget.incomeList.forEach((incomeItem) => {
            const incomeDate = moment(incomeItem.date)
            const isBetween = incomeDate.isBetween(startDate, endDate)
            if (isBetween && !state.displayOnlyReoccuring) {
              newBudgetItem.incomeList.push(incomeItem)
            }
          })
        }

        if (
          newBudgetItem.expenses.length > 0 ||
          newBudgetItem.incomeList.length > 0
        ) {
          filteredArr.push(newBudgetItem)
        }
      })

      return filteredArr
    }
  }
export default createStore({ mutations, state, actions, getters, strict: true })
