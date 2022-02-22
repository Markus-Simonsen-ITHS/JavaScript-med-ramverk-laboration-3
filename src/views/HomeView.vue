<script>
  import moment from 'moment'

  import BudgetItem from '../components/home/BudgetItem.vue'
  import StatusItem from '../components/home/StatusItem.vue'
  import NavBar from '../components/NavBar.vue'
  import BudgetComp from '../components/home/BudgetComp.vue'
  import WarningComponent from '../components/home/WarningComponent.vue'

  export default {
    data() {
      return {
        toggle: true
      }
    },
    methods: {
      goToAddPage() {
        this.$router.push('/add')
      },
      closeButton() {
        this.toggle = false
      }
    },
    computed: {
      // Calculates percentage of the budget, used in progress-bar as width
      calculateExpenseProgress() {
        if (this.budgets.length > 0) {
          const spent = parseInt(this.budgets[1].amountSpent)
          const budget = parseInt(this.budgets[1].sum)
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
            sum: budget.sum,
            id: budget.id
          })
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
        })
        return budgets
      }
    },
    components: {
      BudgetItem,
      StatusItem,
      NavBar,
      BudgetComp,
      WarningComponent
    }
  }
</script>

<template>
  <NavBar />
  <BudgetComp />
  <WarningComponent :amount-spent="calculateExpenseProgress" />

  <div class="account-overview-container">
    <div>
      <p class="account-overview-name">
        {{ budgets.length > 1 ? budgets[1].title : 'Laddar' }}
      </p>
      <p class="account-amount-spent">
        {{ budgets.length > 1 ? budgets[1].amountSpent : 0 }} kr
      </p>
      <div class="account-progress-container">
        <div
          class="account-progress-bar"
          :style="{
            width: calculateExpenseProgress + '%',
            maxWidth: 100 + '%'
          }"
        />
      </div>
      <p class="account-budget">
        Budget: {{ budgets.length > 1 ? budgets[1].sum : 0 }} kr
      </p>
    </div>
  </div>

  <div class="status-container">
    <StatusItem :key="totalIncome.name" :status="totalIncome" />
    <StatusItem :key="totalExpenses.name" :status="totalExpenses" />
  </div>
  <div class="overview-container">
    <h1>Översikt</h1>
    <div class="links">
      <router-link to="/history">Historik</router-link>
      <router-link to="/debt">Skuld</router-link>
    </div>
  </div>
  <ul class="category-list">
    <BudgetItem
      v-for="budgetItem in budgets"
      :key="budgetItem.budgetId"
      :budget="budgetItem"
    />
  </ul>
  <ul class="category-list">
    <li class="add-category-container">
      <div class="add-category-button" @click="goToAddPage" />
      <p>Lägg till</p>
    </li>
  </ul>
</template>

<style scoped>
  .account-overview-container {
    padding: 10px;
  }

  .account-overview-name {
    font-size: 1rem;
    margin: 0;
  }
  .account-amount-spent {
    margin: 0;
    font-weight: bold;
    letter-spacing: 0.1rem;
  }
  .account-progress-container {
    margin-top: 10px;
    background-color: #c4c4c4;
    height: 15px;
    border-radius: 10px;
  }
  .account-progress-bar {
    background-color: #212121;
    border-radius: 10px;
    height: 100%;
    width: 70%;
  }
  .account-budget {
    text-align: end;
    font-size: 1rem;
  }
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
    color: #606060;
    background-color: #c4c4c4;
    border-radius: 20px;
    align-self: center;
    justify-self: end;
    padding: 10px;
  }

  .category-list {
    padding: 10px;
    display: grid;
    gap: 20px;
  }

  .add-category-container {
    background-color: #e7e7e7;
    border-radius: 5px;
    list-style: none;
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    padding: 10px 0;
  }
  .add-category-container p {
    align-self: center;
  }
  /* Add-button */
  .add-category-button {
    background-color: #c4c4c4;
    border-radius: 10px;
    width: 70px;
    height: 70px;
    align-self: center;
    justify-self: center;
    position: relative;
  }
  /* The horizontal line */
  .add-category-button::after {
    content: ' ';
    border-radius: 10px;
    position: absolute;
    display: block;
    background-color: #000;
    height: 2px;
    top: 50%;
    left: 20px;
    right: 20px;
    z-index: 9;
  }
  /* The vertical line */
  .add-category-button::before {
    content: ' ';
    border-radius: 10px;
    position: absolute;
    display: block;
    background-color: #000;
    width: 2px;
    left: 50%;
    top: 20px;
    bottom: 20px;
    z-index: 9;
  }
  .add-category-container p {
    font-weight: bold;
  }
  .links {
    display: flex;
    gap: 15px;
    justify-content: right;
    align-items: center;
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
      grid-template-columns: 1fr 1fr;
    }
    .status-container {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    /* Hide history-link on desktop */
    .overview-container a {
      display: none;
    }
    .category-list {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 100px;
    }
    .add-category-container {
      padding: 10px;
      grid-template-columns: 0.2fr 1fr;
    }
  }
</style>
