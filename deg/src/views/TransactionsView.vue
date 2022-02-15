<script>
  import { db } from '../firebase'
  import { collection, getDocs, query, where } from 'firebase/firestore'
  import NavBar from '../components/NavBar.vue'
  import ChartComp from '../components/ChartComp.vue'

  export default {
    components: {
      NavBar,
      ChartComp,
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
      },
    },
    mounted() {
      this.fetchexpense()
    },
    data() {
      return {
        expenses: [],
      }
    },
  }
</script>

<template>
  <NavBar />
  <!--Show if there aren't any registered transactions-->
  <div
    class="view-expenses"
    v-if="this.expenses === '' || this.expenses === null"
  >
    <h1>Inga utgifter har registrerats</h1>
    <input type="button" value="Lägg till utgift" @click="goToAddView" />
  </div>

  <!--Show if there are any registered transactions-->
  <div class="expenses" v-else>
    <h1>Historik</h1>
    <p>Denna månad</p>
    <ul>
      <li>Lista</li>
      <button @click="goToChart()">Diagram</button>
    </ul>
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
          <p v-for="expense in expenses" :key="expense">{{ expense.date }}</p>
        </div>
      </div>
    </div>
  </div>

  <ChartComp :data="expenses" />
</template>
<style scoped>
  * {
    box-sizing: border-box;
  }
</style>
