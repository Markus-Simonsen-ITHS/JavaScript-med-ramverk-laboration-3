<script>
  import { db } from '../firebase'
  import { collection, getDocs, query, where } from 'firebase/firestore'
  import ChartComp from '../components/ChartComp.vue'
  import FilterComponent from '../components/history/FilterComponent.vue'

  export default {
    components: {
      ChartComp,
      FilterComponent
    },
    methods: {
      goToAddView() {
        this.$router.push('/add')
      },
      async fetchexpense() {
        const userId = this.$store.getters.getUser.id
        const q = query(collection(db, 'utgift'), where('id', '==', userId))
        const userExpenses = []
        const allExpenses = await getDocs(q)
        allExpenses.forEach((expense) => {
          userExpenses.push(expense.data())
        })
        this.expenses = userExpenses
      },
      // Defines which view is to be displayed, default is list
      setView(view) {
        this.view = view
      },
      // Defines the status of items to be displayed, like reoccurring or all items
      setItemStatus(status) {
        this.itemStatus = status
      },
      // Defines the time period of which items are to be displayed
      setTimeFilter(timeFilter) {
        this.timeFilter = timeFilter
      },
      goToChart() {
        const viewChart = true
        this.chart = viewChart
      }
    },
    mounted() {
      this.fetchexpense()
    },
    data() {
      return {
        expenses: [],
        view: 'list',
        itemStatus: 'reoccurring',
        timeFilter: 'oneMonth',
        toggle: false
      }
    },
    computed: {
      budgets() {
        return this.$store.getters.getBudget
      }
    }
  }
</script>

<template>
  <!--Ska man ta bort denna??-->
  <FilterComponent
    @set-view="setView"
    @change-item-status="setItemStatus"
    @change-time-filter="setTimeFilter"
  />
  <!--Show if there aren't any registered transactions-->

  <div class="view-expenses" v-if="expenses === '' || expenses === null">
    <form class="expenses-form">
      <div class="form-inner">
        <h1>Inga utgifter har registrerats</h1>
        <input type="button" value="Lägg till utgift" @click="goToAddView" />
      </div>
    </form>
  </div>

  <!--Show if there are any registered transactions-->

  <div class="expenses" v-else>
    <!--Select view option, list by default-->
    <h1>Lista</h1>
    <h2>Denna månad</h2>
  </div>

  <ChartComp :data-b="expenses" v-show="view === 'chart'" />

  <div id="history-list-container" v-if="view === 'list'">
    <div
      class="history-list"
      @click="toggle = !toggle"
      v-for="budget in budgets"
      :key="budget"
    >
      <img src="../../assets/fox.jpeg" alt="deg logo" />
      <p class="budget-title">{{ budget.title }}</p>
      <p class="budget-sum">budget:</p>
      <p class="budget-sum-self">{{ budget.sum }} kr</p>

      <div v-for="expense in expenses" :key="expense">
        <p class="expense-title" v-show="toggle">{{ expense.title }}</p>
        <p class="expense-amount" v-show="toggle">{{ expense.amount }} kr</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  #history-list-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 547px;
  }

  .history-list {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    line-height: 0.5;
    letter-spacing: 0.5px;
    cursor: pointer;
    margin: 30px;
    padding: 10px;
    border-radius: 8px;
    background-color: #e7e7e7;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  img {
    display: flex;
    width: 56px;
    height: 56px;
    left: 44px;
    top: 160px;
    border-radius: 8px;
  }

  .budget-title {
    margin: -30px 0 20px 65px;
    letter-spacing: 0.5px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .budget-sum {
    letter-spacing: 0.5px;
    font-size: 1rem;
    font-weight: bold;
  }
  .budget-sum-self {
    letter-spacing: 0.5px;
    font-size: 1rem;
    font-weight: bold;
    align-self: flex-end;
    margin: -23px 0 10px 0;
    text-transform: lowercase;
  }

  .expense-title {
    letter-spacing: 0.5px;
    font-size: 1rem;
    padding: 1rem 0 0 0;
    border-top: 1px solid black;
  }

  .expense-amount {
    float: right;
    letter-spacing: 0.5px;
    font-size: 1rem;
    align-self: flex-end;
    margin: -23px 0 0 0;
    text-transform: lowercase;
  }

  @media screen and (max-width: 500px) {
    .history-list {
      margin: 10px;
      padding: 15px;
      min-width: 200px;
    }

    img {
      width: 45px;
      height: 45px;
    }
  }
</style>
