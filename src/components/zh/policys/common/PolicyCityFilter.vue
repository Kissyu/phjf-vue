<template>
    <div id="policyCityFilterBox">
        <div class="cityBox"  @click="toggleMaskTag">
            <input :data-val="regionaCode" placeholder="城市" readonly :value="regionaName" class="cityFilIpt"  ref="citySech">
            <span class="el-icon-caret-bottom" :class="{'el-icon-caret-top': maskTag }"></span>
        </div>
        <transition name="fade">
            <div class="mask" @click.self="toggleMaskTag" v-show="maskTag">
                <ul class="cityList">
                    <li v-for="item in cityList" :data-value="item.regionaCode" @click="changeCitySelect(item.regionaCode,item.regionalName)">
                        {{item.regionalName}}
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: 'policyCityFilterBox',
         props:{
            cityList:{
                type: Array,
                required:true
            },
            regionaCode:{
                type: String,
                required:true
            },
             regionaName:{
                 type: String,
                 required:true
             }
        },
        created() {
            this.ready();
        },
        data () {
            return {
                regCode: '',
                regName: '',
                maskTag:false
            }
        },
        watch:{
            regionaCode:function(val){
                this.regCode = val;
            },
            regCode:function(val) {
                this.$emit('getAllIndexData',val); //主动触发方法，val为向父组件传递的数据
            }
        },
        methods:{
            ready(){
                document.addEventListener('click', (e) => {
                    if (!this.$el.contains(e.target)){
                    this.maskTag = false;
                }
            })
            },
            toggleMaskTag() {
                this.maskTag = !this.maskTag;
            },
            changeCitySelect(regionaCode,regionalName) {
                this.regCode = regionaCode;
                this.$refs['citySech'].value = regionalName;
                this.toggleMaskTag();
            }
        }
    }
</script>

<style scoped>
    #policyCityFilterBox {
        position: relative;
        width:100%;
    }
    #policyCityFilterBox .cityFilIpt {
        width: 85%;
        padding-left: 15%;
        height: 1.8rem;
        line-height: 1.8rem;
        background-color: #FAFAFA;
        color:#333333;
        font-size: 0.65rem;
        text-align: left;
        float: left;
        LJM:expression(readOnly=true);
    }
    #policyCityFilterBox .el-icon-caret-bottom {
        position: absolute;
        right: 0.35rem;
        width: 0.75rem;
        height: 0.75rem;
        top: 0.525rem;
        font-size: 0.75rem;
    }
    #policyCityFilterBox .el-select {
        width:100%;
    }
    #policyCityFilterBox .el-input__prefix, .el-input__suffix {
        top: 1.25rem;
        left: 3.4rem;
    }
    .el-popper[x-placement^=bottom]{
        width:98%;
        margin: 0 auto;
    }
    #policyCityFilterBox .el-icon-arrow-up:before {
        color: #333333;
    }
    .el-input__suffix-inner{
        position: relative;
        top:-0.45rem;
        left: 0;
        /*border:1px solid red;*/
    }
    .el-input__icon:before,.el-input__icon:after{
        position: relative;
    }
    .el-input__icon:before{
        top:-0.5rem;
    }
    .mask {
        position: fixed;
        top: 3.1rem;
        left: 0;
        bottom:0;
        z-index: 11;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .cityList {
        width: 100%;
        background-color: #fff;
    }
    .cityList {
        width: 90%;
        line-height: 2.2rem;
        font-size: 0.7rem;
        text-align: left;
        color: #206FF2;
        padding: 0 5%;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .4s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>

