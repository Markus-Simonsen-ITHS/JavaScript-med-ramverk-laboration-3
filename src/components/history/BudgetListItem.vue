<script>
  import DeleteComp from '../home/DeleteComp.vue'
  import AutoImage from '../AutoImage.vue'

  export default {
    props: {
      budget: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        toggle: false
      }
    },
    methods: {
      toggleExpanded(ev) {
        if (ev.target.id === 'close-button') return
        this.toggle = !this.toggle
      }
    },
    components: {
      DeleteComp,
      AutoImage
    }
  }
</script>

<template>
  <div
    class="history-list"
    :class="{
      'dark-form': $store.getters.getTheme === 'dark',
      'light-form': $store.getters.getTheme === 'light'
    }"
    @click="toggleExpanded"
  >
    <div class="image-container">
      <AutoImage :category-name="budget.title" />
    </div>
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
</template>

<style scoped>
  .line {
    border: 0.5px solid;
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row: 1;
    width: 100%;
  }
  .test {
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    grid-template-rows: 1fr;
    align-items: center;
    justify-content: center;
  }
  .delete-comp {
    grid-column-start: 5;
    grid-row: 2;
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

  .image-container {
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
    grid-row: 2;
  }

  .expense-amount,
  .income-amount {
    letter-spacing: 0.5px;
    font-size: 1rem;
    align-self: flex-end;
    text-transform: lowercase;
    grid-column-start: 1;
    grid-row: 2;
    justify-self: end;
  }

  .income-amount {
    background-color: lightseagreen;
    padding: 8px;
    border-radius: 8px;
    width: fit-content;
  }

  .expense-amount {
    background-color: lightcoral;
    padding: 8px;
    border-radius: 8px;
    width: fit-content;
  }

  @media screen and (max-width: 500px) {
    .history-list {
      margin: 10px;
      padding: 15px;
      min-width: 200px;
    }
  }
</style>
