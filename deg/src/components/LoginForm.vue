<script>
  export default {
    data() {
      return {
        loginUsername: '',
        loginPassword: '',
        registerUsername: '',
        registerPassword: ''
      }
    },
    methods: {
      login() {
        this.$store.dispatch('signIn', {
          email: this.loginUsername,
          password: this.loginPassword
        })
      },
      register() {
        const payload = {
          email: this.registerUsername,
          password: this.registerPassword
        }
        this.$store.dispatch('registerUser', payload)
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      user() {
        return this.$store.getters.getUser
      },
      userName() {
        return this.user ? this.user.email : ''
      }
    }
  }
</script>

<template>
  <div id="loginInBox">
    <form>
      <p>Email</p>
      <input
        class="textInput"
        type="text"
        v-model="loginUsername"
        placeholder="Username"
      />
      <p>Lösenord</p>
      <input
        class="textInput"
        type="password"
        v-model="loginPassword"
        placeholder="Password"
      />
      <br />
      <button id="loginButton" type="submit" @click.prevent="login">
        Logga in
      </button>
      <button id="registerButton" @click.prevent="register">Skapa konto</button>
    </form>
  </div>
</template>

<style>
  #loginInBox {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e7e7e7;
    border-radius: 8px;
  }

  .textInput {
    height: 1rem;
    border: none;
    padding: 0.5rem;
    margin: 0;
    width: calc(100% - 1rem);
    border-radius: 8px;
  }

  .textInput:focus {
    outline: 1px solid #a0a0a0;
  }

  form {
    width: 80%;
  }

  #loginButton {
    border: none;
    cursor: pointer;
    background-color: #292929;
    color: #fff;
    margin: 20px;
    margin-left: 0;
    padding: 10px;
    border-radius: 100px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    font-size: 15px;
  }

  #registerButton {
    border: none;
    cursor: pointer;
    float: right;
    margin: 30px;
    margin-right: 0;
    font-size: 15px;
    padding: 0;
  }

  p {
    font-size: 1.5rem;
  }
</style>
