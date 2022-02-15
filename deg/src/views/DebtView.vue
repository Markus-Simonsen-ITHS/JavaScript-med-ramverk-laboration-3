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
  refresha listan när man har lagt till / ta bort skuld
  felhantering vid utfyllning av formulär
  https://stackoverflow.com/questions/42992340/javascript-how-to-set-dot-after-three-digits
  ränta funktionalitet
  fixa Avbryt method (så att den resetar vald skuld i payoffdebt)
  visa nedanstånde när arrayen är laddas
     <li v-if="this.debts === []">
      <p class="titleText">Laddar...</p>
    </li>
  ta bort payOffDebt funktionalitet (måste ändras i addForm komponent)
   -->
