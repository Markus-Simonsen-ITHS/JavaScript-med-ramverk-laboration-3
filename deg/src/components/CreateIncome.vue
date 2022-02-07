<script>
  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'

  export default {
    data() {
      return {
        incomeTitle: null,
        incomeAmount: null,
        checkbox: false
      }
    },
    methods: {
      submitIncome() {
        const docData = {
          email: this.$store.state.user.email,
          title: this.incomeTitle,
          amount: Number(this.incomeAmount)
        }
        if (this.checkbox === true) {
          addDoc(collection(db, 'återkommandeInkomst'), docData)
        } else {
          addDoc(collection(db, 'inkomst'), docData)
        }
        this.incomeTitle = ''
        this.incomeAmount = ''
        this.checkbox = 'false'
      }
    }
  }
</script>
<template>
  <input v-model="incomeTitle" placeholder="ange titel på inkomsten" />
  <input v-model="incomeAmount" placeholder="ange inkomst" />
  <label for="reocurringIncome">återkommande inkomst?</label>
  <input
    name="reocurringIncome"
    type="checkbox"
    value="reocurringIncome"
    v-model="checkbox"
  />
  <input
    type="button"
    value="submit"
    @click="submitIncome"
    @keyup.enter="submitIncome"
  />
</template>
