<script>
  export default {
    emits: ['addExpense', 'addIncome'],
    data() {
      return {
        displayAddExpense: true,
        category: '',
        title: null,
        date: null,
        checkbox: false,
        amount: '0',
        addType: 'expense',
        errors: {
          titleError: false,
          amountError: false
        }
      }
    },
    methods: {
      // Shows CreateExpense-component
      setDisplayAddExpense() {
        this.displayAddExpense = true
        this.addType = 'expense'
      },
      // Shows CreateIncome-component
      setDisplayAddIncome() {
        this.displayAddExpense = false
        this.addType = 'income'
      },
      // Redirects user to home-page
      goToHome() {
        this.$router.push('/')
      },
      // Checks if titleInput is emtpy, marks titleError as true, which displays a message and a red border on input
      isTitleValid() {
        if (!this.title) {
          this.errors.titleError = true
          return false
        } else {
          this.errors.titleError = false
          return true
        }
      },
      // Checks if amount is not emtpty and greater than 0 and if it contains any letters, displays error message if not
      isAmountValid() {
        if (!this.amount) {
          this.errors.amountError = 'Du måste fylla i ett belopp'
          return false
        } else if (parseInt(this.amount) < 1) {
          this.errors.amountError = 'Belopp måste vara mer än 0'
          return false
        } else if (/.*[a-zA-Z].*/.test(this.amount)) {
          this.errors.amountError = 'Belopp kan inte innehålla bokstäver'
          return false
        } else {
          this.errors.amountError = false
          return true
        }
      },
      submit() {
        // If any errors are found, this is set to true
        let errors = false
        // Validating input
        if (!this.isTitleValid()) errors = true
        if (!this.isAmountValid()) errors = true

        // If any error is found, return the function
        if (errors) return

        // Should change email to id
        const payload = {
          email: this.$store.state.user.email,
          title: this.title,
          amount: this.amount,
          category: this.category,
          date: this.date,
          reocurringExpense: this.checkbox
        }
        if (this.addType === 'expense') {
          this.$emit('addExpense', payload)
        } else {
          this.$emit('addIncome', payload)
        }

        // Navigate to home
        this.$router.push('/')
      }
    },
    computed: {
      // Calculates the desired width of the amount input based on number of characters. One number is around 27px wide
      inputWidth() {
        const chars = this.amount.toString().length
        let number = 0
        for (let i = 0; i < chars; i++) {
          number += 27
        }
        return number + 'px'
      }
    },
    watch: {
      // Watches for every change and validates the title input-field
      title() {
        this.isTitleValid()
      },
      // Watches for every change and validates the amount input-field
      amount() {
        this.isAmountValid()
      },
      // Watches for changes in addType and resets error variable
      addType() {
        this.errors.titleError = false
      }
    }
  }
</script>

<template>
  <div class="input-container" :class="{ 'input-error': errors.amountError }">
    <input
      class="amount-input"
      id="amount-input"
      type="text"
      :style="{ width: inputWidth }"
      v-model="amount"
    />
    <label class="amount-input" for="amount-input">kr</label>
  </div>
  <label class="error-message" for="amount-input" v-if="errors.amountError">
    {{ errors.amountError }}
  </label>
  <div class="buttons-container">
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
      Inkomst
    </button>
  </div>
  <form @submit.prevent="submit">
    <select v-model="category">
      <option value="">Kategori</option>
      <option value="mat">Mat</option>
    </select>
    <input
      class="form-input"
      :class="{ 'input-error': errors.titleError }"
      id="add-title"
      type="text"
      v-model="title"
      placeholder="Anteckning"
    />
    <label for="add-title" class="error-message" v-if="errors.titleError"
      >Du måste fylla i ett namn</label
    >
    <input class="form-input" type="date" v-model="date" placeholder="Datum" />
    <div class="reocurringExpense-container">
      <label for="reocurringExpense" class="switch">
        <input
          id="reocurringExpense"
          type="checkbox"
          value="reocurringExpense"
          v-model="checkbox"
        />
        <span class="slider" />
      </label>
      <label for="reocurringExpense">Repetera varje månad</label>
    </div>
    <div class="button-container">
      <input
        type="submit"
        value="Lägg till"
        @click="submit"
        @keyup.enter="submit"
      />
      <input type="button" value="Avbryt" @click="goToHome" />
    </div>
  </form>
</template>

<style scoped>
  .input-container {
    margin-bottom: 10px;
  }

  .amount-input {
    border: none;
    font-size: 48px;
    font-weight: normal;
  }

  .buttons-container {
    margin-bottom: 20px;
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

  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #e7e7e7;
    border-radius: 8px;
    align-self: center;
  }

  select {
    height: 40px;
    background-color: white;
    border-radius: 10px;
    outline: none;
    border: none;
    margin-bottom: 10px;
  }
  .form-input {
    height: 40px;
    border-radius: 10px;
    border: none;
    margin-bottom: 10px;
  }
  input[type='date'] {
    margin-bottom: 20px;
  }

  .reocurringExpense-container {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .reocurringExpense-container .switch {
    margin-right: 10px;
  }

  /* Checkbox as a slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    border-radius: 50%;
    content: '';
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  /* The sliding animation */
  input:checked + .slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
  }

  .button-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }

  input[type='button'],
  input[type='submit'] {
    background-color: #292929;
    color: #fff;
    height: 40px;
    border-radius: 100px;
    width: 100px;
  }

  /* Error-classes on the bottom to have priority over regular classes */
  .input-error {
    border: 1px solid red;
  }
  .error-message {
    color: red;
    margin-bottom: 10px;
    align-self: center;
  }
</style>
