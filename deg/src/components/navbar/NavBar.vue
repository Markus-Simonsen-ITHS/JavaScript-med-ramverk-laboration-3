<script>
  import { collapsed, toggleNavbar, navbarWidth } from './state'

  export default {
    props: {},
    setup() {
      return { collapsed, toggleNavbar, navbarWidth }
    }
  }
</script>

<template>
  <div class="navbar" :style="{ width: navbarWidth }">
    <div class="container" @click="toggleNavbar()">
      <div class="bar1" />
      <div class="bar2" />
      <div class="bar3" />
    </div>
  </div>
</template>

<style scoped>
  .navbar {
    color: white;
    background-color: greenyellow;

    float: right;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
  }
  .container {
    display: inline-block;
    cursor: pointer;
  }

  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
  }
</style>
