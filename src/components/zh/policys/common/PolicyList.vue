<template>
  <div id="policyListBox">
    <ul class="policy-list">
      <li class="policy-item" v-for="(item, index) in articleList" :key="item.index">
        <router-link :to="{path: '/phjf/api/v1/page/policyInfo', query:{articleCode: item.article_code,language:'ZH_SIMP'}}" tag="div">
          <h1 class="title">{{item.title}}</h1>
          <span class="time">{{item.publish_date}}</span>
          <span class="source" v-show="item.source">来源：{{item.source}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['articleList'],
    name: 'policyListBox',
    created() {
      if(this.articleList.length==0) {
        this.noDataTag == true;
      }
    },
    data() {
      return {
        noDataTag:false
      }
    }
  }
</script>

<style scoped>
  .policy-list {
    box-sizing: border-box;
    width: 100%;
    padding: 0 0.85rem;
  }

  .policy-item {
    box-sizing: border-box;
    width: 100%;
    padding: 0.75rem 0;
    border-bottom: 1px solid #EBEAF1;
    text-align: left;
  }

  .policy-item a {
    display: block;
  }

  .policy-item:nth-last-child(1) {
    border-bottom: none;
  }

  .title {
    margin-bottom: 0.5rem;
    line-height: 1.3rem;
    font-size: 0.85rem;
    color: #333333;
  }

  .time, .source {
    line-height: 0.9rem;
    font-size: 0.65rem;
    color: #BEBEBE;
  }

  .time {
    margin-right: 1.75rem;
  }
</style>

