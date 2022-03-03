<script>
  import CalendarComp from '../components/CalendarComp.vue'
  export default {
    components: { CalendarComp }
  }
</script>

<template>
  <h2 class="chosenView">Kalender</h2>
  <div class="container">
    <CalendarComp />
  </div>
</template>

<style scoped>
  .chosenView {
    font-size: 1.5rem;
    margin-left: 20px;
    font-weight: lighter;
    text-align: center;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
