<template>
  <div id="titleBarBox">
        <span class="back" @click="back">
            <img src="../../../assets/zh/imgs/back@2x.png" alt="">
        </span>
    <span class="title">{{title}}</span>
  </div>
</template>
<script>
  export default {
    name: 'titleBarBox',
    data() {
      return {
        title: '惠民政策'
      }
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  #titleBarBox {
    position: fixed;
    top:0;
    left:0;
    z-index: 999;
    width: 100%;
    height: 2.25rem;
    line-height: 2.25rem;
    text-align: center;
    background: #fff;
    color: #333;
    font-size: 0.85rem;
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 0.85rem;
  }

  .back img {
    width: 0.625rem;
    height: 1.05rem;
    vertical-align: text-bottom;
  }
</style>

