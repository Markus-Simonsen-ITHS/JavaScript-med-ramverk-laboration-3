<script>
  import { doc, setDoc } from 'firebase/firestore'
  import { db } from '../../firebase'

  export default {
    data() {
      return {
        amount: null,
        title: null,
        errors: {
          titleError: false,
          amountError: false
        }
      }
    },
    methods: {
      addBudget() {
        let errors = false
        // Validating input
        if (!this.isTitleValid()) errors = true
        if (!this.isAmountValid()) errors = true

        // If any error is found, return the function
        if (errors) return

        const docData = {
          id: this.$store.state.user.id,
          title: this.title,
          amount: Number(this.amount)
        }
        setDoc(doc(db, 'budget', this.title), docData)
        this.$router.push('/')
        this.$store.dispatch('fetchBudgetsForUser', this.$store.state.user.id)
      },
      isTitleValid() {
        if (!this.title) {
          this.errors.titleError = true
          return false
        } else {
          this.errors.titleError = false
          return true
        }
      },
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
      }
    }
  }
</script>

<template>
  <!-- The form to add the budget, also the button to submit the budget -->

  <div class="container">
    <h1>Lägg till budget:</h1>
    <form>
      <label for="add-title" class="error-message" v-if="errors.titleError"
        >Du måste fylla i ett namn</label
      >
      <input
        class="form-input"
        :class="{ 'input-error': errors.titleError }"
        type="text"
        v-model="title"
        placeholder="Namn"
      />
      <label class="error-message" for="amount-input" v-if="errors.amountError">
        {{ errors.amountError }}
      </label>
      <input
        class="form-input"
        type="text"
        v-model="amount"
        placeholder="KR"
        :class="{ 'input-error': errors.amountError }"
      />
      <div class="button-container">
        <button
          class="buttons"
          type="submit"
          @click="addBudget"
          @keyup.enter="addBudget"
        >
          Lägg till
        </button>
      </div>
      <div class="cancel">
        <RouterLink to="/"
          ><input class="buttons" type="button" value="Avbryt"
        /></RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
  form {
    display: flex;
    flex-direction: column;
    padding: 20px;
    background-color: #e7e7e7;
    border-radius: 8px;
    align-self: center;
  }
  .form-input {
    height: 40px;
    border-radius: 10px;
    border: none;
    margin-bottom: 10px;
    font-size: 20px;
    text-align: center;
  }
  .button-container {
    margin-top: 10px;
    display: grid;
    justify-items: center;
  }
  .buttons {
    background-color: #292929;
    color: #fff;
    border-radius: 100px;
    font-size: 16px;
    padding: 10px 16px;
    border: none;
    margin-bottom: 5px;
  }
  .input-error {
    border: 1px solid red;
  }
  .error-message {
    color: red;
    margin-bottom: 10px;
    align-self: center;
  }
  .cancel {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  @media (min-width: 980px) {
    .container {
      display: flex;
      flex-direction: column;
    }
    form {
      width: 500px;
    }
    h1 {
      display: flex;
      justify-content: center;
    }
  }
</style>
