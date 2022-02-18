<script>
  import { db } from '../firebase'
  import { collection, getDocs, query, where } from 'firebase/firestore'
  import NavBar from '../components/NavBar.vue'
  import ChartComp from '../components/ChartComp.vue'
  import FilterComponent from '../components/history/FilterComponent.vue'

  export default {
    components: {
      NavBar,
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
        timeFilter: 'oneMonth'
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
  <NavBar />
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
    <h2>Denna månad</h2>
  </div>
  <ChartComp :data-b="expenses" v-show="view === 'chart'" />

  <div class="expenses-card-container" v-if="view === 'list'">
    <div class="expenses-card">
      <ol id="category-expenses">
        <li v-for="expense in expenses" :key="expense">
          <img class="logo" src="../../../assets/fox.jpeg" alt="logo" />
          {{ expense.category }}
          <h5
            v-for="budgetItem in budgets"
            :key="budgetItem.budgetId"
            :budget="budgetItem"
          >
            Budget:
            {{ budgetItem.sum }} kr
          </h5>

          {{ expense.title }}
          {{ expense.amount }} kr
        </li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
  .expenses {
    display: flex;
    justify-content: flex-end;
    margin: 10px;
    padding: auto;
    font-size: 1rem;
  }
  .expenses-card-container {
    height: 244px;
    width: 445px;
    left: 33px;
    margin: 3%;
    border-radius: 8px;
  }
  #category-expenses li {
    display: flex;
    flex-direction: column;
    list-style: none;
    margin: 2%;
    padding: 3%;
    border-radius: 8px;
    background-color: #e7e7e7;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  #category-expenses {
    display: flex;
    flex-direction: column;
    justify-content: end;
  }

  .logo-container {
    display: flex;
    flex-direction: row;
  }
  .logo {
    border-radius: 5px;
    min-width: 50px;
    max-width: 100%;
    width: 20%;
    max-height: 100%;
  }
</style>
