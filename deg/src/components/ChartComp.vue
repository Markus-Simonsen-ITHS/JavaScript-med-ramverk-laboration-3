<script>
  import { DoughnutChart } from 'vue-chart-3'

  export default {
    components: { DoughnutChart },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              data: [],
              backgroundColor: ['#faa', '#afa', '#aaf']
            }
          ]
        }
      }
    },
    props: ["data"],
    mounted() {
      console.log(this.data)
    },
    watch: {
      data() {
        let labelArrayVar = []
        let krArrayVar = []
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index];
          labelArrayVar.push(element.category)
          krArrayVar.push(element.amount)
        }
        this.chartData.labels = labelArrayVar
        this.chartData.datasets[0].data = krArrayVar
      }
    }
  }
</script>

<template>
  <DoughnutChart :chartData="chartData" />
</template>
