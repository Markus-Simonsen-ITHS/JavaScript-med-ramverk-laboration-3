<!--
  fixa så debtBar tickar ner istället för upp
  fixa debtBar så den visar för varje skuld användare har
  välja hur mycket av valfri skuld som man vill betala av varje månad
  fixa skuld knapp på homeview
  styla tillbaka link
   -->

<script>
  import DebtComp from '../components/DebtComp.vue'

  export default {
    components: { DebtComp }
  }
</script>
<template>
  <router-link to="/">Tillbaka</router-link>
  <DebtComp />
</template>
