<script>
  import { collection, addDoc } from 'firebase/firestore'

  import { db } from '../firebase'

  import AddForm from '../components/add/AddForm.vue'

  import NavBar from '../components/NavBar.vue'

  export default {
    methods: {
      // Adds expense to db, triggered from AddForm-component
      addExpense(payload) {
        const docData = {
          id: payload.id,
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
          id: payload.id,
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
    components: {
      AddForm,
      NavBar
    }
  }
</script>

<template>
  <NavBar />
  <div class="addview-body">
    <p class="add-paragraph">Lägg Till</p>
    <AddForm @add-expense="addExpense" @add-income="addIncome" />
  </div>
</template>

<style scoped>
  .addview-body {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  .add-paragraph {
    font-size: 20px;
    font-weight: bold;
    padding: 0;
  }

  @media screen and (min-width: 700px) {
    .add-paragraph {
      align-self: center;
    }
  }
</style>
