<script>
  import DeleteComp from '../components/home/DeleteComp.vue'

  export default {
    components: {
      DeleteComp
    },
    data() {
      return {
        toggle: false
      }
    },
    computed: {
      budgets() {
        return this.$store.getters.getBudget
      },
      expenses() {
        return this.$store.getters.getExpenses
      }
    }
  }
</script>

<template>
  <div class="expenses">
    <h2 class="chosenView">Lista</h2>
  </div>

  <div id="history-list-container">
    <div
      class="history-list"
      @click="toggle = !toggle"
      v-for="budget in budgets"
      :key="budget"
    >
<<<<<<< HEAD
      <img src="../../assets/fox.jpeg" alt="deg logo" />
      <p class="budget-title">{{ budget.title }}</p>
      <p class="budget-sum">budget:</p>
      <p class="budget-sum-self">{{ budget.sum }} kr</p>

      <div v-for="expense in expenses" :key="expense">
        <DeleteComp
          :collection-item="expense.expenseId"
          :collection="'utgift'"
        />
        <p class="expense-title" v-show="toggle">
          {{ expense.title }}
        </p>
=======
      <div v-for="item in budget.items" :key="item">
        <img src="../../assets/fox.jpeg" alt="deg logo" />
        <p class="expense-category">
          {{ expense.category }}
        </p>
        <p class="budget-title">
          {{ budget.title }}
        </p>
        <p class="budget-sum">{{ budget.sum }} kr</p>
      </div>
      <div v-for="expense in expenses" :key="expense">
        <p class="expense-title" v-show="toggle">{{ expense.title }}</p>
>>>>>>> d095c91 (working on one-card display for each category)
        <p class="expense-amount" v-show="toggle">{{ expense.amount }} kr</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .chosenView {
    font-size: 1.5rem;
    margin-left: 20px;
    font-weight: lighter;
  }

  #history-list-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 547px;
<<<<<<< HEAD
  }

  .history-list {
    display: flex;
    flex-direction: column;
    text-transform: capitalize;
    line-height: 0.5;
    letter-spacing: 0.5px;
    cursor: pointer;
    margin: 30px;
    padding: 10px;
    border-radius: 8px;
    background-color: #e7e7e7;
    cursor: pointer;
    margin: 30px;
    padding: 10px;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
=======
  }

  .history-list {
    flex-direction: column;
    list-style: none;
    cursor: pointer;
    margin: 30px;
    padding: 10px;
    border-radius: 8px;
    background-color: #e7e7e7;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  .history-list,
  p {
    display: flex;
    line-height: 0.5;
    letter-spacing: 0.5px;
    font-size: 1rem;
    text-transform: capitalize;
  }

  img {
    width: 56px;
    height: 56px;
    left: 44px;
    top: 160px;
    border-radius: 8px;
  }

  .expense-category {
    padding: 0 1em 0 0;
    font-weight: bold;
    font-size: 1.4em;
    margin-top: -30px;
    margin-left: 65px;
  }

  .budget-sum {
    align-self: flex-end;
    margin-top: -24px;
    margin-left: 65px;
  }

  .expense-title {
    padding: 1rem 0 1em 0;
    border-top: 1px solid black;
  }

  .expense-amount {
    align-self: flex-end;
    margin-top: -40px;
    margin-left: 65px;
  }

  @media screen and (max-width: 500px) {
    .history-list {
      margin: 10px;
      padding: 15px;
      min-width: 200px;
    }

    img {
      width: 45px;
      height: 45px;
    }

    .expense-category {
      padding: 0 1em 0 0;
      font-weight: bold;
      font-size: 1.2em;
      margin-top: -30px;
      margin-left: 55px;
    }
>>>>>>> d095c91 (working on one-card display for each category)
  }

  img {
    display: flex;
    width: 56px;
    height: 56px;
    left: 44px;
    top: 160px;
    border-radius: 8px;
  }

  .budget-title {
    margin: -30px 0 20px 65px;
    letter-spacing: 0.5px;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .budget-sum {
    letter-spacing: 0.5px;
    font-size: 1rem;
    font-weight: bold;
  }
  .budget-sum-self {
    letter-spacing: 0.5px;
    font-size: 1rem;
    font-weight: bold;
    align-self: flex-end;
    margin: -23px 0 10px 0;
    text-transform: lowercase;
  }

  .expense-title {
    letter-spacing: 0.5px;
    font-size: 1rem;
    padding: 1rem 0 0 0;
    border-top: 1px solid black;
  }

  .expense-amount {
    float: right;
    letter-spacing: 0.5px;
    font-size: 1rem;
    align-self: flex-end;
    margin: -23px 0 0 0;
    text-transform: lowercase;
  }

  @media screen and (max-width: 500px) {
    .history-list {
      margin: 10px;
      padding: 15px;
      min-width: 200px;
    }

    img {
      width: 45px;
      height: 45px;
    }
  }
</style>
