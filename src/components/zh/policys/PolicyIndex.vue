<template>
    <div id="policyFilterBox" class="clearfix">
        <div id="filterSearchBox" class="filterSearchBox clearfix">
            <div class="cityFilter">
                <policy-city-filter v-bind:cityList="cityList" v-bind:regionaCode="regional_Code"  v-bind:regionaName="regional_name" v-on:getAllIndexData="getAllIndexData"></policy-city-filter>
            </div>
            <div class="searchBox">
                <div id="policySearchBox">
                    <input type="text" placeholder="搜索" id="searchIpt" v-model="serchVal" @keyup.enter="getSearchData">
                    <i class="search_icon" :style ="searchIcon" @click="getSearchData"></i>
                    <i class="el-icon-iconName el-icon-error searchdel_icon" @click="delSearchData"></i>
                </div>
            </div>
        </div>
        <div class="poliModuleBox">
            <policy-modules :plateList="plateList" :regionaCode="this.regional_Code"></policy-modules>
        </div>
        <div id="policy-wrapper">
            <div class="policy-title">
                <span class="line"></span><span class="title">{{msg}}</span>
                <router-link :to="{path: '/phjf/api/v1/page/policySearchList',query: {regionaCode: this.regional_Code}}">
                    <span class="more">更多</span>
                </router-link>
            </div>
            <policy-list :articleList="articleList"></policy-list>
            <!--<div :class="loadMoreHide ? 'load-more-hide' : 'load-more-normal'" v-infinite-scroll="loadMore"-->
                 <!--infinite-scroll-disabled="busy" infinite-scroll-distance="10">-->
                <!--<span v-show="loadingShow"><loading></loading></span>-->
            <!--</div>-->
        </div>
        <!--<div v-show="!articleList.length" class="loading-container">-->
            <!--<loading></loading>-->
        <!--</div>-->
    </div>
</template>

