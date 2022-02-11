<script>
  import DebtComp from '../components/DebtComp.vue'

  export default {
    components: { DebtComp }
  }
</script>
<template>
  <DebtComp />
</template>
<!--
  fixa {{}}
  ta bort payOffDebt eller debt funktionalitet
  refresha listan när man har lagt till skuld
  felhantering vid utfyllning av formulär
  https://stackoverflow.com/questions/42992340/javascript-how-to-set-dot-after-three-digits
  ränta funktionalitet
  fixa Avbryt method (så att den resetar vald skuld i payoffdebt)
  visa nedanstånde när arrayen är laddas
     <li v-if="this.debts === []">
      <p class="titleText">Laddar...</p>
    </li>
   -->
