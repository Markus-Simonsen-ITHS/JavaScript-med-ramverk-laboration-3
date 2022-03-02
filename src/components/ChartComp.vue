<script>
  import { Chart } from 'chart.js'

  export default {
    data() {
      return {
        chartEl: null,
        chartData: {
          type: 'doughnut',
          data: {
            labels: [],
            datasets: [
              {
                data: [],
                backgroundColor: ['#faa', '#afa', '#aaf']
              }
            ]
          }
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
        this.renderChart()
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

        this.chartData.data.labels = labelArrayVar
        this.chartData.data.datasets[0].data = krArrayVar
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
      },
      renderChart() {
        if (this.chartEl) {
          this.chartEl.destroy()
        }
        const chartEl = this.$refs.chartRef

        this.chartEl = new Chart(chartEl, this.chartData)
      }
    },
    mounted() {
      this.fillChartData()
      this.renderChart()
    }
  }
</script>

<template>
  <canvas ref="chartRef" />
</template>
