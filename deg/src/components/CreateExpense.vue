<script>
  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'

  export default {
    data() {
      return {
        expenseTitle: null,
        expenseAmount: null,
        checkbox: false
      }
    },
    methods: {
      submitExpense() {
        const docData = {
          email: this.$store.state.user.email,
          title: this.expenseTitle,
          amount: Number(this.expenseAmount)
        }
        if (this.checkbox === true) {
          addDoc(collection(db, 'återkommandeUtgift'), docData)
        } else {
          addDoc(collection(db, 'utgift'), docData)
        }
        this.expenseTitle = ''
        this.expenseAmount = ''
        this.checkbox = 'false'
      }
    }
  }
</script>
<template>
  <input v-model="expenseTitle" placeholder="ange titel på utgiften" />
  <input v-model="expenseAmount" placeholder="ange utgift" />
  <label for="reocurringExpense">återkommande utgift?</label>
  <input
    name="reocurringExpense"
    type="checkbox"
    value="reocurringExpense"
    v-model="checkbox"
  />
  <input
    type="button"
    value="submit"
    @click="submitExpense"
    @keyup.enter="submitExpense"
  />
</template>
