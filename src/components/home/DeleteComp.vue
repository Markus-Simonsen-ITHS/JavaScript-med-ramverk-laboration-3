<script>
  import { doc, deleteDoc } from 'firebase/firestore'
  import { db } from '../../firebase'
  export default {
    // data() {
    //   return {
    //     collection: this.test
    //   }
    // },
    props: {
      collectionItem: {
        required: true,
        type: String
      },
      collection: {
        required: true,
        type: String
      }
    },
    methods: {
      async removeBudget(collection, collectionItem) {
        await deleteDoc(doc(db, collection, collectionItem))
        alert()
      }
    }
  }
</script>

<template>
  <div id="close-button" @click="removeBudget(collection, collectionItem)">
    <div class="close-button">
      <div class="close-button-r" />
    </div>
  </div>
</template>

<style scoped>
  .close-button {
    height: 25px;
    width: 2px;
    margin-left: 12px;
    background-color: black;
    transform: rotate(45deg);
    margin: 0 16px 0 0;
  }

  .close-button-r {
    height: 25px;
    width: 2px;
    background-color: black;
    transform: rotate(90deg);
  }

  #close-button {
    grid-column: 4;
    grid-row-start: 1;
    grid-row-end: 2;
    border-radius: 10px;
    align-self: end;
    justify-self: end;
  }
</style>
