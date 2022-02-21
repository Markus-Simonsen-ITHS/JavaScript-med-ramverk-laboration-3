<script>
  import AutoImage from '../AutoImage.vue'
  export default {
    props: {
      budget: {
        required: true,
        type: Object
      }
    },
    components: { AutoImage }
  }
</script>

<template>
  <li class="expense-category">
    <div class="category-img-container">
      <!-- Placeholder img -->
      <!-- <img src="../../../assets/fox.jpeg" alt="Fox" /> -->
      <AutoImage :category-name="budget.title ? budget.title : 'Övrigt'" />
    </div>
    <p class="bold-text align-start">
      {{ budget.title ? budget.title : 'Övrigt' }}
    </p>
    <p class="bold-text">
      {{ budget.amountSpent ? budget.amountSpent : 0 }} kr
    </p>
    <p class="smaller-text align-start">Budget</p>
    <p class="smaller-text">{{ budget.sum }} kr</p>
  </li>
</template>

<style scoped>
  .expense-category {
    border-radius: 5px;
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
    justify-self: flex-start;
  }
  .smaller-text {
    font-size: 1rem;
  }
  .bold-text {
    font-weight: bold;
  }

  @media screen and (min-width: 700px) {
    .expense-category {
      grid-template-columns: 0.5fr 1fr 1fr;
    }
    .category-img-container {
      height: 100px;
      justify-self: start;
    }
  }
</style>
