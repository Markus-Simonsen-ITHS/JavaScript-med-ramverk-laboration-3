<script lang="ts">
  import { DoughnutChart } from 'vue-chart-3'

  export default {
    components: { DoughnutChart },
    data() {
      return {
        chartData: {
          labels: ['One', 'Two', 'Three',],
          datasets: [
            {
              data: [1, 2, 3],
              backgroundColor: ['#faa', '#afa', '#aaf']
            }
          ]
        }
      }
    }
  }
</script>

<template>
  <DoughnutChart :chartData="chartData" />
</template>
