<script>
  import BudgetItem from '../components/home/BudgetItem.vue'
  import StatusItem from '../components/home/StatusItem.vue'
  import NavBar from '../components/NavBar.vue'
  import BudgetComp from '../components/home/BudgetComp.vue'
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
        localStorage.setItem('activeBudget', JSON.stringify(budget))
      },
      checkLocalStorage() {
        const localStorageActiveBudget = JSON.parse(
          localStorage.getItem('activeBudget')
        )
        if (localStorageActiveBudget) {
          this.activeBudget = localStorageActiveBudget
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
          const spent = this.activeBudget.amountSpent
          const budget = this.activeBudget.sum
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
          income.amount += parseInt(incomeObject.amount)
        })
        return income
      },
      // Gets all expenses from the store and calculates the total amount
      totalExpenses() {
        let expenses = { name: 'Utgifter', amount: 0 }
        this.$store.getters.getExpenses.forEach((expenseObject) => {
          expenses.amount += parseInt(expenseObject.amount)
        })
        return expenses
      },
      budgets() {
        return this.$store.getters.getBudget
      }
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
      BudgetComp,
      WarningComponent,
      AccountOverviewComponent
    }
  }
</script>

<template>
  <NavBar />
  <BudgetComp />
  <WarningComponent :amount-spent="calculateExpenseProgress" />
  <AccountOverviewComponent
    :budget="activeBudget"
    :expense-progress="calculateExpenseProgress"
  />

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
      :active-budget="activeBudget"
      @set-active-budget="setActiveBudget"
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