<script>
    import axios from 'axios';
    import policyCityFilter from '@/components/zh/policys/common/PolicyCityFilter'
    import policyModules from '@/components/zh/policys/common/PolicyModules'
    import policyList from '@/components/zh/policys/common/PolicyList'
    import Loading from '@/components/zh/common/Loading'
    export default {
        name: 'policyFilterBox',
        created:function() {
            //请求首页数据
            this.getAllIndexData(this.regional_Code);
            //隐藏loadingMore
            this.loadMoreHide();

        },
        components:{
            'policy-city-filter':policyCityFilter,
            'policy-modules':policyModules,
            'policy-list':policyList,
            'loading': Loading
        },
        data () {
            return {
                regional_Code:'',
                regional_name:'',
                cityList:[],
                msg: '惠民政策',
                plateList: [],
                articleList: [],
                nowPage: 0,
                pageCount: 0,
                busy: false,
                loadingShow: false,
                // loadMoreHide:false,
                searchIcon:{
                    backgroundImage: "url(" + require("../../../assets/zh/imgs/search_icon.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:"cover"
                },
                serchVal:''
            }
        },
        methods: {
            getAllIndexData: function(regionaCode) {
                var _this = this;
                var url_dev="/api";
                var url_build = "";
                axios.get(url_build+'/phjf/api/v1/benefitPolicy/main', {
                    params: {
                        regionaCode: regionaCode
                    }
                }).then(function (response) {
                    var result = response.data;
                    if(result.code == 1) {
                        var regionaCodeList = result.data.regionaCodeList;
                        _this.cityList = regionaCodeList;
                        _this.plateList = result.data.plateList;
                        _this.articleList = result.data.articleList;
                        for(let i = 0;i<_this.cityList.length;i++) {
                            if(_this.cityList[i].selectde=='T') {
                                _this.regional_Code=_this.cityList[i].regionaCode;
                                _this.regional_name=_this.cityList[i].regionalName;
                                return;
                            }
                        }

                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            loadMoreHide() {
                if (this.nowPage >= this.pageCount) {
                    this.busy = true;
                    this.loadMoreHide = true;
                } else {
                    this.busy = false;
                    this.loadMoreHide = false;
                }
                this.busy = true;
                setTimeout(() => {
                    this.busy = false;
                }, 1000);
            },
            loadMore() {
                this.busy = true;
                this.loadingShow = true;
                setTimeout(() => {
                    this.nowPage++;
                this.getArticleList(true);
                this.loadingShow = false;
            }, 1000)
                // console.log(this.nowPage)
            },
            getArticleList(flag) {
                var url_dev = "/api";
                var url_build = "";
                axios({
                    method: 'get',
                    headers: {
                        'content-type': 'application/jsonp'
                    },
                    url: url_build+'/phjf/api/v1/benefitPolicy/policyRecom',
                    params: {
                        nowPage: this.nowPage,
                    }
                }).then((res) => {
                  if (res.data.code == 1) {
                    this.pageCount = res.data.data.page.pageCount
                    if (flag) {
                      this.articleList = this.articleList.concat(res.data.data.articleList);
                      if (this.nowPage >= this.pageCount) {
                        this.busy = true;
                        this.loadMoreHide = true;
                      } else {
                        this.busy = false;
                        this.loadMoreHide = false;
                      }
                    } else {
                      this.articleList = res.data.data.articleList
                      this.busy = false;
                      this.loadMoreHide = false;
                    }
                  } else if (res.data.code == 2) {
                    console.log(res.data.msg)
                }
            })
            },
            getSearchData() {
//                window.location.href = '/phjf/api/v1/page/policySearchList?regionaCode='+this.regional_Code+"&&articleTitle="+this.serchVal;
                window.location.href = '/vue/#/phjf/api/v1/page/policySearchList?regionaCode='+this.regional_Code+"&&articleTitle="+this.serchVal;
            },
            delSearchData() {
                let searchIpt = document.getElementById('searchIpt');
                this.serchVal='';
            }
        }
    }
</script>
<style scoped>
    #policyFilterBox {
        padding-top:3.3rem;
    }
    #filterSearchBox{
        box-sizing: border-box;
        width:100%;
        background-color: #fafafa;
        padding:0.65rem 3%;
        position: fixed;
        top:0;
        left:0;
        z-index: 11;
    }
    .cityFilter {
        float: left;
        width: 18%;;
    }
    .searchBox {
        width: 75%;
        margin-left: 2%;
        float: left;
    }
    .policy-title {
        box-sizing: border-box;
        position: relative;
        margin: 0 0.85rem;
        height: 2rem;
        border-bottom: 1px solid #EBEAF1;
        text-align: left;
        line-height: 2rem;
        font-size: 0.65rem;
    }

    .title {
        display: inline-block;
        vertical-align: middle;
      font-size: 0.75rem;
    }

    .more {
        position: absolute;
        right: 0;
        top: 0;
        text-align: right;
        display: inline-block;
        color: #767676;
        font-size:0.75rem;
    }

    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    .filterSearchBox {
        padding: 0.65rem 0;
    }
    #policySearchBox {
        position: relative;
    }
    #policySearchBox input {
        width: 78%;
        padding: 0.35rem 12% 0.35rem 10%;
        height: 1.1rem;
        line-height: 1.1rem;
        font-size: 0.65rem;
        -webkit-appearance:none;
        border-radius: 0;
    }
    .search_icon {
        position: absolute;
        left: 0.3rem;
        top: 0.45rem;
        background-size:  0.9rem 0.9rem;
        width: 0.9rem;
        height: 0.9rem;
        display: inline-block;
    }
    .searchdel_icon {
        position: absolute;
        right: 0.3rem;
        top:0.45rem;  width: 0.9rem;
        height: 0.9rem;
        display: inline-block;
        font-size: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        color:#cccccc;
    }

    .line{
        display: inline-block;
        width:0.15rem;
        height:0.8rem;
        background: #FF1B43;
        margin-right: 0.3rem;
        vertical-align: middle;
    }
</style>

