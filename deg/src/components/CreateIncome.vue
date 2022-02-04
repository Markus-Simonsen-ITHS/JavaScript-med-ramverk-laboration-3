<script>
  import { db } from '../firebase'
  import { collection, addDoc } from 'firebase/firestore'

  export default {
    data() {
      return {
        incomeTitle: null,
        incomeAmount: null
      }
    },
    methods: {
      submitIncome() {
        const docData = {
          title: this.incomeTitle,
          amount: this.incomeAmount
        }
        addDoc(collection(db, 'inkomst'), docData)
        console.log(docData)
        this.incomeTitle = ''
        this.incomeAmount = ''
      }
    }
  }
</script>
<template>
  <input v-model="incomeTitle" placeholder="ange titel" />
  <input v-model="incomeAmount" placeholder="ange inkomst" />
  <input type="button" value="submit" @click="submitIncome" />
</template>
