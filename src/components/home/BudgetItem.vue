<script>
  import { doc, deleteDoc } from 'firebase/firestore'
  import { db } from '../../firebase'
  import AutoImage from '../AutoImage.vue'
  export default {
    emits: ['setActiveBudget'],
    props: {
      budget: {
        required: true,
        type: Object
      },
      activeBudget: {
        type: Object,
        required: true
      }
    },
    methods: {
      async removeBudget(budget) {
        console.log(budget.title)
        await deleteDoc(doc(db, 'budget', budget.title))
      },
      setActiveBudget() {
        this.$emit('setActiveBudget', this.budget)
      }
    },
    computed: {
      active() {
        return this.budget.budgetId === this.activeBudget.budgetId
      }
    },
    components: { AutoImage }
  }
</script>

<template>
  <li
    class="expense-category"
    :class="{
      'active-dark': active && $store.getters.getTheme === 'dark',
      'active-light': active && $store.getters.getTheme === 'light',
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
    @click="setActiveBudget"
  >
    <div class="category-img-container">
      <AutoImage :category-name="budget.title ? budget.title : 'Övrigt'" />
    </div>
    <p class="bold-text align-start">
      {{ budget.title ? budget.title : 'Övrigt' }}
    </p>
    <p class="bold-text align-end">
      {{ budget.amountSpent ? budget.amountSpent : 0 }} kr
    </p>
    <p class="smaller-text align-start">Budget</p>
    <p class="smaller-text align-end">{{ budget.amount }} kr</p>
    <!-- <p class="remove-btn" @click="removeBudget(budget)">X</p> -->
    <div id="close-button" @click="removeBudget(budget)">
      <div class="close-button">
        <div class="close-button-r" />
      </div>
    </div>
  </li>
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
  .expense-category {
    border-radius: 5px;
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    background-color: #e7e7e7;
    align-content: center;
    justify-items: center;
  }
  .category-img-container {
    grid-row: span 2;
    padding: 10px;
  }
  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
  .expense-category p {
    margin: 10px;
  }
  .align-start {
    justify-self: start;
    grid-column: 2;
  }
  .align-end {
    justify-self: end;
  }
  .smaller-text {
    font-size: 1rem;
    padding-bottom: 20px;
  }
  .bold-text {
    font-weight: bold;
    padding-top: 16px;
  }

  #close-button {
    grid-column: 4;
    grid-row-start: 1;
    grid-row-end: 2;
    border-radius: 10px;
    padding: 16px;
    align-self: center;
    justify-self: end;
  }

  .dark {
    background-color: #2f3136;
  }
  .light {
    background-color: #e5e5e5;
  }

  .active-dark {
    color: white;
    background-color: #354157;
  }

  .active-light {
    background-color: #5969ea;
    color: white;
    box-shadow: 1px 1px 1px 1px #add8e6;
  }

  @media screen and (min-width: 700px) {
    .expense-category {
      grid-template-columns: 1fr 1fr 1fr 1frr;
    }
    .category-img-container {
      height: 100px;
      justify-self: start;
    }
  }
</style>
