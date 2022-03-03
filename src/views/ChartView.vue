<script>
  import ChartComp from '../components/ChartComp.vue'

  export default {
    computed: {
      expenses() {
        return this.$store.getters.getFilteredExpenses
      }
    },
    components: {
      ChartComp
    }
  }
</script>

<template>
  <ChartComp :data-b="expenses" />
</template>

<style scoped>
  .chosenView {
    font-size: 1.5rem;
    margin-left: 20px;
    font-weight: lighter;
  }
</style>
