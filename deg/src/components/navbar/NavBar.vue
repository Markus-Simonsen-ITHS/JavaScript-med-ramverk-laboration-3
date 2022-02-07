<script>
  //import { collapsed, toggleNavbar, navbarWidth, navbarHeight } from './state'

  export default {
    data() {
      return {
        collapsed: true
      }
    }
  }
</script>

<template>
  <div
    class="navbar"
    :style="{
      width: collapsed ? '35px' : '180px',
      height: collapsed ? '35px' : '450px'
    }"
  >
    <div class="container" @click="collapsed = !collapsed">
      <div
        class="bar1"
        :style="collapsed ? 'margin-top: 6px' : 'margin: 20px'"
      />
      <div
        class="bar2"
        :style="collapsed ? 'margin-top: 6px' : 'margin: 20px'"
      />
      <div
        class="bar3"
        :style="collapsed ? 'margin-top: 6px' : 'margin: 20px'"
      />
    </div>
    <ul v-if="!collapsed">
      <li>
        <RouterLink to="/">Hem</RouterLink>
      </li>
      <li>
        <RouterLink to="/">Historik</RouterLink>
      </li>
      <li>
        <RouterLink to="/">Sparande</RouterLink>
      </li>
      <li>
        <RouterLink to="/Landing">Logga ut</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .navbar {
    color: white;
    background-color: #e7e7e7;
    box-shadow: 1px 5px 5px 0px #676767;

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
    width: 70px;
  }
  li {
    padding: 25px;
    font-size: 20px;
  }
  li a {
    padding: 10px;
  }
  li a:visited {
    text-decoration: none;
    color: rgb(0, 0, 0);
  }
  li a:link {
    text-decoration: none;
    color: rgb(0, 0, 0);
  }

  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    transition: 0.3s ease;
  }
</style>
