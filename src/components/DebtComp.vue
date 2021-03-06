<script>
  import {
    collection,
    doc,
    addDoc,
    getDocs,
    deleteDoc,
    where,
    query,
    updateDoc,
    deleteField
  } from 'firebase/firestore'
  import { db } from '../firebase'

  export default {
    data() {
      return {
        title: null,
        bool: true,
        amount: null,
        date: null,
        interest: null,
        payOffDebt: null,
        selectedValue: null,
        // ^ value from select menu
        toggle: 'block',
        // ^ hides debt progress bar if no debts
        active: false,
        modalWord: null,
        debts: [],
        // ^ main debt array, filled with the debt objects
        indexRef: null,
        // ^ used to find which debt is in which position in the list element
        paymentRefArray: []
        // ^ used to find payment to delete
      }
    },
    created() {
      this.fetchDebtData()
      this.fetchPaymentData()
    },
    methods: {
      async fetchDebtData() {
        const q = query(
          collection(db, 'skuld'),
          where('id', '==', this.$store.state.user.id)
        )
        const allDebts = await getDocs(q)
        allDebts.forEach((doc) => {
          // ^ fetches debt data of current user and adds to debts array
          let docData = {
            id: doc.id,
            // ^ fetches debt data back-end ID's
            amount: doc.data().amount,
            title: doc.data().title,
            payOffDebtId: null,
            payOffDebt: doc.data().payOffDebt
          }
          if (this.debts.some((inArray) => inArray.id === doc.id)) {
            // ^ automatically updates list when new data
            let position = this.debts.findIndex((inArray) => {
              return inArray.id === doc.id
            })
            this.debts.splice(position, 1, docData)
          } else {
            this.debts.push(docData)
          }
        })
        this.bool = false
      },
      async fetchPaymentData() {
        // ^ fetches debt payment data back-end ID's
        const qq = query(
          collection(db, 'återkommandeUtgift'),
          where('id', '==', this.$store.state.user.id),
          where('category', '==', 'skuldavbetalning')
        )
        const all = await getDocs(qq)
        all.forEach((doc) => {
          this.paymentRefArray.push({
            title: doc.data().title,
            id: doc.id
          })
        })
      },
      async submitDebt() {
        // ^ submits debt data and clear fields
        const docData = {
          id: this.$store.state.user.id,
          title: this.title,
          amount: Number(this.amount),
          date: this.date
        }
        addDoc(collection(db, 'skuld'), docData)
        this.clearFieldsDebt()
        await this.fetchDebtData()
      },
      async submitPayOffDebt() {
        // ^ submits debt payment and clear fields
        const docData = {
          id: this.$store.state.user.id,
          title: this.selectedValue,
          amount: Number(this.payOffDebt),
          category: 'skuldavbetalning'
        }
        await addDoc(collection(db, 'återkommandeUtgift'), docData)
        for (let n = 0; n < this.debts.length; n++) {
          if (this.debts[n].title === this.selectedValue) {
            // ^ compares to the selected value from the select input
            const docRef = doc(db, 'skuld', this.debts[n].id)
            updateDoc(docRef, {
              // ^ adds payOffDebt in corresponding backend database object for usage in debtBar
              payOffDebt: Number(this.payOffDebt)
            })
          }
        }
        this.clearFieldsPayOffDebt()
        if (this.paymentRefArray.some((e) => e.title === this.selectedValue)) {
          // ^ deletes old payment if a new one is issued on the same debt
          let deleteThis = this.paymentRefArray.filter(
            (e) => e.title === this.selectedValue
          )
          deleteThis.forEach((e) =>
            deleteDoc(doc(db, 'återkommandeUtgift', e.id))
          )
        }
        await this.fetchPaymentData()
        await this.fetchDebtData()
      },
      debtBar(max, pay) {
        let progress = (100 * pay) / max
        if (progress > 100) progress = 100
        // ^ baren blir tom ifall kvarstående avbetalning går under 0
        progress = 100 - progress
        // ^ debt bar now gets smaller the more of the debt you pay off
        return progress + '%'
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
        // ^ grabs the selected value from the select input
        this.selectedValue = option.target.value
      },
      popUp() {
        this.active = true
      },
      closePopUp() {
        this.active = false
      },
      buttonValue(event, index) {
        this.indexRef = Number(index)
        // ^ passes along the value used for finding what to delete in removeData()
        if (event.target.value === 'Ta bort avbetalning') {
          this.modalWord = 'avbetalning'
        } else this.modalWord = 'skuld'
        this.popUp()
      },
      async removeData() {
        this.active = false
        for (let n = 0; n < this.debts.length; n++) {
          for (let m = 0; m < this.paymentRefArray.length; m++) {
            if (this.paymentRefArray[m].title === this.debts[n].title) {
              this.debts[n].payOffDebtId = this.paymentRefArray[m].id
              // ^ finds the id of the payment of the debt and connects it to its debt through the key payOffDebtId, this key is then used to delete the payment (payment only, not the debt),
            }
          }
        }
        if (this.modalWord === 'skuld') {
          if (this.debts[this.indexRef].payOffDebt) {
            await deleteDoc(
              doc(
                db,
                'återkommandeUtgift',
                this.debts[this.indexRef].payOffDebtId
              )
            )
            this.debts[this.indexRef].payOffDebt = null
            // ^ removes the deleted entry from being rendered in the list
          }
          await deleteDoc(doc(db, 'skuld', this.debts[this.indexRef].id))
          this.debts.splice(this.indexRef, 1)
          // ^ removes the deleted entry from being rendered in the list
        } else {
          await deleteDoc(
            doc(
              db,
              'återkommandeUtgift',
              this.debts[this.indexRef].payOffDebtId
            )
          )
          this.debts[this.indexRef].payOffDebt = null
          // ^ removes the deleted entry from being rendered in the list
          updateDoc(doc(db, 'skuld', this.debts[this.indexRef].id), {
            payOffDebt: deleteField()
          })
        }
      }
    }
  }
