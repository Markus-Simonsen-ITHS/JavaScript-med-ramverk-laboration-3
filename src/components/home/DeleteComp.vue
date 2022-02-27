<script>
  import { doc, deleteDoc } from 'firebase/firestore'
  import { db } from '../../firebase'
  export default {
    data() {
      return {
        collection: 'utgift'
      }
    },
    props: {
      test: {
        required: true,
        type: String
      }
    },
    methods: {
      async removeBudget(test) {
        console.log(test)
        await deleteDoc(doc(db, this.collection, test))
        alert()
      }
    }
  }
</script>

<template>
  <button class="remove-btn" @click="removeBudget(test)">Ta bort</button>
</template>

<style scoped></style>
