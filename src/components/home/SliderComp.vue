<script>
  export default {
    data() {
      return {
        checkbox: false //is sent to AddForm and StatusItem
      }
    },
    methods: {
      checkboxChange() {
        this.$emit('checkbox', this.checkbox)
      }
    },
    watch: {
      checked() {
        if (this.checked) {
          this.checkbox = true
        } else {
          this.checkbox = false
        }
      }
    },
    mounted() {
      console.log(this.checked)
      if (this.checked) this.checkbox = true
    },
    emits: ['checkbox'],
    props: {
      label: {
        default: null,
        type: String
      },
      id: {
        default: 'reocurringExpense',
        type: String
      },
      checked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<template>
  <div class="reocurringExpense-container">
    <label :for="'reocurringExpense' + id" class="switch">
      <input
        @change="checkboxChange"
        :id="'reocurringExpense' + id"
        type="checkbox"
        value="reocurringExpense"
        v-model="checkbox"
        :checked="checkbox"
      />
      <span class="slider" />
    </label>
    <label :for="'reocurringExpense' + id"> {{ label }}</label>
    <!-- skicka in label som prop? -->
  </div>
</template>

<style>
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
</style>