</script>

<template>
  <h1>Avbetalning av skuld</h1>
  <div
    :class="{
      modal: true,
      active: active,
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
  >
    <!-- ^ a modal which covers the screen to allow the user confirm removal of debt or payment of debt -->
    <div class="modalHeader">
      <p class="titleText">Varning:</p>
      <button
        :class="{
          light: $store.getters.getTheme === 'light',
          dark: $store.getters.getTheme === 'dark'
        }"
        @click="closePopUp"
      >
        &times;
      </button>
    </div>
    <p class="modalText">
      Är du säker att du vill ta bort din {{ modalWord }}?
    </p>
    <div class="modalButtons">
      <input class="modalButton" type="button" value="Ja" @click="removeData" />
      <input
        class="modalButton"
        type="button"
        value="Nej"
        @click="closePopUp"
      />
    </div>
  </div>
  <div :class="{ overlay: true, active: active }" @click="closePopUp" />
  <ul>
    <li><h2>Skulder:</h2></li>
    <li v-if="bool">
      <p class="titleText">Laddar...</p>
    </li>
    <li v-if="bool === false && this.debts.length === 0">
      <p class="titleText">Du har inga skulder</p>
    </li>
    <li v-else :key="entry.title" v-for="(entry, index) in this.debts">
      <p class="titleText">
        <span class="title">{{ entry.title }}</span>
      </p>
      <p class="smallText">
        Initial skuld:
        {{ Intl.NumberFormat('de-DE').format(entry.amount) }}
      </p>
      <p class="smallText" v-if="entry.payOffDebt">
        Resterande skuld:
        {{ Intl.NumberFormat('de-DE').format(entry.amount - entry.payOffDebt) }}
      </p>
      <div class="barContainer" :style="{ display: toggle }">
        <div
          class="debtBar"
          :style="{ width: debtBar(entry.amount, entry.payOffDebt) }"
        />
      </div>
      <div class="flexer">
        <p class="smallText" v-if="entry.payOffDebt">
          Avbetalning varje månad:
          {{ Intl.NumberFormat('de-DE').format(entry.payOffDebt) }}
        </p>
        <div class="listButtons">
          <input
            type="button"
            data-modal-target=".modal"
            class="button buttonDebt"
            @click="buttonValue($event, index)"
            value="Ta bort skuld"
          />
          <input
            v-if="entry.payOffDebt"
            type="button"
            data-modal-target=".modal"
            class="button buttonPayment"
            @click="buttonValue($event, index)"
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
      <!-- <input type="text" v-model="interest" placeholder="Ränta " /> -->
      <input type="date" v-model="date" placeholder="Datum" />
      <div class="button-container">
        <input
          type="submit"
          value="Lägg till"
          @click="submitDebt"
          @keyup.enter="submitDebt"
        />
        <input type="button" value="Rensa fälten" @click="clearFieldsDebt" />
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
      <p class="note">
        Notera: avbetalningen listas som en återkommande utgift
      </p>
      <div class="button-container">
        <input
          type="submit"
          value="Lägg till"
          @click="submitPayOffDebt"
          @keyup.enter="submitPayOffDebt"
        />
        <input
          type="button"
          value="Rensa fälten"
          @click="clearFieldsPayOffDebt"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
  h1 {
    margin: 0 0 60px 0;
    padding-top: 16px;
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
    max-width: 1200px;
  }
  .barContainer {
    background-color: #c4c4c4;
    height: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .debtBar {
    background-color: #5969ea;
    border-radius: 10px;
    height: 100%;
    width: 100%;
  }
  .flexer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .flexer p {
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .listButtons {
    display: flex;
    gap: 20px;
    margin-right: 15px;
    margin-bottom: 10px;
  }
  .button {
    width: 135px !important;
  }
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 8px;
    width: 70%;
    max-width: 630px;
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
    background-color: #5969ea;
    color: #e5e5e5;
    height: 40px;
    border-radius: 100px;
    width: 100px;
    cursor: pointer;
    border: none;
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
  /* styling for modal window below */
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

  @media screen and (max-width: 900px) {
    .flexer {
      flex-direction: column;
      margin-bottom: 20px;
    }
    .smallText {
      font-size: 120%;
      line-height: 1.1;
    }
    .titleText {
      font-size: 110%;
    }
    .listButtons {
      margin-top: 15px;
    }
    .modalButton {
      width: 70px !important;
    }

    .modalText {
      font-size: 120%;
    }
  }
</style>
