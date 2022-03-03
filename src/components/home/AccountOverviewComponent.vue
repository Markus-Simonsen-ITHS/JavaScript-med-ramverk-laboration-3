<script>
  export default {
    props: {
      budget: {
        type: Object,
        required: true
      },
      expenseProgress: {
        type: Number,
        required: true
      }
    }
  }
</script>

<template>
  <div
    class="account-overview-container"
    :class="{
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
  >
    <div class="bar-container">
      <p class="account-overview-name">
        {{ budget ? budget.title : 'Laddar' }}
      </p>
      <p class="account-amount-spent">
        {{ budget.amountSpent ? budget.amountSpent : 0 }} kr
      </p>
      <div class="account-progress-container">
        <div
          class="account-progress-bar"
          :style="{
            width: expenseProgress + '%',
            maxWidth: 100 + '%'
          }"
        />
      </div>
      <p class="account-budget">
        Budget: {{ budget.amount ? budget.amount : 0 }} kr
      </p>
    </div>
  </div>
</template>

<style scoped>
  .account-overview-container {
    padding: 10px;
  }

  .account-overview-name {
    font-size: 1rem;
    margin: 0;
  }
  .account-amount-spent {
    margin: 0;
    font-weight: bold;
    letter-spacing: 0.1rem;
  }
  .account-progress-container {
    margin-top: 10px;
    background-color: #c4c4c4;
    height: 15px;
    border-radius: 10px;
  }
  .account-progress-bar {
    background-color: #5969ea;
    border-radius: 10px;
    height: 100%;
    width: 70%;
  }
  .account-budget {
    text-align: end;
    font-size: 1rem;
  }
  @media screen and (min-width: 700px) {
    .bar-container {
      width: 500px;
    }
    .account-overview-container {
      justify-content: center;
      grid-template-columns: none;
    }
  }
</style>
