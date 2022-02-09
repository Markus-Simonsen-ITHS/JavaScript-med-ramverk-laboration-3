<script>
  import { collection, addDoc } from 'firebase/firestore'
  import { db } from '../firebase'

  export default {
    data() {
      return {
        debt: '',
        title: '',
        date: '',
        amount: '15000',
        payOffDebt: '1000',
        toggle: 'block',
        interest: ''
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
          title: this.title,
          amount: this.amount,
          date: this.date
        }
        addDoc(collection(db, 'skuld'), docData)
      },
      submitPayOffDebt() {
        const docData = {
          email: this.$store.state.user.email,
          title: this.title,
          amount: this.amount,
          date: this.date,
          category: 'skuld'
        }
        addDoc(collection(db, 'utgift'), docData)
      }
    }
  }
</script>

<template>
  <h2>Avbetalning av skuld:</h2>
  <p class="titleText">{{ this.amount }}</p>
  <div class="barContainer" :style="{ display: toggle }" v-if="amount">
    <div class="debtBar" :style="{ width: debtBar }" />
  </div>
  <div class="container">
    <form @submit.prevent="">
      <p class="titleText">Lägg till skuld:</p>
      <input type="text" v-model="title" placeholder="Anteckning" />
      <input type="text" v-model="amount" placeholder="Mängd" />
      <input type="text" v-model="interest" placeholder="Ränta i %" />
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
  </div>
</template>
<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
  .titleText {
    margin: 0;
    font-weight: bold;
    letter-spacing: 0.1rem;
    margin-bottom: 15px;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin-top: 30px;
    background-color: #e7e7e7;
    border-radius: 8px;
  }
  .barContainer {
    margin-top: 10px;
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
</style>
