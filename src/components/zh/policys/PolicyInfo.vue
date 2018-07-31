<template>
    <div id="policyInfoBox">
        <div class="mainContent">
            <div class="newsTitle">
                <h5>{{title}}</h5>
                <div class="sourceInfo">
                    <span v-show="source">来源:{{source}}</span>
                    <span v-show="publish_date" class="tagShow">{{publish_date}}</span>
                </div>
            </div>
            <div class="contentBox" v-html="content">
                {{content}}
            </div>
            <div v-show="source_url" class="seeResource">
                <a  target="_blank" :href="source_url" >查看原文</a>
            </div>
        </div>
    </div>
</template>

<script>
//    import TitleBar from '../common/TitleBar';
    import axios from 'axios';
    export default {
        name: 'policyInfoBox',
        components:{
//            'title-bar': TitleBar
        },
        data () {
            return {
                language:'ZH_SIMP',
                article_code:'',
                title:'',
                source:'',
                source_url:'',
                publish_date:'',
                content:''
            }
        },
        mounted(){
            this.articleCode = this.$route.query.articleCode;
            this.language = this.$route.query.language;
            var url_dev = "/api";
            var url_build = "";
            axios({
                method: 'get',
                headers: {
                    'content-type': 'application/jsonp'
                },
                url: url_build+'/phjf/api/v1/benefitPolicy/getPolicy',
                params:{
                    articleCode:this.articleCode,
                    language:this.language
                }
            }).then((res) =>{
                if(res.data.code == 1){
                    let data = res.data.data;
                    this.title = data.title;
                    this.content = data.content;
                    this.publish_date = data.publish_date;
                    this.source_url = data.source_url;
                    this.source = data.source;
                console.log(this.source_url);
                }
            })
        }
    }
</script>
<style scoped>
    .mainContent{
        padding:0.3rem 3% 0;
        width: 94%;
    }
    .newsTitle{
        padding:0.3rem 0;
        width:100%;
    }
    .newsTitle h5{
        width: 100%;
        color: #333333;
        font-size:1.2rem;
        text-align: left;
        line-height: 1.6rem;
    }
    .sourceInfo{
        color: #6d758f;
        font-size:0.7rem;
        line-height: 1.2rem;
        padding-top:0.5rem;
        text-align: left;
    }
    .sourceInfo span {
        margin-right:0.36rem;
    }
    .sourceInfo .tagShow {
        padding-right:0.3rem;
    }
    .sourceInfo .tagSize {
        font-size: 0.6rem;
    }
    .sourceInfo .tagCorRed {
        color: #dc655f;
    }
    .sourceInfo .tagCorBlue {
        color: #325bf4;
    }
    .contentBox{
        text-indent: 2em;
        text-align: left;
        padding-top: 1.2rem;
        color: #343434;
        font-size:0.84rem !important;
        line-height:1.5rem;
    }
    .contentBox img{
        /*width: 90%;*/
        display: block;
    }
    .seeResource {
        padding:0.5rem 0;
        text-align: left;
    }
    .seeResource a {
        color:#999999;
        text-decoration: none;
        font-size: 0.72rem;
    }
</style>

