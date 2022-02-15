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
  <div class="expenses" v-if="view === 'list' && expenses.length > 0">
    <div class="expenses-container">
      <div class="expenses-card">
        <h2 v-for="expense in expenses" :key="expense">
          {{ expense.category }}
        </h2>
        <div class="expenses-text">
          <h4 v-for="expense in expenses" :key="expense">
            {{ expense.title }}
          </h4>
          <p v-for="expense in expenses" :key="expense">{{ expense.amount }}</p>
        </div>
      </div>
    </div>
  </div>
  <ChartComp :data="expenses" />
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .view-expenses {
    display: flex;
    justify-content: center;
    min-height: 100vh;
    align-items: center;
  }

  .expenses-form {
    display: block;
    width: 100%;
    padding: 15px;
  }

  .form-inner {
    padding: 50px 15px;
  }

  .expenses-card {
    display: flex;
    flex-direction: column;
    background-color: #e7e7e7;
    margin: 2%;
    padding: 2%;
    max-height: 244px;
    max-width: 445px;
    left: 33px;
    top: 149px;
    border-radius: 8px;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
</style>
