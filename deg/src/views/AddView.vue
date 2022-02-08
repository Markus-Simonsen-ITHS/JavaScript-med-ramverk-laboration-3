<script>
  import { collection, addDoc } from 'firebase/firestore'

  import { db } from '../firebase'

  import AddForm from '../components/add/AddForm.vue'

  export default {
    data() {
      return {
        displayAddExpense: true,
        inputAmount: '0',
        addType: 'expense'
      }
    },
    methods: {
      // Shows CreateExpense-component
      setDisplayAddExpense() {
        this.displayAddExpense = true
        this.addType = 'expense'
      },
      // Shows CreateIncome-component
      setDisplayAddIncome() {
        this.displayAddExpense = false
        this.addType = 'income'
      },
      // Adds expense to db, triggered from AddForm-component
      addExpense(payload) {
        const docData = {
          email: payload.email,
          title: payload.title,
          amount: payload.amount,
          category: payload.category,
          date: payload.date
        }
        if (payload.reocurringExpense === true) {
          addDoc(collection(db, 'återkommandeUtgift'), docData)
        } else {
          addDoc(collection(db, 'utgift'), docData)
        }
      },
      // Adds income to db, triggered from AddForm-component
      addIncome(payload) {
        const docData = {
          email: payload.email,
          title: payload.title,
          amount: payload.amount,
          category: payload.category,
          date: payload.date
        }
        if (payload.reocurringExpense === true) {
          addDoc(collection(db, 'återkommandeInkomst'), docData)
        } else {
          addDoc(collection(db, 'inkomst'), docData)
        }
      }
    },
    computed: {
      // Calculates the desired width of the amount input based on number of characters. One number is around 27px wide
      inputWidth() {
        const chars = this.inputAmount.toString().length
        let number = 0
        for (let i = 0; i < chars; i++) {
          number += 27
        }
        return number + 'px'
      }
    },
    components: {
      AddForm
    }
  }
</script>

<template>
  <div class="addview-body">
    <p class="add-paragraph">Lägg Till</p>
    <div class="input-container">
      <input
        id="amount-input"
        type="text"
        :style="{ width: inputWidth }"
        v-model="inputAmount"
      />
      <label for="amount-input">kr</label>
    </div>
    <div class="buttons-container">
      <button
        @click="setDisplayAddExpense"
        :class="{ active: displayAddExpense }"
      >
        Utgift
      </button>
      <button
        @click="setDisplayAddIncome"
        :class="{ active: !displayAddExpense }"
      >
        Intäkt
      </button>
    </div>
    <AddForm
      :add-type="addType"
      :amount="parseInt(inputAmount)"
      @add-expense="addExpense"
      @add-income="addIncome"
    />
  </div>
</template>

<style scoped>
  .addview-body {
    display: flex;
    flex-direction: column;
  }
  .add-paragraph {
    font-size: 20px;
    font-weight: bold;
    padding: 0 0 0 0;
  }

  .input-container {
    margin-bottom: 10px;
  }

  input,
  label {
    border: none;
    font-size: 48px;
    font-weight: normal;
  }

  .buttons-container {
    margin-bottom: 20px;
  }

  button {
    border-radius: 100px;
    font-size: 16px;
    padding: 10px 16px;
    border: none;
    margin: 0 16px 0 0;
  }

  .active {
    background-color: #292929;
    color: #ffffff;
  }
</style>
