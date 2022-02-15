<script>
  import { db } from '../firebase'
  import { collection, getDocs, query, where } from 'firebase/firestore'
  import NavBar from '../components/NavBar.vue'
  import ChartComp from '../components/ChartComp.vue'

  export default {
    components: {
      NavBar,
      ChartComp
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
        expenses: []
      }
    }
  }
</script>

<template>
  <NavBar />
  <!--Show if there aren't any registered transactions-->
  <div
    class="view-expenses"
    v-if="this.expenses === '' || this.expenses === null"
  >
    <form class="expenses-form">
      <div class="form-inner">
        <h1>Inga utgifter har registrerats</h1>
        <input type="button" value="Lägg till utgift" @click="goToAddView" />
      </div>
    </form>
  </div>

  <!--Show if there are any registered transactions-->
  <div class="expenses" v-else>
    <h1>Historik</h1>
    <p>Denna månad</p>
    <ul>
      <li>Lista</li>
      <button @click="goToChart()">Diagram</button>
    </ul>
  </div>

  <ChartComp :data="expenses" />

  <div class="expenses-card-container">
    <div class="expenses-card">
      <ol id="mat-expenses">
        <li v-for="expense in expenses" :key="expense">
          {{ expense.category }}
          <h5 class="budget">budget: 1000 kr</h5>
        </li>
        <li>{{ expense.title }}</li>
        <li>{{ expense.amount }}</li>
      </ol>
    </div>
  </div>
</template>

<style scoped>
  #mat-expenses li {
    list-style: none;
    background-color: #e7e7e7;
    max-height: 244px;
    max-width: 445px;
    align-items: center;
    flex-direction: column;
    background-color: #e7e7e7;
    margin: 2%;
    padding: 2%;
    left: 33px;
    top: 149px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  .expenses-card-container {
    padding: 50px 15px;
  }
</style>
