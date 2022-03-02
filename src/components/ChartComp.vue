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
    props: {
      dataB: {
        type: Object,
        required: true
      }
    },
    watch: {
      dataB() {
        this.fillChartData()
      }
    },
    methods: {
      fillChartData() {
        let labelArrayVar = []
        let krArrayVar = []
        for (let index = 0; index < this.dataB.length; index++) {
          const element = this.dataB[index]
          const category = element.category
          if (this.findInArray(labelArrayVar, category) != -1) {
            krArrayVar[this.findInArray(labelArrayVar, category)] +=
              element.amount
          } else {
            labelArrayVar.push(category)
            krArrayVar.push(element.amount)
          }
        }
        this.chartData.labels = labelArrayVar
        this.chartData.datasets[0].data = krArrayVar
      },
      findInArray(array, toFind) {
        for (let index = 0; index < array.length; index++) {
          const element = array[index]
          if (element == toFind) {
            return index
          } else {
            return -1
          }
        }
        return -1
      }
    },
    mounted() {
      if (this.dataB) this.fillChartData()
    }
  }
</script>

<template>
  <DoughnutChart :chart-data="chartData" />
</template>
