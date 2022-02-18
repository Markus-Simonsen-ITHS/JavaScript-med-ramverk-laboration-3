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
    (loopa igenom array, om den contains() titeln som jag vill lägga in, så byt ut datan mot den nya datan ?)

  felhantering vid utfyllning av formulär (felt ej tomma, måste vara nummer, summa över 0)

  https://stackoverflow.com/questions/42992340/javascript-how-to-set-dot-after-three-digits

  ränta funktionalitet



  fixa Rensa fält method (så att den resetar vald skuld i payoffdebt)
  visa nedanstånde när arrayen är laddas
     <li v-if="this.debts="==" []">
      <p class="titleText">Laddar...</p>
    </li>
  ta bort payOffDebt funktionalitet (måste ändras i addForm komponent)
   -->
