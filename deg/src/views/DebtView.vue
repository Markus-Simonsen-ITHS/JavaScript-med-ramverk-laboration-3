<script>
  import DebtComp from '../components/DebtComp.vue'
  import NavBar from '../components/NavBar.vue'

  export default {
    components: { DebtComp, NavBar }
  }
</script>
<template>
  <NavBar />
  <DebtComp />
</template>
<!--
  byt bekräftelse från email till user ID
  ta bort payOffDebt knapp från li (med bekräftelse pop up ruta)
  ta bort debt funktionalitet knapp från li (med bekräftelse pop up ruta)
  ränta funktionalitet
  refresha listan när man har lagt till skuld
  fixa Avbryt method (så att den resetar vald skuld i payoffdebt)
   -->
