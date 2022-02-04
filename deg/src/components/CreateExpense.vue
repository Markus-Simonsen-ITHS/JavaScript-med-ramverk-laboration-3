<script>
  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'

  export default {
    data() {
      return {
        expenseTitle: null,
        expenseAmount: null
      }
    },
    methods: {
      submitExpense() {
        const docData = {
          title: this.expenseTitle,
          amount: this.expenseAmount
        }
        addDoc(collection(db, 'utgift'), docData)
        console.log(docData)
        this.expenseTitle = ''
        this.expenseAmount = ''
      }
    }
  }
</script>
<template>
  <input v-model="expenseTitle" placeholder="ange titel" />
  <input v-model="expenseAmount" placeholder="ange utgift" />
  <input type="button" value="submit" @click="submitExpense" />
</template>
