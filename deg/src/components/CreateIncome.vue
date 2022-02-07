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
          email: this.$store.state.user.email,
          title: this.incomeTitle,
          amount: Number(this.incomeAmount)
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
  <input v-model="incomeTitle" placeholder="ange titel på inkomsten" />
  <input v-model="incomeAmount" placeholder="ange inkomst" />
  <label for="reocurringIncome">återkommande inkomst?</label>
  <input name="reocurringIncome" type="checkbox" value="reocurringIncome" />
  <input
    type="button"
    value="submit"
    @click="submitIncome"
    @keyup.enter="submitIncome"
  />
</template>
