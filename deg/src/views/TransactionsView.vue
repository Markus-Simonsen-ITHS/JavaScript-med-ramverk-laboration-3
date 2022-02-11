<script>
  import { db } from '../firebase'
  import { collection, getDocs } from 'firebase/firestore'
  import NavBar from '../components/NavBar.vue'

  export default {
    components: {
      NavBar
    },
    methods: {
      goToAddView() {
        this.$router.push('/add')
      },
      async fetchexpense() {
        const hejsan = collection(db, 'utgift')
        const hej = await getDocs(hejsan)
        const expensesAre = []
        hej.forEach((expense) => {
          expensesAre.push(expense.data())
        })
        this.expenses = expensesAre
      }
    },
    mounted() {
      this.fetchexpense()
    },
    data() {
      return { expenses: [] }
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
    <div class="expenses-container">
      <div class="expenses-card">
        <h2 class="title">Title</h2>
        <div class="expenses-budget">
          <h5>BUDGET</h5>
          <p>belopp</p>
        </div>
        <div class="expenses-text">
          <h4>INFO</h4>
          <p>utgift i kr</p>
        </div>
      </div>
      <div class="expenses-card">
        <h2>TITEL</h2>
        <div class="expenses-budget">
          <h5>BUDGET</h5>
          <p>belopp</p>
        </div>
        <div class="expenses-text">
          <h4>INFO</h4>
          <p>utgift i kr</p>
        </div>
      </div>
      <div class="expenses-card">
        <h2>TITEL</h2>
        <div class="expenses-budget">
          <h5>BUDGET</h5>
          <p>belopp</p>
        </div>
      </div>
      <div class="expenses-card">
        <h2>TITEL</h2>
        <div class="expenses-budget">
          <h5>BUDGET</h5>
          <p>belopp</p>
        </div>
      </div>
      <div class="expenses-card">
        <h2>TITEL</h2>
        <div class="expenses-budget">
          <h5>BUDGET</h5>
          <p>belopp</p>
        </div>
      </div>
    </div>
  </div>
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

  .expenses-text {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .expenses-budget {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
</style>
