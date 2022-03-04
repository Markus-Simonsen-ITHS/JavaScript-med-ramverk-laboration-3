<!--This file contains everything that should show on every history file (list, chart, calender)-->
<script>
  import NavBar from '../components/NavBar.vue'
  import FilterComponent from '../components/history/FilterComponent.vue'

  export default {
    components: {
      NavBar,
      FilterComponent
    }
  }
</script>

<template>
  <NavBar />
  <FilterComponent />
  <router-view />
</template>
