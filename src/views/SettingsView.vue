<script>
  import NavBar from '../components/NavBar.vue'
  import SliderComp from '../components/home/SliderComp.vue'

  export default {
    data() {
      return {
        darkTheme: false
      }
    },
    components: {
      NavBar,
      SliderComp
    },
    methods: {
      changePassword() {
        this.$store.dispatch('changePassword', {
          email: this.$store.getters.getUser.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword
        })
      },
      deleteAccount() {
        this.$store.dispatch('deleteAccount', {
          email: this.$store.getters.getUser.email,
          password: this.password
        })
      },
      changeTheme() {
        let theme
        if (this.$store.getters.getTheme === 'dark') {
          theme = 'light'
        } else {
          theme = 'dark'
        }
        this.$store.dispatch('changeTheme', theme)
      }
    },
    mounted() {
      const theme = this.$store.getters.getTheme
      this.darkTheme = theme === 'dark' ? true : false
    }
  }
</script>

<template>
  <NavBar />
  <div
    id="main"
    :class="{
      'light-form': $store.getters.getTheme === 'light',
      'dark-form': $store.getters.getTheme === 'dark'
    }"
  >
    <div class="actionItem">
      <h1>Ändra lösenord</h1>
      <label for="oldPassword">Gamla lösenord</label>
      <br />
      <input
        class="textInput"
        v-model="oldPassword"
        name="oldPassword"
        type="password"
      />
      <br />
      <label class="textInput" for="newPassword">Nytt lösenord</label>
      <br />
      <input
        class="textInput"
        name="newPassword"
        type="password"
        v-model="newPassword"
      />
      <br />
      <br />
      <button id="changePassword" @click="changePassword">
        Ändra lösenord
      </button>
    </div>
    <div class="actionItem">
      <h1>Radera konto</h1>
      <input
        class="textInput"
        v-model="password"
        name="password"
        type="password"
      />
      <br />
      <br />
      <button @click="deleteAccount">Radera konto</button>
      <br />
      <br />
    </div>
    <div class="theme-container">
      Mörkt tema:
      <SliderComp :checked="darkTheme" :id="'theme'" @checkbox="changeTheme" />
    </div>
  </div>
</template>

<style scoped>
  #main {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .actionItem {
    width: 90%;
  }
  #main input {
    width: 100%;
  }
  .textInput {
    height: 1rem;
    border: none;
    padding: 0.5rem;
    margin: 0;
    width: calc(100% - 1rem);
    border-radius: 8px;
  }
</style>
