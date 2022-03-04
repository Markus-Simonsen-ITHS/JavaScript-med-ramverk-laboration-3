<script>
  import BudgetListItem from '../components/history/BudgetListItem.vue'

  export default {
    components: {
      BudgetListItem
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
      <BudgetListItem
        v-for="budget in budgets"
        :key="budget.budgetId"
        :budget="budget"
      />
    </div>
  </div>
</template>

<style scoped>
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
</style>
