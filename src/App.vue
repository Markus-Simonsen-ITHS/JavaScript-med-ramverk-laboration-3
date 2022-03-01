<script>
  export default {}
</script>

<template>
  <main>
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

  .dark form {
    background-color: #2f3136;
    color: #e5e5e5;
  }
</style>
