<script>
  import CalendarComp from '../components/CalendarComp.vue'
  export default {
    components: { CalendarComp }
  }
</script>

<template>
  <div class="wrapper">
    <CalendarComp />
  </div>
</template>

<style scoped>
  .wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
  }
</style>
