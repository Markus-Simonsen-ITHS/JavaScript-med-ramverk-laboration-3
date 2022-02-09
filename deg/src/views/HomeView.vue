<script>
  import CategoryItem from '../components/home/CategoryItem.vue'
  import StatusItem from '../components/home/StatusItem.vue'

  export default {
    data() {
      return {
        // Temporary array until we fetch data from db
        categories: [
          {
            name: 'Mat',
            amountSpent: 2500,
            budget: 4000
          },
          {
            name: 'Mat',
            amountSpent: 2500,
            budget: 4000
          },
          {
            name: 'Mat',
            amountSpent: 2500,
            budget: 4000
          },
          {
            name: 'Mat',
            amountSpent: 2500,
            budget: 4000
          },
          {
            name: 'Mat',
            amountSpent: 2500,
            budget: 4000
          }
        ],
        // Temporary arrary until we fetch data from db
        statuses: [
          {
            name: 'Intäkter',
            amount: 1000
          },
          {
            name: 'Utgifter',
            amount: 5000
          }
        ]
      }
    },
    methods: {
      goToAddPage() {
        this.$router.push('/add')
      }
    },
    computed: {
      // Calculates percentage of the budget, used in progress-bar as width
      calculateExpenseProgress() {
        const budget = 4000
        const spent = 2000
        const progress = (100 * spent) / budget
        return progress + '%'
      }
    },
    components: {
      CategoryItem,
      StatusItem
    }
  }
</script>

<template>
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
    <StatusItem
      v-for="status in statuses"
      :key="status.name"
      :status="status"
    />
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
