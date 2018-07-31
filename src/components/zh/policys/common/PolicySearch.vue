<template>
    <div id="policySearchBox">
        <input type="text" placeholder="搜索" id="searchIpt" :value="articleTitle" @keyup.enter="loadSearchData">
        <i class="search_icon" :style ="searchIcon" @click="loadSearchData"></i>
        <i class="el-icon-iconName el-icon-error searchdel_icon" @click="delSearData"></i>
    </div>
</template>
<script>
    export default {
        name: 'policySearchBox',
        props:['articleTitle'],
        data () {
            return {
                searchIcon:{
                    backgroundImage: "url(" + require("../../../../assets/zh/imgs/search_icon.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition:"cover"
                }
            }
        },
        methods:{
            loadSearchData() {
                let title = document.querySelector("#searchIpt").value;
                if(!title) {
                    /*this.$alert('搜索内容不能为空','', {
                                confirmButtonText: '确定',
                                center:true,
                                callback: action => {}
                    });
                    return false;*/
                    title = "";
                }
                this.$emit('loadSearchData',title); //主动触发方法，val为向父组件传递的数据
            },
            delSearData(){
                let ipt = document.getElementById('searchIpt');
                ipt.value="";
            }
        }
    }
</script>

<style>
    #policySearchBox {
        position: relative;
    }
    #policySearchBox input {
        width: 89%;
        padding: 0.35rem 1% 0.35rem 10%;
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
    .el-message-box {
        width: 100%;
        margin-top: 40%;
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
</style>

