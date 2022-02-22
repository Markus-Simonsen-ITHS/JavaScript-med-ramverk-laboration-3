<script>
  import SliderComp from '../home/SliderComp.vue'
  export default {
    emits: ['addExpense', 'addIncome'],
    data() {
      return {
        displayAddExpense: true,
        category: '',
        checkbox: 'false',
        title: null,
        date: null,
        amount: '0',
        addType: 'expense',
        errors: {
          titleError: false,
          amountError: false
        },
        label: 'Repetera varje månad'
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
        console.log(this.category)
        // If any errors are found, this is set to true
        let errors = false
        // Validating input
        if (!this.isTitleValid()) errors = true
        if (!this.isAmountValid()) errors = true
        // If any error is found, return the function
        if (errors) return
        const payload = {
          id: this.$store.getters.getUser.id,
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
      },
      onChecked(checkbox) {
        this.checkbox = checkbox
      }
    },
    computed: {
      categories() {
        const categories = []
        this.$store.getters.getBudget.forEach((budget) => {
          categories.push(budget.title)
        })
        return categories
      },
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
    },
    components: { SliderComp }
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
      <option
        v-for="fetchedCategory in categories"
        :key="fetchedCategory"
        :value="fetchedCategory"
      >
        {{ fetchedCategory }}
      </option>
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
    <SliderComp @checkbox="onChecked" :label="label" />
    <div class="button-container">
      <input type="submit" value="Lägg till" />
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

  @media screen and (min-width: 700px) {
    .input-container {
      align-self: center;
    }
    .buttons-container {
      align-self: center;
    }
  }
</style>
