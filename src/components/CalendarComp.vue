<script>
  import 'v-calendar/dist/style.css'
  import { collection, getDocs, where, query } from 'firebase/firestore'
  import { db } from '../firebase'
  export default {
    data() {
      const date = new Date()
      // ^ today's date (used in the first labels array slot)
      let labels = [
        // ^ used to display the data on the calendar
        {
          description: 'Dagens datum',
          dates: date,
          color: 'blue'
        }
      ]
      return {
        incId: labels.length,
        labels,
        year: date.getFullYear(),
        month: date.getMonth()
      }
    },
    computed: {
      attributes() {
        //^ attached to the prop :attributes from the Vue3 calendar library, attaches the data from the labels array
        return [
          // Attributes for labels
          ...this.labels.map((label) => ({
            dates: label.dates,
            bar: {
              // ^ makes bars appear under the date, instead of a dot or making the entire square around the digit get highlighted
              color: label.color
            },
            popover: {
              // ^ the window that pops up on the cursor
              label: label.description
            },
            customData: label
          }))
        ]
      }
    },
    async created() {
      // ^ fetches back end income and expenses data and pushes in to the labels array
      console.log(this.year, this.month, this.labels)
      const q = query(
        collection(db, 'inkomst'),
        where('id', '==', this.$store.state.user.id)
      )
      const allIncome = await getDocs(q)
      allIncome.forEach((doc) => {
        this.labels.push({
          description: `${doc.data().title} : ${doc.data().amount}`,
          dates: doc.data().date,
          color: 'green'
        })
      })
      const qq = query(
        collection(db, 'utgift'),
        where('id', '==', this.$store.state.user.id)
      )
      const allExpenses = await getDocs(qq)
      allExpenses.forEach((doc) => {
        this.labels.push({
          description: `${doc.data().title} : ${doc.data().amount}`,
          dates: doc.data().date,
          color: 'red'
        })
      })
      const qå = query(
        collection(db, 'återkommandeInkomst'),
        where('id', '==', this.$store.state.user.id)
      )
      const allIncomeRe = await getDocs(qå)
      allIncomeRe.forEach((doc) => {
        this.labels.push({
          description: `${doc.data().title} : ${doc.data().amount}`,
          dates: new Date(this.year, this.month, 1),
          color: 'green'
        })
      })
      const qqå = query(
        collection(db, 'återkommandeUtgift'),
        where('id', '==', this.$store.state.user.id)
      )
      const allExpensesRe = await getDocs(qqå)
      allExpensesRe.forEach((doc) => {
        this.labels.push({
          description: `${doc.data().title} : ${doc.data().amount}`,
          dates: new Date(this.year, this.month, 1),
          color: 'red'
        })
      })
    }
  }
</script>
<template>
  <div class="container">
    <DatePicker
      is-expanded
      show-weeknumbers
      v-model="date"
      :attributes="attributes"
      :locale="{ id: 'swe', firstDayOfWeek: 2, masks: { weekdays: 'WW' } }"
    />
    <!--
      is-dark
      is-range
      color="red"
      these attributes can be attached to DatePicker (the component in the template just above here) to enable dark mode
      -->
  </div>
</template>
<style scoped>
  .container {
    width: 60%;
  }
  @media screen and (min-width: 900px) {
    .container {
      width: 30%;
    }
  }
</style>
