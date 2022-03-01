<script>
  import SliderComp from './SliderComp.vue'
  export default {
    data() {
      return { checkbox: 'false', display: 'block' }
    },

    methods: {
      onChecked(checkbox) {
        this.checkbox = checkbox
      }
    },
    watch: {
      checkbox() {
        if (this.checkbox === true) this.display = 'none'
        else this.display = 'block'
      }
    },
    props: {
      status: {
        required: true,
        type: Object
      },
      expenses: {
        default: 0,
        type: Number
      }
    },
    components: { SliderComp }
  }
</script>

<template>
  <div class="status-card">
    <div class="flexer">
      <span :style="{ display: display }">
        <p>
          {{ status.name }}
        </p>
      </span>
      <p v-if="this.checkbox === true && status.name === 'Utgifter'">
        Återkommande Utgifter
      </p>
      <div v-if="status.name === 'Utgifter'" class="aligner">
        <SliderComp @checkbox="onChecked" />
      </div>
    </div>
    <p :style="{ display: display }" class="bold-text">
      <span v-if="status.name === 'Utgifter'">-</span>
      {{ status.amount }} kr
    </p>
    <p
      class="bold-text"
      v-if="this.checkbox === true && status.name === 'Utgifter'"
    >
      - {{ expenses }} kr
    </p>
  </div>
</template>

<style>
  .status-container {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .status-card {
    background-color: #e7e7e7;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 5px 5px 0px #676767;
  }

  .bold-text {
    font-weight: bold;
  }

  .status-card p {
    margin: 5px;
  }

  .flexer {
    display: flex;
    justify-content: space-between;
    height: 65px;
  }
  .aligner {
    margin-top: 6px;
  }
</style>
