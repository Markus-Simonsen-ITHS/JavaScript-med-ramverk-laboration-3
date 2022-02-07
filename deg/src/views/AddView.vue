<script>
  import CreateIncome from '../components/CreateIncome.vue'
  import CreateExpense from '../components/CreateExpense.vue'

  export default {
    data() {
      return {
        displayAddExpense: true,
        inputAmount: '0'
      }
    },
    methods: {
      // Shows CreateExpense-component
      setDisplayAddExpense() {
        this.displayAddExpense = true
      },
      // Shows CreateIncome-component
      setDisplayAddIncome() {
        this.displayAddExpense = false
      }
    },
    computed: {
      // Calculates the desired width of the amount input based on number of characters. One number is around 27px wide
      inputWidth() {
        const chars = this.inputAmount.toString().length
        let number = 0
        for (let i = 0; i < chars; i++) {
          number += 27
        }
        return number + 'px'
      }
    },
    components: {
      CreateIncome,
      CreateExpense
    }
  }
</script>

<template>
  <p class="add-paragraph">Lägg Till</p>
  <input
    id="amount-input"
    type="text"
    :style="{ width: inputWidth }"
    v-model="inputAmount"
  />
  <label for="amount-input">kr</label>
  <div>
    <button
      @click="setDisplayAddExpense"
      :class="{ active: displayAddExpense }"
    >
      Utgift
    </button>
    <button
      @click="setDisplayAddIncome"
      :class="{ active: !displayAddExpense }"
    >
      Intäkt
    </button>
  </div>

  <CreateExpense v-if="displayAddExpense" />
  <CreateIncome v-if="!displayAddExpense" />
</template>

<style scoped>
  .add-paragraph {
    font-size: 20px;
    font-weight: bold;
    padding: 0 0 0 0;
  }

  input,
  label {
    border: none;
    font-size: 48px;
    font-weight: normal;
  }

  button {
    border-radius: 100px;
    font-size: 16px;
    padding: 10px 16px;
    border: none;
    margin: 0 16px 0 0;
  }

  .active {
    background-color: #292929;
    color: #ffffff;
  }
</style>
