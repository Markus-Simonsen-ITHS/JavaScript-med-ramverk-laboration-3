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
    color: black;
    background-color: #e7e7e7;
  }
  .dark {
    background-color: #2f3136;
    color: #8f9296;
  }
</style>
