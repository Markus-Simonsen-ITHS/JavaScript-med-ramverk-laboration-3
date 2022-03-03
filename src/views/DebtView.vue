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
  felhantering vid utfyllning av formulär (felt ej tomma, måste vara nummer, summa över 0)

Skulder ska renderas som kort (liknande som i home), inte som en lista med borders

  https://stackoverflow.com/questions/42992340/javascript-how-to-set-dot-after-three-digits

  ränta funktionalitet (modifierar skulden så den visar va skulden kommer vara nästa månad, aktiveras den 1:a varje månad)

  fixa Rensa fält method (så att den resetar vald skuld i payoffdebt)
  visa nedanstånde när arrayen är laddas
     <li v-if="this.debts="==" []">
      <p class="titleText">Laddar...</p>
    </li>
   -->
