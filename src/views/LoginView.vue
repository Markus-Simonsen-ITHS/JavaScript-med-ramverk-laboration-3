<script>
  import LoginForm from '../components/LoginForm.vue'
  export default {
    components: { LoginForm }
  }
</script>

<template>
  <div class="loginview-container">
    <LoginForm only-register="false" />
  </div>
</template>

<style scoped>
  .loginview-container {
    display: grid;
    align-items: center;
    height: 100vh;
    background-color: #5969ea;
  }
</style>
