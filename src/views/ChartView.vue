<script>
  import ChartComp from '../components/ChartComp.vue'

  export default {
    computed: {
      expenses() {
        return this.$store.getters.getExpenses
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
