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
        return this.$store.getters.getFilteredBudgets
      },
      expenses() {
        return this.$store.getters.getExpenses
      },
      filteredExpenses() {
        return this.$store.getters.getFilteredExpenses
      }
    }
  }
</script>

<template>
  <div class="container">
    <div id="history-list-container">
      <!-- {{ filteredExpenses }} -->
      <div
        class="history-list"
        :class="{
          'dark-form': $store.getters.getTheme === 'dark',
          'light-form': $store.getters.getTheme === 'light'
        }"
        @click="toggle = !toggle"
        v-for="budget in budgets"
        :key="budget.budgetId"
      >
        <img src="../../assets/fox.jpeg" alt="deg logo" />
        <p class="budget-title">{{ budget.title }}</p>
        <p class="budget-sum">budget:</p>
        <p class="budget-sum-self">{{ budget.amount }} kr</p>

        <div class="test" v-for="expense in budget.expenses" :key="expense">
          <hr v-show="toggle" class="line" />
          <p class="expense-title" v-show="toggle">
            {{ expense.title }}
          </p>
          <p class="expense-amount" v-show="toggle">-{{ expense.amount }} kr</p>

          <DeleteComp
            class="delete-comp"
            v-show="toggle"
            :collection-item="expense.expenseId"
            :collection="expense.collection"
          />
        </div>
        <div
          class="test"
          v-for="income in budget.incomeList"
          :key="income"
          v-show="toggle"
        >
          <hr v-show="toggle" class="line" />
          <p class="expense-title">{{ income.title }}</p>
          <p class="income-amount">+{{ income.amount }} kr</p>
          <DeleteComp
            class="delete-comp"
            :collection-item="income.incomeId"
            :collection="'inkomst'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .line {
    border: 0.5px solid;
    grid-column-start: 1;
    grid-column-end: 6;
    width: 100%;
  }
  .test {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
  }
  .delete-comp {
    grid-column-start: 5;
    grid-row-start: 2;
  }
  .incomeList {
    padding: 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .chosenView {
    font-size: 1.5rem;
    margin-left: 20px;
    font-weight: lighter;
  }
  .container {
    display: flex;
    justify-content: center;
  }
  #history-list-container {
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    max-width: 547px;
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
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
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
    grid-column-start: 1;
  }

  .expense-amount,
  .income-amount {
    letter-spacing: 0.5px;
    font-size: 1rem;
    align-self: flex-end;
    text-transform: lowercase;
    grid-column-start: 4;
    grid-row-start: 2;
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
