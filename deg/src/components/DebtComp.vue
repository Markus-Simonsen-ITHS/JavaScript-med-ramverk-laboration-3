<script>
  import { collection, addDoc } from 'firebase/firestore'
  import { db } from '../firebase'

  export default {
    data() {
      return {
        title: 'test',
        date: '',
        amount: '15000',
        payOffDebt: '1000',
        interest: '',
        toggle: 'block'
      }
    },
    computed: {
      debtBar() {
        const max = this.amount
        const payOffDebt = this.payOffDebt
        const progress = (100 * payOffDebt) / max
        return progress + '%'
      }
    },
    methods: {
      submitDebt() {
        const docData = {
          email: this.$store.state.user.email,
          title: this.debt.title,
          amount: this.debt.amount,
          date: this.debt.date
        }
        addDoc(collection(db, 'skuld'), docData)
      },
      submitPayOffDebt() {
        const docData = {
          email: this.$store.state.user.email,
          title: this.title,
          amount: this.amount,
          date: this.date,
          category: 'skuldavbetalning'
        }
        addDoc(collection(db, 'återkommandeUtgift'), docData)
      }
    }
  }
</script>

<template>
  <h1>Avbetalning av skuld</h1>
  <h2>Skulder:</h2>
  <!--  :key="debts" v-for="debts in STORAGEDEBTS" -->
  <ul>
    <li>
      <p class="titleText" v-if="title">
        {{ this.title }}: {{ this.amount }}
        <!-- STORAGE title och amount -->
      </p>
      <div class="barContainer" :style="{ display: toggle }" v-if="amount">
        <div class="debtBar" :style="{ width: debtBar }" />
      </div>
    </li>
  </ul>
  <div class="container">
    <form @submit.prevent="">
      <p class="titleText">Lägg till skuld:</p>
      <input type="text" v-model="title" placeholder="Anteckning" />
      <input type="text" v-model="amount" placeholder="Mängd" />
      <input type="text" v-model="interest" placeholder="Ränta " />
      <input type="date" v-model="date" placeholder="Datum" />

      <div class="button-container">
        <input
          type="submit"
          value="Lägg till"
          @click="submitDebt"
          @keyup.enter="submitDebt"
        />
        <input type="button" value="Avbryt" />
      </div>
    </form>
    <form @submit.prevent="">
      <p class="titleText">
        Vill du betala av lite på dina skulder varje månad?
      </p>
      <select>
        <option>Välj skuld...</option>
        <option :key="entry" :value="entry" v-for="entry in this.debts">
          <!--  :key="debts" v-for="debts in STORAGEDEBTS" -->
          {{ entry }}
        </option>
      </select>
      <input type="text" v-model="payOffDebt" placeholder="Mängd" />
      <p class="note">Notera: avbetalningen listas som en återkommand utgift</p>
      <div class="button-container">
        <input
          type="submit"
          value="Lägg till"
          @click="submitPayOffDebt"
          @keyup.enter="submitPayOffDebt"
        />
        <input type="button" value="Avbryt" />
      </div>
    </form>
  </div>
</template>

<style scoped>
  h1 {
    margin-bottom: 60px;
    font-size: 200%;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
  }
  ul {
    list-style: none;
    padding-left: 0;
  }
  li {
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }
  .titleText {
    font-weight: bold;
    letter-spacing: 0.1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #e7e7e7;
    border-radius: 8px;
    width: 70%;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .barContainer {
    margin-bottom: 30px;
    background-color: #c4c4c4;
    height: 15px;
    border-radius: 10px;
  }
  .debtBar {
    background-color: #212121;
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }
  .button-container {
    margin-top: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
  input[type='button'],
  input[type='submit'] {
    background-color: #292929;
    color: #fff;
    height: 40px;
    border-radius: 100px;
    width: 100px;
  }
  input[type='text'],
  input[type='date'] {
    height: 40px;
    border-radius: 10px;
    border: none;
    margin-bottom: 10px;
  }
  select {
    height: 40px;
    background-color: white;
    border-radius: 10px;
    outline: none;
    border: none;
    margin-bottom: 10px;
  }
  .note {
    font-size: 110%;
  }
</style>
