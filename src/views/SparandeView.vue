<script>
  import NavBar from '../components/NavBar.vue'

  export default {
    name: 'SparandeView',
    data() {
      return {
        amount: 100,
        year: 1
      }
    },
    computed: {
      results() {
        let beforeInterest = this.amount * (this.year * 12)
        let totalInterest = beforeInterest * 0.08
        return beforeInterest + totalInterest
      }
    },
    components: {
      NavBar
    }
  }
</script>

<template>
  <NavBar />
  <div class="main">
    <div class="row">
      <div class="column">
        <h1>Sparkalkylator</h1>
        <div class="loan-col">
          <h4>
            Ange månadssparande<span>{{ amount }} kr</span>
          </h4>
          <input type="range" min="100" max="10000" v-model="amount" />
        </div>
        <div class="loan-col">
          <h4>
            Hur länge vill du spara?<span class="ar">{{ year }} år</span>
          </h4>
          <input type="range" min="1" max="20" v-model="year" />
        </div>
        <div class="result">
          <span>Din summering</span>
          <p>{{ results }} kr</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  * {
    border: 1px;
  }
  .main {
    width: 100%;
  }
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }

  .column {
    width: 50%;
    padding-left: 8%;
  }

  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
  }

  .details {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
  }

  progress {
    width: 337px;
    height: 10px;
  }
  progress::-webkit-progress-bar {
    background: #c4c4c4;
    border-radius: 100px;
  }

  progress::-webkit-progress-value {
    background: #212121;
    border-radius: 100px;
  }

  button {
    width: 145px;
    height: 37px;
    margin-top: 8%;
    background: #292929;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    border-radius: 100px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #ffffff;
    cursor: pointer;
  }

  .divider {
    border: 1px solid #000000;
    background-color: #000000;
    transform: rotate(360deg);
    height: 80vh;
  }

  .loan-col {
    /* Ange månadssparande */
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;
    padding-top: 1em;
  }
  .loan-col h4 span {
    padding-left: 14em;
  }
  .loan-col h4 .ar {
    padding-left: 16em;
  }
  .loan-col h4 .kr {
    padding-left: 13em;
  }
  input[type='range'] {
    -webkit-appearance: none;
    width: 337px;
    height: 10px;
    background: #c4c4c4;
    border-radius: 100px;
  }
  /* input[type=range]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    background: #008489;
} */
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: #eeeeee;
  }
  .result {
    padding-top: 2rem;
  }
  .result span {
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 23px;
  }

  .result p {
    font-style: normal;
    font-weight: normal;
    font-size: 23px;
    line-height: 27px;
  }

  @media (max-width: 980px) {
    .divider {
      display: none;
    }
    .row {
      margin-top: 30%;
      flex-direction: column;
      justify-content: center;
    }
    .column {
      padding-top: 20%;
    }
  }
</style>
