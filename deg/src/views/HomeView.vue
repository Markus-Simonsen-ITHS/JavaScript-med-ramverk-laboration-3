<script>
  export default {
    computed: {
      // Calculates percentage of the budget, used in progress-bar as width
      calculateExpenseProgress() {
        const budget = 4000
        const spent = 1000
        const progress = (100 * spent) / budget
        return progress + '%'
      }
    }
  }
</script>

<template>
  <div class="account-overview-container">
    <p class="account-overview-name">Matkonto</p>
    <p class="account-amount-spent">2500 kr</p>
    <div class="account-progress-container">
      <div
        class="account-progress-bar"
        :style="{ width: calculateExpenseProgress }"
      />
    </div>
    <p class="account-budget">Budget: 4000 kr</p>
  </div>
  <div class="status-container">
    <div class="status-card">
      <p>Intäkter</p>
      <p class="bold-text">+5000</p>
    </div>
    <div class="status-card">
      <p>Utgifter</p>
      <p class="bold-text">-1500</p>
    </div>
  </div>
  <div class="overview-container">
    <h1>Översikt</h1>
    <router-link to="/history">Historik</router-link>
  </div>
  <ul class="category-list">
    <!-- Create a component for thi li -->
    <li class="expense-category">
      <div class="category-img-container">
        <!-- Placeholder img -->
        <img src="../../assets/fox.jpeg" alt="Fox" />
      </div>
      <p class="bold-text">Mat</p>
      <p class="bold-text">500 kr</p>
      <p class="smaller-text">Budget</p>
      <p class="smaller-text">2000 kr</p>
    </li>
    <li class="add-category-container">
      <div class="add-category-button" />
      <p>Lägg till</p>
    </li>
  </ul>
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
    background-color: #212121;
    border-radius: 10px;
    height: 100%;
    width: 70%;
  }
  .account-budget {
    text-align: end;
    font-size: 1rem;
  }
  .status-container {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .status-card {
    background-color: #e7e7e7;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 5px 5px 0px #676767;
  }

  .bold-text {
    font-weight: bold;
  }

  .status-card p {
    margin: 5px;
  }

  .overview-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
  }

  .overview-container h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .overview-container a {
    text-decoration: none;
    color: #606060;
    background-color: #c4c4c4;
    border-radius: 20px;
    align-self: center;
    justify-self: end;
    padding: 10px;
  }

  .category-list {
    padding: 10px;
    display: grid;
    gap: 20px;
  }
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
  .smaller-text {
    font-size: 1rem;
  }

  .add-category-container {
    background-color: #e7e7e7;
    border-radius: 5px;
    list-style: none;
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    padding: 10px 0;
  }
  .add-category-button {
    background-color: #c4c4c4;
    border-radius: 10px;
    width: 70px;
    height: 70px;
    align-self: center;
    justify-self: center;
    position: relative;
  }
  /* The horizontal line */
  .add-category-button::after {
    content: ' ';
    border-radius: 10px;
    position: absolute;
    display: block;
    background-color: #000;
    height: 2px;
    top: 50%;
    left: 20px;
    right: 20px;
    z-index: 9;
  }
  /* The vertical line */
  .add-category-button::before {
    content: ' ';
    border-radius: 10px;
    position: absolute;
    display: block;
    background-color: #000;
    width: 2px;
    left: 50%;
    top: 20px;
    bottom: 20px;
    z-index: 9;
  }
  .add-category-container p {
    font-weight: bold;
  }
</style>
