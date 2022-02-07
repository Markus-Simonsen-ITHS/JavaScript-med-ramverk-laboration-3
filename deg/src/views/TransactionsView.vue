<script>
  export default {}
</script>

<template>
  <div class="transactions">
    <h1>Historik</h1>
    <p>Denna månad</p>
  </div>

  <div class="transaction-container">
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>SUMMA</p>
      </div>
      <div class="transaction-text">
        <h4>INFO</h4>
        <p>UTGIFT i kr</p>
      </div>
    </div>
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>BELOPP</p>
      </div>
      <div class="transaction-text">
        <h4>INFO</h4>
        <p>UTGIFT i kr</p>
      </div>
    </div>
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>BELOPP</p>
      </div>
    </div>
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>BELOPP</p>
      </div>
    </div>
    <div class="transaction-card">
      <h2>TITEL</h2>
      <div class="transaction-budget">
        <h5>BUDGET</h5>
        <p>BELOPP</p>
      </div>
    </div>
  </div>
</template>

<style>
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
