<template>
  <div id="policySearchListBox">
    <div class="poliSearch" v-show="searchFlag">
      <policy-search :articleTitle="articleTitle" @loadSearchData="loadSearchData"></policy-search>
    </div>
    <div class="search-wrapper clearfix" v-show="!plateCode" :class="{isShow:plateCode}">
      <div class="policy-filter-box fl">
        <policy-filter :searchTerms="searchTerms"  @getFilter="getFilter"></policy-filter>
      </div>
      <div class="policy-otherFilter-box fl">
        <policy-other-filter :searchTerms="searchTerms" @getFilterPolicys="getFilterPolicyList"></policy-other-filter>
      </div>
    </div>
    <policy-list class="poliList" :articleList="articleList"></policy-list>
    <div :class="loadMoreHide ? 'load-more-hide' : 'load-more-normal'" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <span v-show="loadingShow">
        <loading></loading>
      </span>
    </div>
    <div v-show="!flag" class="null-container" :class="{isDown:!plateCode}">
        <img :src="nomoredataUrl" alt="">
        <div class="text">什么都没有</div>
    </div>
    <!--<div v-show="noMore">没有更多数据了</div>-->
  </div>
</template>

<script>
  import axios from 'axios';
  import TitleBar from '../common/TitleBar';
  import PolicySearch from './common/PolicySearch';
  import PolicyFilter from './common/PolicyFilter';
  import PolicyOtherFilter from './common/PolicyOtherFilter';
  import PolicyList from './common/PolicyList';
  import Loading from '@/components/zh/common/Loading';
  import nomoredata from '@/assets/zh/imgs/nomoredata.png';

  export default {
    name: 'policySearchListBox',
    components: {
      'title-bar': TitleBar,
      'policy-search':PolicySearch,
      'policy-filter': PolicyFilter,
      'policy-other-filter': PolicyOtherFilter,
      'policy-list': PolicyList,
      'loading': Loading,
    },
    data() {
      return {
        searchTerms: [],
        articleList: [],
        plateCode: '',
        regionaCode: 650000,
        nowPage:1,
        pageCount:0,
        termsListTypeC:'',
        busy: false,
        loadingShow:false,
        articleTitle:'',
        termsListTypeS:[],
        flag:true,
        searchFlag:false,
        nomoredataUrl:nomoredata,
        noMore:false
      }
    },
    created() {
      this.regionaCode = this.$route.query.regionaCode;
      this.plateCode = this.$route.query.plateCode;
      this.articleTitle = this.$route.query.articleTitle;
      this.loadMoreHide();
      this.getSearchTerms();
      this.getArticleList(false);
    },
    methods: {
      loadMoreHide() {//初始设置
        this.busy = true;
        this.loadMoreHide = true;

        setTimeout(() => {
          this.loadMoreHide = false;
          this.busy = false;
        }, 500);
      },
      loadMore () {//滚动执行
        this.busy = true;
        this.loadingShow = true;
        setTimeout(() => {
          this.nowPage++;
          this.getArticleList(true);
          this.loadingShow = false;
        }, 1000)
      },
      getArticleList(flag) {//获取列表
        var url_dev = "/api";
        var url_build = "";
        axios({
          method: 'get',
          headers: {
            'content-type': 'application/jsonp'
          },
          url: url_build+'/phjf/api/v1/benefitPolicy/queryPolicyArticle',
          params:{
            regionaCode:this.regionaCode,
            nowPage:this.nowPage,
            plateCode:this.plateCode,
            articleTitle:this.articleTitle,
            termsListTypeC:this.termsListTypeC,
            termsListTypeS:this.termsListTypeS
          }
        }).then((res) => {
          if(res.data.code == 1){
            this.pageCount=res.data.data.page.pageCount;
            if(flag){
              this.articleList = this.articleList.concat(res.data.data.articleList);
              if(this.nowPage >= this.pageCount ){
                this.busy = true;
                this.loadMoreHide = true;
                this.noMore = true;
              }else{
                this.busy = false;
                this.loadMoreHide = false;
              }
            }else{
              this.articleList = res.data.data.articleList;
              if(!this.articleList.length){
                this.flag = false;
              }else{
                this.flag = true;
              }
              if(this.nowPage >= this.pageCount ){
                this.busy = true;
                this.loadMoreHide = true;
              }else{
                this.busy = false;
                this.loadMoreHide = false;
              }
            }
            if(!(this.plateCode && !this.articleList.length)){
              this.searchFlag = true;
            }
            if(!this.articleList.length){
              this.flag = false;
            }
          }else if(res.data.code == 2){
            console.log(res.data.msg)
          }
        })
      },
      getSearchTerms() {//获取筛选
        var url_dev = "/api";
        var url_build = "";
        axios({
          method: 'get',
          headers: {
            'content-type': 'application/jsonp'
          },
          url: url_build+'/phjf/api/v1/benefitPolicy/searchTerms',
          params: {
            regionaCode: this.regionaCode,
          }
        }).then((res) => {
          if(res.data.code == 1){
            this.searchTerms = res.data.data.searchTerms
          }else if(res.data.code == 2){
            console.log(res.data.msg)
          }
        })
      },
      getFilter(data){
        this.nowPage=1;
        this.termsListTypeC = JSON.stringify(data);
        this.getArticleList(false);
      },
      getFilterPolicyList(termsListTypeS){
        this.nowPage=1;
        this.termsListTypeS = JSON.stringify(termsListTypeS);
        this.getArticleList(false);
      },
      loadSearchData(articleTitle) {
        this.nowPage=1;
        this.articleTitle=articleTitle;
        this.getArticleList(false);
      }
    },
    watch:{

    }
  }
</script>
<style scoped>
  #policySearchListBox{
    padding-top:0;
  }

  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }

  .load-more-normal {
    text-align: center;
    height: 2rem;
    line-height: 2rem;
  }

  .load-more-hide {
    height: 0;
  }
  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
  .poliSearch {
    position: fixed;
    top:0;
    left:0;
    z-index: 11;
    box-sizing: border-box;
    width: 100%;
    padding: 0.65rem 3%;
    margin: 0 auto;
    background-color: #fafafa;
  }
  .search-wrapper{
    background: #fff;
    position: fixed;
    top:3.1rem;
    left:0;
    z-index: 11;
    width:100%;
    border-bottom: 1px solid #EBEAF1;
  }
  .policy-filter-box {
    width: 75%;
  }
  .policy-otherFilter-box{
    width: 25%;
  }
  .poliList{
    padding-top: 5.35rem;
  }
  .isShow~.poliList{
    padding-top: 3.1rem;
  }
  .null-container{
    position: absolute;
    top:50%;
    left:50%;
    width:100%;
    transform:translate(-50%,-52%);
    text-align: center;
  }
  .null-container img{width:10.5rem;height:10.5rem;}
  .isDown{
    transform:translate(-50%,-35%);
  }
  .null-container .text{
    margin-top: 1rem;
    padding-bottom: 2rem;
    font-size: 0.85rem;
    color:#767676;
    letter-spacing:2px;
  }
</style>

