<script>
  import CategoryItem from '../components/home/CategoryItem.vue'
  import StatusItem from '../components/home/StatusItem.vue'

  export default {
    methods: {
      goToAddPage() {
        this.$router.push('/add')
      },
      closeButton() {
        this.toggle = false
        console.log('test')
      }
    },
    computed: {
      // Calculates percentage of the budget, used in progress-bar as width
      calculateExpenseProgress() {
        if (this.categories.length > 0) {
          const spent = this.categories[0].amountSpent
          const budget = this.categories[0].budget
          const progress = (100 * spent) / budget
          return progress + '%'
        } else {
          return '0%'
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
      categories() {
        return this.$store.getters.getExpenseCategories
      }
    },
    components: {
      CategoryItem,
      StatusItem
    }
  }
</script>

<template>
  <div class="warning-container" v-if="this.toggle === true">
    <div
      class="warning-card"
      v-if="
        this.calculateExpenseProgress === '50%' ||
        this.calculateExpenseProgress === '25%'
      "
    >
      <p>Varning, Lorem ipsum dolor sit amet!</p>
      <div id="close-button" @click="closeButton">
        <div class="close-button">
          <div class="close-button-r" />
        </div>
      </div>
    </div>
  </div>

  <div class="account-overview-container">
    <div>
      <p class="account-overview-name">Matkonto</p>
      <p class="account-amount-spent">2500 kr</p>
      <div class="account-progress-container">
        <div
          class="account-progress-bar"
          :style="{ width: calculateExpenseProgress }"
        />
      </div>
      <p class="account-budget">Budget: 4000 kr</p>
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
    <CategoryItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
    />
  </ul>
  <ul class="category-list">
    <li class="add-category-container">
      <div class="add-category-button" @click="goToAddPage" />
      <p>Lägg till</p>
    </li>
  </ul>
  <!-- <div
    v-if="
      (100 * categories[1].amountSpent) / categories[1].budget === 50 ||
      (100 * categories[1].amountSpent) / categories[1].budget === 25
    "
  >
    WARNING
  </div> -->
</template>

<style scoped>
  .close-button {
    height: 25px;
    width: 2px;
    margin-left: 12px;
    background-color: white;
    transform: rotate(45deg);
    margin: 0 16px 0 0;
  }

  .close-button-r {
    height: 25px;
    width: 2px;
    background-color: white;
    transform: rotate(90deg);
  }

  .warning-card {
    background-color: lightcoral;
    color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 5px 5px 0px #676767;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .warning-container p {
    font-size: 16px;
  }

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
