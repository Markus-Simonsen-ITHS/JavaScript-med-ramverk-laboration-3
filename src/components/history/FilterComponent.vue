<script>
  export default {
    emits: ['setView', 'changeItemStatus', 'changeTimeFilter'],
    data() {
      return {
        reoccurringSelect: 'reoccurring',
        timeSelect: 'oneMonth'
      }
    },
    methods: {
      changeItemStatus() {
        this.$emit('changeItemStatus', this.reoccurringSelect)
      },
      changeTimeFilter() {
        console.log(this.timeSelect)
        this.$emit('changeTimeFilter', this.timeSelect)
      }
    },
    computed: {
      view() {
        let view
        if (this.$route.path === '/history/list') view = 'list'
        if (this.$route.path === '/history/chart') view = 'chart'
        if (this.$route.path === '/history/calender') view = 'calendar'
        return view
      }
    }
  }
</script>

<template>
  <div
    class="filter-body"
    :class="{
      'dark-form': $store.getters.getTheme === 'dark',
      'light-form': $store.getters.getTheme === 'light'
    }"
  >
    <h1>Historik</h1>
    <div class="button-container">
      <div class="filter-button" :class="{ active: view === 'list' }" id="list">
        <router-link to="/history/list" class="filter-button">
          Lista
        </router-link>
      </div>
      <div
        class="filter-button"
        :class="{ active: view === 'chart' }"
        id="chart"
      >
        <router-link to="/history/chart" class="filter-button">
          Diagram
        </router-link>
      </div>
      <div :class="{ active: view === 'calendar' }" id="calendar">
        <router-link to="/history/calender" class="filter-button">
          Kalender
        </router-link>
      </div>
    </div>
    <select v-model="reoccurringSelect" @change="changeItemStatus">
      <option value="reoccurring">Återkommande</option>
      <option value="all">Alla</option>
    </select>
    <select v-model="timeSelect" @change="changeTimeFilter">
      <option value="oneMonth">1 månad</option>
      <option value="threeMonths">3 månader</option>
      <option value="oneYear">1 år</option>
    </select>
  </div>
</template>

<style scoped>
  h1 {
    font-size: 1.5rem;
  }
  .filter-body {
    border-radius: 8px;
    padding: 20px;
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .filter-button {
    margin-left: 10px;
    user-select: none;
    color: inherit;
    text-decoration: none;
  }
  .active {
    text-decoration: underline;
  }

  select {
    border-radius: 100px;
    border: none;
    background-color: white;
    height: 40px;
    padding: 5px;
    margin-right: 10px;
  }
</style>
