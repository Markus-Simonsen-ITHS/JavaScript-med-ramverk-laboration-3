<script>
  import CreateExpense from '../components/CreateExpense.vue'
  import CreateIncome from '../components/CreateIncome.vue'
  export default { components: { CreateExpense, CreateIncome } }
</script>

<template>
  <div>
    <p>Matkonto</p>
    <p>2500kr</p>
    <p>----------</p>
    <span>Budget: 4000 kr</span>
  </div>
  <div>
    <p>Intäkter</p>
    <p>+5000</p>
    <CreateIncome />
    <!-- flytta och placera komponenten vart den hör hemma när sidan är organiserad -->
  </div>
  <div>
    <p>Utgifter</p>
    <p>-1500</p>
  </div>
  <div>
    <h1>Pengar kvar</h1>
    <router-link to="/history">Historik</router-link>
  </div>
  <ul class="category-list">
    <li class="expense-category">
      <div class="category-img">
        <img src="../../assets/fox.jpeg" alt="Fox" />
      </div>
      <p>Mat</p>
      <p>500 kr</p>
      <p>Budget</p>
      <p>2000 kr</p>
    </li>
    <li class="expense-category">
      <CreateExpense />
    </li>
  </ul>
</template>

<style>
  .category-list {
    padding: 0;
    display: grid;
  }
  .expense-category {
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .category-img {
    grid-row: span 2;
  }
  img {
    width: 100%;
  }
</style>
