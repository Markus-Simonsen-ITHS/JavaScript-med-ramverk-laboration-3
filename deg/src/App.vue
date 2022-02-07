<script>
  //import NavBar from './components/navbar/NavBar.vue'

  export default {
    components: {
      /*NavBar*/
    }
  }
</script>

<template>
  <nav />
  <main>
    <!-- <NavBar /> -->
    <RouterView />
  </main>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');
  * {
    font-family: 'Roboto', sans-serif;
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
</style>
