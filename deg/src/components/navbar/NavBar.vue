<script>
  export default {
    data() {
      return {
        // A boolean for the hamburger-menu.
        collapsed: true
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
    <!-- Renders the list of links, depending on "collapsed". -->
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
  /* The "Hamburger icon". */
  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    transition: 0.3s ease;
  }
</style>
