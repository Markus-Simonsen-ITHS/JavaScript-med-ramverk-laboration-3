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
    props: {
      onlyRegister: {
        type: Boolean,
        default: false
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
          email: this.loginUsername,
          password: this.loginPassword
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
      },
      onlyRegisterBool() {
        return this.onlyRegister === 'true'
      },
      loginError() {
        console.log(this.$store.getters.getLoginError.toString().length)
        return this.$store.getters.getLoginError
      },
      validPassword() {
        const valid = /(?=.*[0-9a-zA-Z]).{6,}/.test(this.loginPassword)
        return valid
      }
    },
    mounted() {
      this.$store.commit('setLoginError', '')
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
      <p v-if="loginError.toString().length > 0" id="error-message">
        {{ loginError }}
      </p>
      <br />
      <div v-if="onlyRegisterBool">
        <button
          id="loginButton"
          type="submit"
          @click.prevent="register"
          :disabled="validPassword === false"
        >
          Skapa konto
        </button>
        <router-link id="registerButton" to="/login">Logga in</router-link>
      </div>
      <div v-else>
        <button id="loginButton" type="submit" @click.prevent="login">
          Logga in
        </button>
        <router-link id="registerButton" to="/landing">
          Skapa konto
        </router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
  #error-message {
    background-color: lightcoral;
    color: white;
    border-radius: 10px;
    padding: 8px 16px;
  }

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

  #loginButton:disabled {
    color: #a0a0a0 !important;
    cursor: not-allowed;
  }

  p {
    font-size: 1.5rem;
  }
</style>
