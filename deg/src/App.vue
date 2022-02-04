<script>
  import NavBar from './components/navbar/NavBar.vue'

  export default {
    components: { NavBar }
  }
</script>

<template>
  <nav />
  <main>
    <NavBar />
    <RouterView />
  </main>
</template>
