<script>
  import { doc, setDoc } from 'firebase/firestore'
  import { db } from '../../firebase'

  export default {
    data() {
      return {
        sum: null,
        title: null,
        toggle: true,
        errors: {
          titleError: false,
          amountError: false
        }
      }
    },
    components: {},
    methods: {
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
      },
      addBudget() {
        let errors = false

        if (!this.isTitleValid()) errors = true
        if (!this.isAmountValid()) errors = true

        if (errors) return

        const docData = {
          id: this.$store.state.user.id,
          title: this.title,
          sum: Number(this.sum)
        }
        setDoc(doc(db, 'budget', this.title), docData)
      },
      clear() {
        this.toggle = true
        this.sum = null
        this.title = null
        console.log('hej')
      }
    }
  }
</script>

<template>
  <!-- A button that toggles the function to add a new budget -->
  <label class="error-message" for="amount-input" v-if="errors.amountError">
    {{ errors.amountError }}
  </label>
  <div class="addbutton-container">
    <input
      class="buttons"
      v-if="!toggle"
      type="button"
      value="Avbryt"
      @click="toggle = !toggle"
    />
    <input
      class="buttons"
      v-if="toggle"
      type="button"
      value="Lägg till budget"
      @click="toggle = !toggle"
    />
  </div>
  <!-- The form to add the budget, also the button to submit the budget -->
  <div
    v-if="!toggle"
    class="container"
    :class="{ 'input-error': errors.amountError }"
  >
    <form>
      <h1>Lägg till budget:</h1>
      <input class="form-input" type="text" v-model="sum" placeholder="Mängd" />
      <input
        class="form-input"
        type="text"
        v-model="title"
        placeholder="Anteckning"
      />
      <div class="button-container">
        <input
          class="buttons"
          type="submit"
          value="Lägg till"
          @click="addBudget(), clear()"
          @keyup.enter="addBudget"
        />
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
</style>
