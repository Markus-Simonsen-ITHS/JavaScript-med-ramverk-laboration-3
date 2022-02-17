<script>
  export default {
    emits: ['setView', 'changeItemStatus', 'changeTimeFilter'],
    data() {
      return {
        view: 'list',
        reoccurringSelect: 'reoccurring',
        timeSelect: 'oneMonth'
      }
    },
    methods: {
      setView(ev) {
        this.view = ev.target.id
        this.$emit('setView', this.view)
      },
      changeItemStatus() {
        this.$emit('changeItemStatus', this.reoccurringSelect)
      },
      changeTimeFilter() {
        console.log(this.timeSelect)
        this.$emit('changeTimeFilter', this.timeSelect)
      }
    }
  }
</script>

<template>
  <div class="filter-body">
    <h1>Historik</h1>
    <div class="button-container">
      <div
        class="filter-button"
        :class="{ active: view === 'list' }"
        id="list"
        @click="setView"
      >
        Lista
      </div>
      <div
        class="filter-button"
        :class="{ active: view === 'chart' }"
        id="chart"
        @click="setView"
      >
        Diagram
      </div>
      <div
        class="filter-button"
        :class="{ active: view === 'calendar' }"
        id="calendar"
        @click="setView"
      >
        Kalender
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
    background: linear-gradient(0.25turn, #e7e7e7, #e7e7e780);
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
