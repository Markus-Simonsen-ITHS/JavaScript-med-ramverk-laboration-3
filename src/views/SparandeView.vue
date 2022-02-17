<template>
  <div class="main">
    <div class="row">
      <div class="column">
        <h1>Mål</h1>
        <div class="details">
          <h4>Ny telefon</h4>
          <span>800 kr/ 8000 kr</span>
        </div>
        <progress id="file" value="50" max="100" />
        <div class="details">
          <h4>Resa</h4>
          <span>800 kr/ 8000 kr</span>
        </div>
        <progress id="file" value="50" max="100" />
        <div class="details">
          <h4>Playstation</h4>
          <span>800 kr/ 8000 kr</span>
        </div>
        <progress id="file" value="50" max="100" /><br />
        <button>Lägg till sparmål</button>
      </div>
      <div class="divider" />
      <div class="column">
        <h1>Sparkalkylator</h1>
        <div class="loan-col">
          <h4>Ange månadssparande<span>1000 kr</span></h4>
          <input type="range" min="100" max="10000" />
        </div>
        <div class="loan-col">
          <h4>Hur länge vill du spara?<span class="ar">5 år</span></h4>
          <input type="range" min="1" max="20" />
        </div>
        <!-- <div class="loan-col">
          <h4>Hur mycket vill du spara ihop?<span class="kr">0 kr</span></h4>
          <input type="range" min="100" max="10000" />
        </div> -->
        <div class="result">
          <span>Din summering</span>
          <p>60 000 kr</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SparandeView'
  }
</script>
<style scoped>
  * {
    border: 1px;
  }
  .main {
    width: 100%;
    height: 100vh;
  }
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
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
    color: #000000;
  }

  .details {
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 14px;

    color: #000000;
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
    color: #000000;
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
    color: #000000;
  }

  .result p {
    font-style: normal;
    font-weight: normal;
    font-size: 23px;
    line-height: 27px;
    color: #000000;
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
