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
      },
      focusEmail: {
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
      },
      focusEmailInput() {
        const element = this.$refs.emailInput
        var top = element.offsetTop

        window.scrollTo(0, top)
        this.$refs.emailInput.focus()
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
    },
    watch: {
      focusEmail(newVal) {
        if (newVal) this.focusEmailInput()
      }
    }
  }
</script>

<template>
  <div id="loginInBox">
    <form>
      <p>Email</p>
      <input
        ref="emailInput"
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
      <div class="log-in-align" v-if="onlyRegisterBool">
        <button
          id="loginButton"
          type="submit"
          @click.prevent="register"
          :disabled="validPassword === false"
        >
          Skapa konto
        </button>

        <p class="log-in">Har du redan ett konto?</p>
        <router-link id="registerButton" to="/login"> Logga in</router-link>
      </div>
      <div v-else class="log-in-align">
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
    justify-self: center;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3e4147;
    border-radius: 8px;
    padding: 20px;
  }

  .textInput {
    height: 1rem;
    border: 1px #202225 solid;
    background-color: #33363d;
    padding: 0.5rem;
    margin: 0;
    width: calc(100% - 1rem);
    border-radius: 8px;
    color: #8f9296;
  }

  .textInput:focus {
    outline: 1px solid #a0a0a0;
    background-color: #33363d;
  }

  form {
    width: 80%;
    background-color: #3e4147;
  }

  #loginButton {
    border: none;
    cursor: pointer;
    background-color: #5969ea;
    color: #fff;
    margin: 20px;
    margin-left: 0;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    font-size: 15px;
    width: 100%;
  }

  #registerButton {
    border: none;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    text-align: center;
    color: #cdcdcd;
  }

  #loginButton:disabled {
    color: #a0a0a0 !important;
    cursor: not-allowed;
  }

  p {
    font-size: 1rem;
    text-transform: uppercase;
    color: #cdcdcd;
    font-weight: normal;
  }

  .log-in-align {
    justify-content: center;
    text-align: center;
    margin-bottom: 16px;
  }

  .log-in {
    text-transform: none;
    text-decoration: none;
    text-align: center;
    line-height: 0;
  }
  @media screen and (min-width: 700px) {
    #loginInBox {
      grid-column: span 2;
    }
  }
</style>
