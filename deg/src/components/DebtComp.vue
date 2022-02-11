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
        active: false,
        title: null,
        selectValue: null,
        amount: null,
        date: null,
        interest: null,
        payOffDebt: null,
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
        // debt bar now gets smaller the more of the debt you pay off
        return progress + '%'
      },
      async fetchDebtData() {
        //fetches debt data of current user and adds to debts array
        const querySnapshot = await getDocs(collection(db, 'skuld'))
        querySnapshot.forEach((doc) => {
          if (doc.data().id === this.$store.state.user.id) {
            this.debts.push(doc.data())
          }
        })
      },
      submitDebt() {
        //submits debt data and clear fields
        const docData = {
          id: this.$store.state.user.id,
          title: this.title,
          amount: Number(this.amount),
          date: this.date
        }
        setDoc(doc(db, 'skuld', this.title), docData)
        this.clearFieldsDebt()
      },
      submitPayOffDebt() {
        //submits debt payment and clear fields
        const docData = {
          id: this.$store.state.user.id,
          title: this.selectValue + ', avbetalning',
          amount: Number(this.payOffDebt),
          category: 'skuldavbetalning'
        }
        addDoc(collection(db, 'återkommandeUtgift'), docData)
        const docRef = doc(db, 'skuld', this.selectValue)
        //adds payOffDebt in corresponding backend database object for usage in debtBar
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
        //grabs the selected value from the select input
        this.selectValue = option.target.value
      },
      popUp() {
        this.active = true
      },
      closePopUp() {
        this.active = false
      },
      removeDebt() {
        this.active = false
        //fortsätt här, men fixa först modal p {{}} för att definiera skuld eller avbetalning
      }
    }
  }
</script>

<template>
  <h1>Avbetalning av skuld</h1>
  <ul>
    <li><h2>Skulder:</h2></li>
    <!-- en modal som täcker skärmen för att låta användaren bekräfta borttagning av skuld eller avbetalning -->
    <div :class="{ modal: true, active: active }">
      <div class="modalHeader">
        <p class="titleText">Varning:</p>
        <button @click="closePopUp">&times;</button>
      </div>
      <p>Är du säker att du vill ta bort din {{}}?</p>
      <div class="modalButtons">
        <input type="button" value="Ja" @click="removeDebt" />
        <input type="button" value="Nej" @click="closePopUp" />
      </div>
    </div>
    <div :class="{ overlay: true, active: active }" @click="closePopUp" />
    <li v-if="this.debts.length === 0">
      <p class="titleText">Du har inga skulder</p>
    </li>
    <li v-else :key="entry" v-for="entry in this.debts">
      <p class="titleText">
        <span class="title">{{ entry.title }}</span>
      </p>
      <p class="smallText">Initial skuld: {{ entry.amount }}</p>
      <p class="smallText" v-if="entry.payOffDebt">
        Resterande skuld: {{ entry.amount - entry.payOffDebt }}
      </p>
      <div class="barContainer" :style="{ display: toggle }">
        <div
          class="debtBar"
          :style="{ width: debtBar(entry.amount, entry.payOffDebt) }"
        />
      </div>
      <div class="flexer">
        <p v-if="entry.payOffDebt">
          Avbetalning varje månad: {{ entry.payOffDebt }}
        </p>
        <div class="listButtons">
          <input
            type="button"
            data-modal-target=".modal"
            class="button buttonDebt"
            @click="popUp"
            value="Ta bort skuld"
          />
          <input
            type="button"
            data-modal-target=".modal"
            class="button buttonPayment"
            @click="popUp"
            value="Ta bort avbetalning"
          />
        </div>
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
  .title {
    font-size: 115%;
  }
  .titleText {
    font-weight: bold;
    letter-spacing: 0.1rem;
    line-height: 1.5;
  }
  .smallText {
    line-height: 0.7;
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
    background-color: #c4c4c4;
    height: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .debtBar {
    background-color: #212121;
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }
  .flexer {
    display: flex;
    justify-content: space-between;
  }
  .listButtons {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-right: 15px;
  }
  .button {
    width: 135px !important;
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
    cursor: pointer;
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
  /* styling modal window */
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: 200ms ease-in-out;
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
    z-index: 10;
    background-color: #fff;
    width: 350px;
    max-width: 50%;
  }
  .modalHeader {
    display: flex;
    justify-content: space-between;
    margin-top: -20px;
  }
  .modalHeader button {
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
    font-weight: bold;
    font-size: 200%;
  }
  .overlay {
    position: fixed;
    transition: 200ms ease-in-out;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    pointer-events: none;
  }
  .overlay.active {
    opacity: 1;
    pointer-events: all;
  }
  .modal.active {
    transform: translate(-50%, -50%) scale(1);
  }
  .modalButtons {
    display: flex;
    justify-content: space-around;
  }
</style>
