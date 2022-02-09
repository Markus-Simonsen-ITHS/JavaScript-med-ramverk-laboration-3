<script>
  import { app } from '../firebase'
  import { db } from '../firebase'

  const utgiftRef = db.collection('utgift')
  const snapshot = await utgiftRef.where('category', '==', 'mat').get()
  if (snapshot.empty) {
    console.log('No matching documents.')
    return
  }

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data())
  })

  export default {
    methods: {
      goToAddView() {
        this.$router.push('/add')
      }
    }
  }
  ref.on('value', getData, errData)

  function errData(error) {
    console.log('Något gick snett')
    console.log(error)
  }

  function getData(data) {
    const utgift = data.val()
    const keys = Object.keys(utgift)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const utgifter = utgift[key]
      console.log(utgifter.utgifter, utgifter.total, key)
    }
  }
</script>

<template>
  <!--Show if there aren't any registered transactions-->
  <div class="view-transaction">
    <form class="transaction-form">
      <div class="form-inner">
        <h1>Inga utgifter har registrerats</h1>
        <input type="button" value="Lägg till utgift" @click="goToAddView" />
      </div>
    </form>
  </div>

  <!--Show if there are any registered transactions-->
  <div class="transactions">
    <h1>Historik</h1>
    <p>Denna månad</p>
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
    align-items: center;
  }

  .transaction-form {
    display: block;
    width: 100%;
    padding: 15px;
  }

  .form-inner {
    padding: 50px 15px;
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
