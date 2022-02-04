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
  <form>
    <input type="text" v-model="loginUsername" placeholder="Username" />
    <input type="password" v-model="loginPassword" placeholder="Password" />
    <button type="submit" @click.prevent="login">Login</button>
  </form>
  <form>
    <input type="text" v-model="registerUsername" placeholder="Username" />
    <input type="password" v-model="registerPassword" placeholder="Password" />
    <button type="submit" @click.prevent="register">Register</button>
  </form>
  <p>{{ userName }}</p>
</template>
