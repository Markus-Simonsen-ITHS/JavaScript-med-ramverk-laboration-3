<script>
  import { doc, deleteDoc } from 'firebase/firestore'
  import { db } from '../../firebase'
  export default {
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
        this.$store.dispatch('fetchFlow', this.$store.state.user.id)
      }
    }
  }
</script>

<template>
  <div id="close-button" @click="removeBudget(collection, collectionItem)">
    <div
      class="close-button"
      :class="{
        light: $store.getters.getTheme === 'light',
        dark: $store.getters.getTheme === 'dark'
      }"
    >
      <div
        class="close-button-r"
        :class="{
          light: $store.getters.getTheme === 'light',
          dark: $store.getters.getTheme === 'dark'
        }"
      />
    </div>
  </div>
</template>

<style scoped>
  .close-button {
    height: 25px;
    width: 2px;
    margin-left: 12px;
    transform: rotate(45deg);
    margin: 0 16px 0 0;
  }

  .close-button-r {
    height: 25px;
    width: 2px;
    transform: rotate(90deg);
  }

  .light {
    background-color: #202225;
  }

  .dark {
    background-color: #e5e5e5;
  }
</style>
