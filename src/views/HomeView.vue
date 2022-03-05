<script>
  import moment from 'moment'

  import BudgetItem from '../components/home/BudgetItem.vue'
  import StatusItem from '../components/home/StatusItem.vue'
  import NavBar from '../components/NavBar.vue'
  import WarningComponent from '../components/home/WarningComponent.vue'
  import AccountOverviewComponent from '../components/home/AccountOverviewComponent.vue'

  export default {
    data() {
      return {
        toggle: true,
        activeBudget: { id: null }
      }
    },
    methods: {
      goToAddPage() {
        this.$router.push('/add')
      },
      closeButton() {
        this.toggle = false
      },
      setActiveBudget(budget) {
        this.activeBudget = budget
        localStorage.setItem('activeBudget', JSON.stringify(budget.budgetId))
      },
      checkLocalStorage() {
        const localStorageActiveBudget = JSON.parse(
          localStorage.getItem('activeBudget')
        )
        if (localStorageActiveBudget) {
          let activeBudgetTemp = this.budgets.find(
            (budget) => budget.budgetId === localStorageActiveBudget
          )
          this.activeBudget = activeBudgetTemp
            ? activeBudgetTemp
            : this.budgets[0]
        } else {
          console.log(this.budgets[0])
          this.activeBudget = this.budgets[0]
        }
      }
    },
    computed: {
      // Calculates percentage of the budget, used in progress-bar as width
      calculateExpenseProgress() {
        if (this.activeBudget.amountSpent) {
          if (this.activeBudget.amountSpent > this.activeBudget.amount)
            return 100
          const spent = this.activeBudget.amountSpent
          const budget = this.activeBudget.amount
          const progress = (100 * spent) / budget
          return progress
        } else {
          return 0
        }
      },
      // Gets all income from the store and calculates the total amount
      totalIncome() {
        let income = { name: 'Intäkter', amount: 0 }
        this.$store.getters.getIncome.forEach((incomeObject) => {
          // Checking if the date of the income is the same month as today
          if (moment(incomeObject.date).isSame(new Date(), 'month')) {
            income.amount += parseInt(incomeObject.amount)
          }
        })
        return income
      },
      // Gets all expenses from the store and calculates the total amount
      totalExpenses() {
        let expenses = { name: 'Utgifter', amount: 0 }
        this.$store.getters.getExpenses.forEach((expenseObject) => {
          // Checking if the date of the expense is the same month as today
          if (moment(expenseObject.date).isSame(new Date(), 'month')) {
            expenses.amount += parseInt(expenseObject.amount)
          }
        })
        return expenses
      },
      reocurringExpenses() {
        // ^ fetches reocurring expense data from the store and calculates the total amount
        let expensesRe = 0
        this.$store.getters.getExpensesReocurring.forEach((expenseObject) => {
          expensesRe += parseInt(expenseObject.amount)
        })
        return expensesRe
      },
      // Recieves all budgets from the store and filters so that only expenses
      // which are from this month is displayed
      budgets() {
        // creating new array to store the expenses
        const budgets = []
        // looping through all budgets in the store
        this.$store.getters.getBudget.forEach((budget) => {
          // Pushing each budget to the new array
          budgets.push({
            title: budget.title,
            items: [],
            amountSpent: 0,
            amount: budget.amount,
            budgetId: budget.budgetId
          })

          // Checking if budget.expenses exists
          if (budget.expenses) {
            // looping through all expenses in each budget
            budget.expenses.forEach((item) => {
              // Checking which index the budget is in new array
              const foundIndex = budgets.findIndex(
                (_budget) => _budget.title === budget.title
              )
              // If the expense is in the same month as today, add to created
              // budget array
              if (moment(item.date).isSame(new Date(), 'month')) {
                budgets[foundIndex].amountSpent =
                  parseInt(budgets[foundIndex].amountSpent) +
                  parseInt(item.amount)
                budgets[foundIndex].items.push(item)
              }
            })
          }
        })

        return budgets
      }
    },
    mounted() {
      this.checkLocalStorage()
    },
    watch: {
      budgets() {
        this.checkLocalStorage()
      }
    },
    components: {
      BudgetItem,
      StatusItem,
      NavBar,

      WarningComponent,
      AccountOverviewComponent
    }
  }
</script>

<template>
  <NavBar />
  <WarningComponent :amount-spent="calculateExpenseProgress" />
  <AccountOverviewComponent
    :budget="activeBudget"
    :expense-progress="calculateExpenseProgress"
  />

  <RouterLink class="budget" to="/Budget"
    ><input class="buttons" type="button" value="Lägg till budget"
  /></RouterLink>

  <div
    class="status-container"
    :class="{
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
  >
    <StatusItem :key="totalIncome.name" :status="totalIncome" />
    <StatusItem
      :key="totalExpenses.name"
      :status="totalExpenses"
      :expenses="reocurringExpenses"
    />
  </div>
  <div
    class="overview-container"
    :class="{
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
  >
    <h1>Översikt</h1>
    <div class="links">
      <router-link to="/history">Historik</router-link>
      <router-link to="/debt">Skuld</router-link>
    </div>
  </div>
  <ul
    class="category-list"
    :class="{
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
  >
    <BudgetItem
      v-for="budgetItem in budgets"
      :key="budgetItem.budgetId"
      :budget="budgetItem"
      :active-budget="activeBudget"
      @set-active-budget="setActiveBudget"
    />
  </ul>
  <ul
    class="category-list"
    :class="{
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
  >
    <button @click="goToAddPage">Lägg till en utgift eller inkomst</button>
  </ul>
</template>

<style scoped>
  .status-container {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .overview-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }

  .overview-container h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .overview-container a {
    text-decoration: none;
    color: white;
    background-color: #5969ea;
    border-radius: 20px;
    align-self: center;
    justify-self: end;
    padding: 10px;
  }

  .category-list {
    padding: 10px;
    display: grid;
    gap: 20px;
    margin: 0;
  }
  .category-list button {
    background-color: #5969ea;
    color: white;
    outline: none;
    border: none;
    border-radius: 8px;
    height: 50px;
    font-size: 1.5rem;
  }

  .links {
    display: flex;
    gap: 15px;
    justify-content: right;
    align-items: center;
  }
  .buttons {
    background-color: #5969ea;
    color: #fff;
    border-radius: 100px;
    font-size: 16px;
    padding: 10px 16px;
    border: none;
    margin-bottom: 5px;
  }
  #budget-button {
    display: flex;
    justify-content: center;
  }
  .budget {
    display: flex;
    text-decoration: none;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (min-width: 700px) {
    .warning-card {
      width: 50%;
    }

    .warning-container p {
      font-size: 24px;
    }
    .account-overview-container {
      display: grid;
    }
    .status-container {
      display: flex;
      justify-content: center;
      justify-content: space-around;
    }
    /* Hide history-link on desktop */
    .overview-container a {
      display: none;
    }
    .category-list {
      grid-template-columns: 1fr 1fr;
    }
    .add-category-container {
      padding: 10px;
      grid-template-columns: 0.2fr 1fr;
    }
    .status-card {
      width: 650px;
    }
  }
</style>
