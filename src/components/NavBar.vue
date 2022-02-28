<script>
  export default {
    data() {
      return {
        // A boolean for the hamburger-menu. This bool is the key to making
        // the menu work.
        collapsed: true
      }
    },
    methods: {
      // A method that sign you out when triggered (see "Logga ut" router link).
      signOut() {
        this.$store.dispatch('logOut')
      }
    }
  }
</script>

<template>
  <!-- The nav, used v-bind on style to open and close the menu. When "collapsed"
  is true it uses the px-value to the left and vice versa. -->
  <div
    class="navbar"
    :class="{
      light: $store.getters.getTheme === 'light',
      dark: $store.getters.getTheme === 'dark'
    }"
    :style="{
      width: collapsed ? '35px' : '200px',
      height: collapsed ? '35px' : '590px'
    }"
  >
    <!-- The icon for the menu, if clicked toggles true/false for "collapsed". -->
    <div class="container" @click="collapsed = !collapsed">
      <!-- The icon for the hamburger menu. Three divs that are styled as three
      bars, also gets styled depending on "collapsed" with v-bind (:style). -->
      <div
        class="bar1"
        :class="{
          'light-hamburger': $store.getters.getTheme === 'light',
          'dark-hamburger': $store.getters.getTheme === 'dark'
        }"
        :style="collapsed ? 'margin-top: 6px' : 'margin: 20px'"
      />
      <div
        class="bar2"
        :class="{
          'light-hamburger': $store.getters.getTheme === 'light',
          'dark-hamburger': $store.getters.getTheme === 'dark'
        }"
        :style="collapsed ? 'margin-top: 6px' : 'margin: 20px'"
      />
      <div
        class="bar3"
        :class="{
          'light-hamburger': $store.getters.getTheme === 'light',
          'dark-hamburger': $store.getters.getTheme === 'dark'
        }"
        :style="collapsed ? 'margin-top: 6px' : 'margin: 20px'"
      />
    </div>
    <!-- The links inside the navbar. -->
    <ul>
      <li
        class="link"
        :class="{
          light: $store.getters.getTheme === 'light',
          dark: $store.getters.getTheme === 'dark'
        }"
      >
        <RouterLink to="/">Hem</RouterLink>
      </li>
      <li
        class="link"
        :class="{
          light: $store.getters.getTheme === 'light',
          dark: $store.getters.getTheme === 'dark'
        }"
      >
        <RouterLink to="/history">Historik</RouterLink>
      </li>
      <li
        class="link"
        :class="{
          light: $store.getters.getTheme === 'light',
          dark: $store.getters.getTheme === 'dark'
        }"
      >
        <RouterLink to="/sparande">Sparande</RouterLink>
      </li>
      <li
        class="link"
        :class="{
          light: $store.getters.getTheme === 'light',
          dark: $store.getters.getTheme === 'dark'
        }"
      >
        <RouterLink to="/Debt">Skulder</RouterLink>
      </li>
      <li
        class="link"
        :class="{
          light: $store.getters.getTheme === 'light',
          dark: $store.getters.getTheme === 'dark'
        }"
      >
        <RouterLink to="/settings">Inställningar</RouterLink>
      </li>
      <!-- When clicking "Logga ut" it takes you to the landing page and also
      runs a method that logs you out. -->
      <li
        class="link"
        :class="{
          light: $store.getters.getTheme === 'light',
          dark: $store.getters.getTheme === 'dark'
        }"
      >
        <RouterLink to="/Landing" @click="signOut">Logga ut</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  /* CSS for the entire navbar, so that is stays on the top right corner
  of the screen. */
  .navbar {
    box-shadow: 1px 5px 5px 0px #676767;

    float: right;
    position: fixed;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    padding: 0.5em;
    /* A transition effect to smoothly open and close the menu. */
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
  ul {
    margin-top: 0px;
  }
  /* Styles for the links. */
  .link {
    list-style: none;
    padding-bottom: 40px;
    font-size: 25px;
    padding-left: 3px;
  }

  .link a {
    text-decoration: none;
    color: inherit;
    padding: 10px;
  }

  /* The "Hamburger icon". As mentioned previously, just three bars.  */
  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 5px;
    background-color: inherit;
    transition: 0.1s ease;
  }

  .light-hamburger {
    background-color: #333;
  }

  .dark-hamburger {
    background-color: white;
  }

  .light {
    color: black;
    /* background-color: #e7e7e7; */
  }
  .dark {
    /* background-color: #2f3136; */
    color: #8f9296;
  }
  /* From here the CSS only applies to desktop (over 980px). */
  @media (min-width: 980px) {
    .container {
      display: none;
    }
    .navbar {
      /* Removed background color, color, box-shadow, float, position */
      background-color: rgba(255, 0, 0, 0);
      color: rgba(51, 51, 51, 0);
      box-shadow: 0px 0px 0px 0px #676767;
      width: 100% !important;
      height: 80px !important;
      float: none;
      position: unset;
      z-index: 0;

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
    /* CSS for the links, "a.router-link-exact-active" makes it so that the link
    you are currently in higlights in the navbar. */
    a.router-link-exact-active {
      font-weight: bold;
    }
    /* A hover effect, makes the text "glow" when the mouse is over it. */
    li a:hover {
      border-bottom-color: #333;
      border-bottom: 3px;
      transition: 0.2s ease;
      text-shadow: 1px 2px 3px #666;
    }
  }
</style>
