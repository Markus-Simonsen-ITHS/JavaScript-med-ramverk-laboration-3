<script>
  export default {}
</script>

<template>
  <h1 id="title">Varför du ska välja deg</h1>

  <h1>Få kontroll över din ekonomi</h1>
  <p>
    Få dina utgifter kategoriserade, <br />
    Skapa en budget
  </p>

  <h1>Spara varje månad</h1>
  <p>Spara enkelt och smidigt</p>

  <h1>Råd och guidning</h1>
  <p>Få tips och råd om hur du ska spara och hantera din ekonomi</p>

  <div id="loginInBox">
    <form>
      <p>Email</p>
      <input type="text" v-model="loginUsername" placeholder="Username" />
      <p>Lösenord</p>
      <input type="password" v-model="loginPassword" placeholder="Password" />
      <button type="submit" @click.prevent="login">Login</button>
    </form>
  </div>
</template>

<style scoped>
  #title {
    text-align: center;
    margin-bottom: 5rem;
  }
  h1 {
    font-size: 2rem;
  }

  p {
    font-size: 1.5rem;
  }
  #loginInBox {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e7e7e7;
  }
</style>
