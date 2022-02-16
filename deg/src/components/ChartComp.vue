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
      data: {
        type: Object,
        required: true
      }
    },
    watch: {
      data() {
        let labelArrayVar = []
        let krArrayVar = []
        for (let index = 0; index < this.data.length; index++) {
          const element = this.data[index]
          const cetegory = element.category
          if (this.findInArray(labelArrayVar, cetegory) != -1) {
            krArrayVar[this.findInArray(labelArrayVar, cetegory)] +=
              element.amount
          } else {
            labelArrayVar.push(cetegory)
            krArrayVar.push(element.amount)
          }
        }
        this.chartData.labels = labelArrayVar
        this.chartData.datasets[0].data = krArrayVar
      }
    },
    methods: {
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
    }
  }
</script>

<template>
  <DoughnutChart :chart-data="chartData" />
</template>
