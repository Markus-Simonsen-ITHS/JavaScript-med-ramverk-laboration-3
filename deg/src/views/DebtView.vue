<!--
  fixa så debtBar tickar ner istället för upp
  fixa debtBar så den visar för varje skuld användare har
  välja hur mycket av valfri skuld som man vill betala av varje månad
   -->

<script>
  import DebtComp from '../components/DebtComp.vue'

  export default {
    components: { DebtComp }
  }
</script>
<template>
  <DebtComp />
</template>
