<script>
  // import db from '../firebase'

  export default {}
</script>

<template>
  <div class="view-transaction">
    <form class="transaction-form">
      <div class="form-inner">
        <h1>Inga utgifter har registrerats</h1>
        <input type="submit" value="gå till skriv in utgift" />
      </div>
    </form>
  </div>

  <div class="transactions">
    <h1>Historik</h1>
    <p>Denna månad</p>
  </div>

  <div class="transaction-container">
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>belopp</p>
      </div>
      <div class="transaction-text">
        <h4>INFO</h4>
        <p>utgift i kr</p>
      </div>
    </div>
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>belopp</p>
      </div>
      <div class="transaction-text">
        <h4>INFO</h4>
        <p>utgift i kr</p>
      </div>
    </div>
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>belopp</p>
      </div>
    </div>
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>belopp</p>
      </div>
    </div>
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>belopp</p>
      </div>
    </div>
  </div>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .view-transaction {
    display: flex;
    justify-content: center;
    min-height: 100vh;
  }
  .transactions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .transaction-card {
    display: flex;
    flex-direction: column;
    background-color: #e7e7e7;
    margin: 2%;
    padding: 2%;
    max-height: 244px;
    max-width: 445px;
    left: 33px;
    top: 149px;
    border-radius: 8px;

    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  .transaction-text {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  .transaction-budget {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
</style>
