<template>
  <div id="policyModuleBox">
    <ul class="policy-module">
      <li class="policy-item" v-for="(item, index) in plateList" :key="item.index">
        <router-link tag="div" :to="{path: '/phjf/api/v1/page/policySearchList',query: {regionaCode:regionaCode,plateCode: item.plate_code}}">
                     <span class="icon">
                        <img :src="item.logo" alt="hh">
                    </span>
          <span class="text">{{item.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['plateList','regionaCode'],
    name: 'policyModuleBox',
    data() {
      return {}
    }
  }
</script>

<style scoped>
  #policyModuleBox {
    width: 100%;
    background: #FAFAFA;
    padding-bottom: 0.4rem;
  }

  .policy-module {
    width: 100%;
    background: #fff;
    overflow: hidden;
  }

  .policy-item {
    float: left;
    width: 33.333%;
    font-size: 0.7rem;
    line-height: 0.9rem;
    color: #424242;
    padding-bottom: 0.6rem;
  }

  .icon img {
    display: block;
    margin: 1rem auto 0.3rem;
    width: 1.5rem;
    height: 1.5rem;
  }
</style>

