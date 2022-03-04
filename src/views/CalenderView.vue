<script>
  import CalendarComp from '../components/CalendarComp.vue'
  export default {
    components: { CalendarComp }
  }
</script>

<template>
  <h2 class="chosenView">Kalender</h2>

  <CalendarComp />
</template>

<style scoped>
  .chosenView {
    font-size: 1.5rem;
    margin-left: 20px;
    font-weight: lighter;
  }
</style>
