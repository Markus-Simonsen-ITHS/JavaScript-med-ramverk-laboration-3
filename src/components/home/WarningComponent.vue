<script>
  export default {
    props: {
      amountSpent: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        toggle: true
      }
    },
    methods: {
      closeButton() {
        this.toggle = false
      }
    },
    computed: {
      message() {
        if (this.amountSpent >= 50 && this.amountSpent < 75) {
          return 'Varning, du har spenderat mer än 50% av din budget'
        } else if (this.amountSpent >= 75) {
          return 'Varning, du har spenderat mer än 75% av din budget'
        } else {
          return ''
        }
      }
    }
  }
</script>

<template>
  <div class="warning-container" v-if="toggle === true">
    <div class="warning-card" v-if="amountSpent >= 50">
      <p>{{ message }}</p>
      <div id="close-button" @click="closeButton">
        <div class="close-button">
          <div class="close-button-r" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .close-button {
    height: 25px;
    width: 2px;
    margin-left: 12px;
    background-color: white;
    transform: rotate(45deg);
    margin: 0 16px 0 0;
  }

  .close-button-r {
    height: 25px;
    width: 2px;
    background-color: white;
    transform: rotate(90deg);
  }
  .warning-card {
    background-color: lightcoral;
    color: white;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 5px 5px 0px #676767;
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .warning-container p {
    font-size: 16px;
  }
</style>
