<script>
  export default {
    emits: ['addExpense', 'addIncome'],
    props: {
      // Defines if component is adding expense or income
      addType: {
        required: true,
        type: String
      },
      // The amount to be added to income or expense
      amount: {
        required: true,
        type: Number
      }
    },
    data() {
      return {
        category: '',
        title: null,
        date: null,
        checkbox: false
      }
    },
    methods: {
      submit() {
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
      }
    }
  }
</script>

<template>
  <form @submit.prevent="">
    <select v-model="category">
      <option value="">Kategori</option>
      <option value="mat">Mat</option>
    </select>
    <input type="text" v-model="title" placeholder="Anteckning" />
    <input type="date" v-model="date" placeholder="Datum" />
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
      <input type="button" value="Avbryt" />
    </div>
  </form>
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
  select {
    height: 40px;
    background-color: white;
    border-radius: 10px;
    outline: none;
    border: none;
    margin-bottom: 10px;
  }
  input[type='text'],
  input[type='date'] {
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
    /* width: 60px; */
    /* height: 34px; */
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
</style>
