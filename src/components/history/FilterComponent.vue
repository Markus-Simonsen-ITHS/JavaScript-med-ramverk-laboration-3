<script>
  export default {
    emits: ['setView', 'changeItemStatus', 'changeTimeFilter'],
    data() {
      return {
        reoccurringSelect: 'all',
        timeSelect: 'oneMonth'
      }
    },
    methods: {
      changeItemStatus() {
        this.$store.dispatch('changeDisplayReoccuring', this.reoccurringSelect)
      },
      changeTimeFilter() {
        this.$store.dispatch('changeTimeFilter', this.timeSelect)
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
  <div class="float-filler" />
  <div class="filter-body">
    <div
      class="filter-form"
      :class="{
        'dark-form': $store.getters.getTheme === 'dark',
        'light-form': $store.getters.getTheme === 'light'
      }"
    >
      <h1>Historik</h1>
      <div class="button-container">
        <div :class="{ active: view === 'list' }">
          <router-link to="/history/list" class="filter-button">
            Lista
          </router-link>
        </div>
        <div :class="{ active: view === 'chart' }">
          <router-link to="/history/chart" class="filter-button">
            Diagram
          </router-link>
        </div>
        <div :class="{ active: view === 'calendar' }">
          <router-link to="/history/calender" class="filter-button">
            Kalender
          </router-link>
        </div>
      </div>
      <select v-model="reoccurringSelect" @change="changeItemStatus">
        <option value="all">Alla</option>
        <option value="reoccurring">Återkommande</option>
      </select>
      <select v-model="timeSelect" @change="changeTimeFilter">
        <option value="oneMonth">1 månad</option>
        <option value="threeMonths">3 månader</option>
        <option value="oneYear">1 år</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
  .float-filler {
    display: none;
  }
  h1 {
    font-size: 1.5rem;
  }
  .filter-body {
    display: flex;
    flex-direction: column;
  }

  .filter-form {
    border-radius: 8px;
    padding: 20px;
    width: 80%;
    align-self: center;
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

  @media screen and (min-width: 950px) {
    .float-filler {
      display: block;
      height: 120px;
    }
    .filter-form {
      width: 50%;
    }
  }
</style>
