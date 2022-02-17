<script>
  import NavBar from '../components/NavBar.vue'

  export default {
    components: {
      NavBar
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
      }
    }
  }
</script>

<template>
  <NavBar />
  <div id="main">
    <div class="actionItem">
      <h1>Change password</h1>
      <label for="oldPassword">Old password</label>
      <br />
      <input
        class="textInput"
        v-model="oldPassword"
        name="oldPassword"
        type="password"
      />
      <br />
      <label class="textInput" for="newPassword">New password</label>
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
        Change Password
      </button>
    </div>
    <div class="actionItem">
      <h1>Delete account</h1>
      <input
        class="textInput"
        v-model="password"
        name="password"
        type="password"
      />
      <br />
      <br />
      <button @click="deleteAccount">Delete account</button>
      <br />
      <br />
    </div>
  </div>
</template>

<style scoped>
  #main {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e7e7e7;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
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
