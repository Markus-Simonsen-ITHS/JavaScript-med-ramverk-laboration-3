<script>
  export default {}
</script>

<template>
  <main
    class="app-main"
    :class="{
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
  >
    <RouterView />
  </main>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
  * {
    font-family: 'Roboto', sans-serif;
  }
  body {
    margin: 0;
    height: 100vh;
  }
  #app {
    height: 100%;
  }
  .app-main {
    height: 100%;
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
    color: black;
    background-color: #f2f2f2;
  }
  .dark {
    background-color: #37393e;
    color: #fff;
  }
</style>
