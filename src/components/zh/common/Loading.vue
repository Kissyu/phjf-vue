<template>
  <div class="loading">
    <img width="24" height="24" src="../../../assets/zh/imgs/loading.gif" alt="">
    <p class="text">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped>
  .loading {
    width: 100%;
    text-align: center;
  }

  .text {
    line-height: 0.5rem;
    font-size: 0.65rem;
    color: #333;
  }
</style>