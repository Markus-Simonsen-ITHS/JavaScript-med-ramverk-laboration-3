<!--This file contains everything that should show on every history file (list, chart, calender)-->
<script>
  import NavBar from '../components/NavBar.vue'
  import FilterComponent from '../components/history/FilterComponent.vue'

  export default {
    components: {
      NavBar,
      FilterComponent
    },
    methods: {
      // Defines which view is to be displayed, default is list
      setView(view) {
        this.view = view
      },
      // Defines the status of items to be displayed, like reoccurring or all items
      setItemStatus(status) {
        this.itemStatus = status
      },
      // Defines the time period of which items are to be displayed
      setTimeFilter(timeFilter) {
        this.timeFilter = timeFilter
      },
      goToChart() {
        const viewChart = true
        this.chart = viewChart
      }
    },
    data() {
      return {
        view: 'list',
        itemStatus: 'reoccurring',
        timeFilter: 'oneMonth',
        toggle: false
      }
    }
  }
</script>

<template>
  <NavBar />
  <FilterComponent
    @set-view="setView"
    @change-item-status="setItemStatus"
    @change-time-filter="setTimeFilter"
  />
  <router-view />
</template>

<style scoped></style>
