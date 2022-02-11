<script>
  import {
    collection,
    doc,
    addDoc,
    setDoc,
    getDocs,
    updateDoc
  } from 'firebase/firestore'
  import { db } from '../firebase'

  export default {
    data() {
      return {
        title: '',
        selectValue: null,
        selected: 'selected',
        amount: 5,
        date: '',
        interest: '',
        payOffDebt: 1,
        toggle: 'block',
        debts: []
      }
    },
    created() {
      this.fetchDebtData()
    },
    methods: {
      debtBar(max, pay) {
        let progress = (100 * pay) / max
        progress = 100 - progress
        // progress bar tickar nu ner ju mer man betalar av
        return progress + '%'
      },
      async fetchDebtData() {
        const querySnapshot = await getDocs(collection(db, 'skuld'))
        querySnapshot.forEach((doc) => {
          if (doc.data().email === this.$store.state.user.email) {
            //byt till ID
            this.debts.push(doc.data())
          }
        })
      },
      submitDebt() {
        const docData = {
          email: this.$store.state.user.email,
          title: this.title,
          amount: Number(this.amount),
          date: this.date
        }
        setDoc(doc(db, 'skuld', this.title), docData)
        this.clearFieldsDebt()
      },
      submitPayOffDebt() {
        const docData = {
          email: this.$store.state.user.email,
          title: this.selectValue + ', avbetalning',
          amount: Number(this.payOffDebt),
          category: 'skuldavbetalning'
        }
        addDoc(collection(db, 'återkommandeUtgift'), docData)
        const docRef = doc(db, 'skuld', this.selectValue)
        //lägger till payOffDebt i korresponderande backend databas objekt för användning i debtBar
        updateDoc(docRef, {
          payOffDebt: Number(this.payOffDebt)
        })
        this.clearFieldsPayOffDebt()
      },
      clearFieldsDebt() {
        this.title = ''
        this.amount = ''
        this.interest = ''
        this.date = ''
      },
      clearFieldsPayOffDebt() {
        this.payOffDebt = ''
      },
      onChange(option) {
        this.selectValue = option.target.value
      }
    }
  }
</script>

<template>
  <h1>Avbetalning av skuld</h1>

  <ul>
    <li><h2>Skulder:</h2></li>
    <li v-if="this.debts[0] === undefined">
      <p class="titleText">Du har inga skulder</p>
    </li>
    <li v-else :key="entry" v-for="entry in this.debts">
      <p class="titleText">
        <span class="title">
          <u>{{ entry.title }}</u></span
        ><br />
        Initial skuld: {{ entry.amount }} <br />
        Resterande skuld: {{ entry.amount - entry.payOffDebt }}
      </p>
      <div class="barContainer" :style="{ display: toggle }">
        <div
          class="debtBar"
          :style="{ width: debtBar(entry.amount, entry.payOffDebt) }"
        />
        <p>Avbetalning varje månad: {{ entry.payOffDebt }}</p>
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
        <input type="button" value="Avbryt" @click="clearFieldsDebt" />
      </div>
    </form>
    <form @submit.prevent="">
      <p class="titleText">
        Vill du börja med avbetalning av en av dina skulder varje månad, eller
        ändra på nuvarande avbetalning?
      </p>
      <select v-if="this.debts[0] === undefined">
        <option>Du har inga skulder</option>
      </select>
      <select v-else @change="onChange($event)">
        <!-- v-on tar värdet som väljaren har valt -->
        <option>Välj skuld...</option>
        <option :key="entry" :value="entry.title" v-for="entry in this.debts">
          {{ entry.title }}
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
        <input type="button" value="Avbryt" @click="clearFieldsPayOffDebt" />
      </div>
    </form>
  </div>
</template>

<style scoped>
  h1 {
    margin-bottom: 60px;
    font-size: 200%;
    text-align: center;
  }
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10px;
  }
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style: none;
    padding-left: 0;
  }
  li {
    border-bottom: 2px solid #e7e7e7;
    margin-top: 10px;
    padding-bottom: 10px;
    width: 80%;
  }
  .barContainer {
    margin-bottom: 70px;
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
  .titleText {
    font-weight: bold;
    letter-spacing: 0.1rem;
    line-height: 1.5;
  }
  .title {
    font-size: 115%;
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
