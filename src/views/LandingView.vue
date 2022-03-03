<script>
  import LoginForm from '../components/LoginForm.vue'

  export default {
    data() {
      return {
        focusEmail: false
      }
    },
    methods: {
      focusEmailInput() {
        this.focusEmail = true
      }
    },
    components: {
      LoginForm
    }
  }
</script>

<template>
  <header>
    <p>DEG</p>
    <router-link to="/login">Logga in</router-link>
  </header>
  <div class="landing-container">
    <h1 id="title">Varför du ska välja deg...</h1>
    <img
      src="../../assets/landing001.svg"
      alt="Illustration of person selecting screens"
    />

    <button class="register-button" @click="focusEmailInput">
      Registrera dig
    </button>

    <div class="control-economy-section">
      <h1>Få kontroll över din ekonomi</h1>
      <p>
        Få dina utgifter kategoriserade, <br />
        Skapa en budget
      </p>
    </div>

    <img
      id="second-image"
      src="../../assets/landing002.svg"
      alt="Illustration of person selecting screens"
    />
    <div class="save-every-month-section">
      <h1>Spara varje månad</h1>
      <p>Spara enkelt och smidigt</p>
    </div>

    <img
      src="../../assets/landing003.svg"
      alt="Illustration of person selecting screens"
    />
    <div class="tips-and-guide-section">
      <h1>Råd och guidning</h1>
      <p>Få tips och råd om hur du ska spara och hantera din ekonomi</p>
    </div>
    <div v-if="this.$store.state.logoutMessage" class="logOutMessage">
      <p>Du har blivit utloggad</p>
    </div>
    <LoginForm :focus-email="focusEmail" only-register="true" />
  </div>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap');
  * {
    font-family: 'Montserrat', sans-serif;
  }
  img {
    max-width: 100%;
    grid-row: span 2;
  }

  header {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr;
    background-color: #5969ea;
  }

  .landing-container {
    background-color: #5969ea;
    display: grid;
    gap: 40px;
    padding: 10px;
  }

  header p {
    margin: 0;
    grid-row: 1;
    grid-column: 1;
    justify-self: start;
    align-self: center;
    font-family: 'Roboto', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
  }

  header a {
    text-decoration: none;
    background-color: #2f3136;
    border-radius: 100px;
    color: #e5e5e5;
    height: 40px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-row: 1;
    grid-column: 1;
    justify-self: end;
  }

  #title {
    text-align: left;
    margin-bottom: 5rem;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.5rem;
  }
  h1 {
    font-size: 1.5rem;
    margin: 0;
    font-weight: 700;
    color: #e5e5e5;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    color: #e5e5e5;
  }

  button {
    background-color: #2f3136;
    border: none;
    border-radius: 100px;
    color: #e5e5e5;
    height: 50px;
    width: 160px;
    font-size: 1rem;
  }

  .logOutMessage p {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    padding-top: 20px;
  }
  .logOutMessage {
    margin-bottom: -20px;
    width: 100%;
    height: 40px;
    background-color: #e7e7e7;
    border-radius: 8px;
  }

  @media screen and (min-width: 700px) {
    .landing-container {
      grid-template-columns: 1fr 1fr;
    }
    img {
      align-self: center;
      justify-self: center;
    }
    #second-image {
      grid-column: 1;
    }
    .control-economy-section {
      grid-row: 3 / 5;
      grid-column: 2;
      display: grid;
      justify-content: center;
      grid-auto-rows: 0.1fr;
    }
    .control-economy-section h1 {
      grid-row: 5;
    }
    .control-economy-section p {
      grid-row: 6;
    }
    .save-every-month-section {
      grid-row: 5 / 7;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      display: grid;
      justify-content: center;
      grid-auto-rows: 0.1fr;
    }
    .save-every-month-section h1 {
      grid-row: 5;
    }
    .save-every-month-section p {
      grid-row: 6;
    }
    .tips-and-guide-section {
      grid-column: 2;
    }
  }
</style>
