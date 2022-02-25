<script>
  import NavBar from '../components/NavBar.vue'

  export default {
    components: {
      NavBar
    }
  }
</script>

<template>
  <!--This file contains everything that should show on each history files-->
  <NavBar />
  <div class="view-options-container">
    <h1 class="history">Historik</h1>
    <div class="view-options">
      <!--This is the routers for history views-->
      <router-link to="/history/list"
        ><input type="button" class="list-option" value="Lista"
      /></router-link>
      <router-link to="/history/chart"
        ><input type="button" class="chart-option" value="Diagram"
      /></router-link>
      <router-link to="/history/calender"
        ><input type="button" class="calender-option" value="Kalender"
      /></router-link>
    </div>
  </div>
  <router-view />
</template>

<style scoped>
  .history {
    font-size: 1.5rem;
    letter-spacing: 0.5px;
    margin: 10px;
  }
  .view-options-container {
    background-color: #e7e7e7;
    padding: 10px;
  }
  .view-options {
    display: flex;
    justify-content: center;
    margin: 25px;
  }

  .list-option {
    border: none;
    background-color: #e7e7e7;
    text-align: center;
    font-size: 1rem;
    cursor: pointer;
  }

  .chart-option {
    border: none;
    background-color: #e7e7e7;
    text-align: center;
    font-size: 1rem;
    cursor: pointer;
  }

  .calender-option {
    border: none;
    background-color: #e7e7e7;
    text-align: center;
    font-size: 1rem;
    cursor: pointer;
  }
</style>
