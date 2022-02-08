<script>
  export default {
    data() {
      return {
        // A boolean for the hamburger-menu.
        collapsed: true,
        screen: screen.width
      }
    },
    methods: {
      signOut() {
        this.$store.dispatch('logOut')
      }
    }
  }
</script>

<template>
  <!-- The nav, used v-bind on style to open and close the menu. -->
  <div
    class="navbar"
    :style="{
      width: collapsed ? '35px' : '180px',
      height: collapsed ? '35px' : '450px'
    }"
  >
    <!-- The icon for the menu, if clicked toggles true/false for "collapsed". -->
    <div class="container" @click="collapsed = !collapsed">
      <!-- Styling to get opening and closing effect on the icon. -->
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
    <ul>
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
        <RouterLink to="/Landing" @click="signOut">Logga ut</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  /* CSS for the entire navbar, making it so that is stays on the top right corner
  of the screen. */
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
  /* CSS for the container for the icon. */
  .container {
    display: inline-block;
    cursor: pointer;
    width: 70px;
  }
  /* Styles for the links. */
  li {
    list-style: none;
    padding-bottom: 65px;
    font-size: 25px;
    padding-left: 3px;
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
  /* The "Hamburger icon". */
  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    transition: 0.1s ease;
  }
  @media (min-width: 980px) {
    .container {
      display: none;
    }
    .navbar {
      background-color: rgba(255, 0, 0, 0);
      color: rgba(51, 51, 51, 0);
      box-shadow: 0px 0px 0px 0px #676767;
      width: 100% !important;
      height: 40px !important;
      float: none;
      position: unset;
      z-index: 0;
      top: 0;
      right: 0;
      bottom: 0;
      padding: 0;

      transition: none;

      display: flex;
      flex-direction: column;
    }
    ul {
      display: flex;
      justify-content: flex-end;
    }
    li {
      font-weight: lighter;
    }
    a.router-link-exact-active {
      font-weight: bold;
    }
    li a:hover {
      border-bottom-color: #333;
      border-bottom: 3px;
      transition: 0.2s ease;
      text-shadow: 1px 2px 3px #666;
    }
  }
</style>
