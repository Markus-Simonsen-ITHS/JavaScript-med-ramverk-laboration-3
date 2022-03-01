<script>
  import ChartComp from '../components/ChartComp.vue'

  export default {
    components: {
      ChartComp
    }
  }
</script>

<template>
  <h2 class="chosenView">Diagram</h2>

  <ChartComp :data-b="expenses" v-show="view === 'chart'" />
</template>

<style scoped>
  .chosenView {
    font-size: 1.5rem;
    margin-left: 20px;
    font-weight: lighter;
  }
</style>
