<script>
  export default {
    computed: {
      // Hides header if route is landing or login
      displayHeader() {
        return this.$route.path === '/landing' || this.$route.path === '/login'
      }
    }
  }
</script>

<template>
  <main
    class="app-main"
    :class="{
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
  >
    <div class="logo-container" v-if="!displayHeader">
      <img
        class="logo"
        src="Deg-logo final.svg"
        alt="Deg logo black"
        v-if="$store.getters.getTheme === 'light'"
      />
      <img
        src="../public/Deg-logo-white.svg"
        alt="Deg logo white"
        class="logo"
        v-if="$store.getters.getTheme === 'dark'"
      />
      <h1 class="logo-title">DEG</h1>
    </div>
    <RouterView />
  </main>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;800&display=swap');
  * {
    font-family: 'Roboto', sans-serif;
  }
  body {
    margin: 0;
    height: 100vh;
  }

  #app {
    min-height: 100%;
  }
  .app-main {
    min-height: 100vh;
  }
  h1 {
    font-size: 2.5rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.5rem;
    font-weight: 300;
    margin-bottom: 1rem;
  }

  .light {
    color: #202225;

    background-color: #f2f2f2;
  }

  .light form {
    color: #202225;
    background-color: #e5e5e5;
  }

  .dark {
    background-color: #37393e;
    color: #e5e5e5;
  }

  .dark-form {
    background-color: #2f3136;
    color: #e5e5e5;
  }

  .light-form {
    color: #202225;
    background-color: #e5e5e5;
  }

  .dark form {
    background-color: #2f3136;
    color: #e5e5e5;
  }

  .logo {
    width: 100px;
    height: 90px;
  }
  .logo-container {
    display: flex;
  }
  .logo-title {
    margin: 0;
    font-size: 4rem;
    margin-left: 20px;
  }
  @media (min-width: 950px) {
    .logo-container {
      display: none;
    }
  }
</style>
