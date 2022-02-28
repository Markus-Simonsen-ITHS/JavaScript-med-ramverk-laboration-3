<script>
  export default {}
</script>

<template>
  <main>
    <div class="logo-container">
      <img class="logo" src="Deg-logo final.svg" alt="" />
      <h1 class="logo-title">DEG</h1>
    </div>
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
