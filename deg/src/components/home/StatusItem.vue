<script>
  export default {
    props: {
      status: {
        required: true,
        type: Object
      }
    }
  }
</script>

<template>
  <div class="status-card">
    <p>{{ status.name }}</p>
    <p class="bold-text">{{ status.amount }}</p>
  </div>
</template>

<style>
  .status-container {
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .status-card {
    background-color: #e7e7e7;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 1px 5px 5px 0px #676767;
  }

  .bold-text {
    font-weight: bold;
  }

  .status-card p {
    margin: 5px;
  }
</style>
