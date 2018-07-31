<template>
    <div id="policyOtherFilterBox" class="clearfix">
        <div class="filerImgBox fl">
            <img :src="filterIconUrl" alt="" class="filter-icon">
        </div>
        <span class="filterSpan" :class="{ 'on-f-chose': maskTag }" @click="changeMask">筛选</span>
        <div class="search-item fl">
            <transition name="fade">
                <div class="mask" @click.self="toggleMask()" v-show="maskTag">
                    <div class="dropDown clearfix">
                        <ul class="fl">
                            <li v-for="(item, index) in options"
                                :class="{'on-i-chose':index==defaultNum1}"
                                :data-path="item.treepath"
                                :data-index="index"
                                ref="filterItem1"
                            @click="toggleChange(1,index,item.treepath,item.parent_st_id)">
                                {{item.name}}
                            </li>
                        </ul>
                        <ul class="fl borBottomeLi" v-show="secondChildren.length">
                            <li  v-for="(item2,index) in secondChildren"
                                 :class="{'on-i-chose':index==defaultNum2}"
                                 :data-path="item2.treepath"
                                 :data-index="index"
                                 ref="filterItem2"
                                 @click="toggleChange(2,index,item2.treepath,item2.parent_st_id)">
                                {{item2.name}}
                            </li>
                        </ul>
                        <ul class="fl borBottomeLi" v-show="thirdChildren.length">
                            <li  v-for="(item3,index) in thirdChildren"
                                 :class="{'on-i-chose':index==defaultNum3}"
                                 :data-path="item3.treepath"
                                 :data-index="index"
                                 ref="filterItem3"
                                 @click="toggleChange(3,index,item3.treepath,item3.parent_st_id)">
                                {{item3.name}}
                            </li>
                        </ul>
                        <ul class="fl noBorr" v-show="forthChildren.length">
                            <li  v-for="(item4 ,index) in forthChildren"
                                 :class="{'on-i-chose':index==defaultNum4}"
                                 :data-path="item4.treepath"
                                 :data-index="index"
                                 ref="filterItem4"
                                 @click="toggleChange(4,index,item4.treepath,item4.parent_st_id)">
                                {{item4.name}}
                            </li>
                        </ul>
                    </div>
                    <div class="filter-btn-box">
                        <span class="filter-del-btn" @click="clearSelect"
                              @touchstart="handleTouchClearStart"
                              @touchend="handleTouchClearEnd"
                              :class="{ 'on-clear-chose': clearTouchTag }">清空</span>
                        <span class="filter-sure-btn" @click="sureSelect"
                              @touchstart="handleTouchSureStart"
                              @touchend="handleTouchSureEnd"
                              :class="{ 'on-sure-chose': sureTouchTag }">确定</span>
                    </div>
                </div>
            </transition>
        </div>

    </div>
</template>
<script>
    import filterIcon from '@/assets/zh/imgs/filter-icon.png'

    export default {
        props: ['searchTerms'],
        name: 'policyOtherFilterBox',
        data () {
            return {
                filterIconUrl:filterIcon,
                options: [],
                selectedOptions: [],
                openFlag:false,
                maskTag:false,
                selectFilter:false,
                secondChildren:[],
                thirdChildren:[],
                forthChildren:[],
                defaultNum1:0,
                defaultNum2:0,
                defaultNum3:0,
                defaultNum4:0,
                clearTouchTag:false,
                sureTouchTag:false
            }
        },
        created() {
            this.ready();
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
            toggleMask() {
                this.toggleMaskTag();

            },
            changeMask() {
                this.toggleMaskTag();
                this.selectFilter = !this.selectFilter;
            },
            toggleChange(num,index,treepath,parent_st_id) {
                if(num == 1) {
                    //如果是第一层
                    this.defaultNum1 = index;
                    this.defaultNum2 = -1;
                    this.defaultNum3 = -1;
                    this.defaultNum4 = -1;
                    this.fitstChildren = !this.fitstChildren;
                    //获取子节点数据
                    if(this.options){
                        for(let i = 0 ; i<this.options.length;i++ ) {
                            let item =this.options[i];
                            if(item.treepath==treepath){
                                if(item.children){
                                    this.secondChildren = item.children;
                                }else {
                                    this.secondChildren = [];
                                    this.thirdChildren = [];
                                    this.forthChildren = [];
                                }
                            }
                        }
                    }
                    //先把之前选中的匹配的第一、二、三、四层清掉
                    this.selectedOptions = [];
                    //将第一层的数据放进去
                    this.selectedOptions.push(treepath);
//                    this.selectedOptions = Array.from(new Set(this.selectedOptions));
                }else if(num == 2) {
                    //先把之前选中的匹配的所有数据清掉
                    this.selectedOptions = [];
                    this.defaultNum2 = index;
                    this.defaultNum3 = -1;
                    this.defaultNum4 = -1;
                    //如果点击的是第二层,先将第一层的数据放进数组内
                    for(let i = 0 ; i<this.options.length;i++ ) {
                        let item =this.options[i];
                        if(item.st_id==parent_st_id){
                            this.defaultNum1 = i;
                            this.selectedOptions.push(item.treepath);
                            this.selectedOptions = Array.from(new Set(this.selectedOptions));
                        }
                    }
                    //然后判断第三层的数据
                    if(this.secondChildren){
                        for(let j = 0 ; j<this.secondChildren.length;j++ ) {
                            let item =this.secondChildren[j];
                            if(item.treepath==treepath){
                                if(item.children){
                                    this.thirdChildren = item.children;
                                }else {
                                    this.thirdChildren = [];
                                    this.forthChildren = [];
                                }
                            }
                        }
                    }
                    //先把之前选中的匹配的第二、三、四层清掉
//                    this.selectedOptions = this.selectedOptions.filter(function(val){
//                        return val!=item.treepath;
//                    });

                    //将第二层的数据放入selections内
                    this.selectedOptions.push(treepath);
                    this.selectedOptions = Array.from(new Set(this.selectedOptions));
                }else if(num == 3) {
                    //先把之前选中的匹配的所有数据清掉
                    this.selectedOptions = [];
                    this.defaultNum3 = index;
                    this.defaultNum4 = -1;
                    //如果点击的是第三层,先将第一、二层的数据放进数组内
                    for(let i = 0 ; i<this.secondChildren.length;i++ ) {
                        let item =this.secondChildren[i];
                        if(item.st_id==parent_st_id){
                            this.defaultNum2 = i;
                            this.selectedOptions.push(item.treepath);
                            this.selectedOptions = Array.from(new Set(this.selectedOptions));
                            for(let j = 0 ; j<this.options.length;j++ ) {
                                let itemsub =this.options[j];
                                if(itemsub.st_id==item.parent_st_id){
                                    this.defaultNum1 = j;
                                    this.selectedOptions.push(itemsub.treepath);
                                    this.selectedOptions = Array.from(new Set(this.selectedOptions));
                                }
                            }
                        }
                    }
                    //然后判断第四层的数据
                    for(let h = 0 ; h<this.thirdChildren.length;h++ ) {
                        let item3 =this.thirdChildren[h];
                        if(item3.treepath==treepath){
                            if(item3.children){
                                this.forthChildren = item3.children;
                            }else {
                                this.forthChildren = [];
                            }
                        }
                    }
                    //将第三层的数据放入selections内
                    this.selectedOptions.push(treepath);
                    this.selectedOptions = Array.from(new Set(this.selectedOptions));
                }else if(num == 4){
                    //先把之前选中的匹配的所有数据清掉
                    this.selectedOptions = [];
                    this.defaultNum4 = index;
                    //如果直接点击的是第四层,先将第一、二、三层的数据放进数组内
                    for(let i = 0 ; i<this.thirdChildren.length;i++){
                        let item3 =this.thirdChildren[i];
                        if(item3.st_id == parent_st_id) {
                            this.defaultNum3 = i;
                            this.selectedOptions.push(item3.treepath);
                            this.selectedOptions = Array.from(new Set(this.selectedOptions));
                            for(let j = 0 ; j<this.secondChildren.length;j++ ) {
                                let itemsub =this.secondChildren[j];
                                if(itemsub.st_id==item3.parent_st_id){
                                    this.defaultNum2 = j;
                                    this.selectedOptions.push(itemsub.treepath);
                                    this.selectedOptions = Array.from(new Set(this.selectedOptions));
                                    for(let h = 0 ; h<this.options.length;h++ ) {
                                        let itemTop =this.options[h];
                                        if(itemTop.st_id==itemsub.parent_st_id){
                                            this.defaultNum1 = h;
                                            this.selectedOptions.push(itemTop.treepath);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //将第四层的数据放入selections内
                    this.selectedOptions.push(treepath);
                    this.selectedOptions = Array.from(new Set(this.selectedOptions));
                }
            },
            clearSelect() {
                this.selectedOptions= [];
                if(this.options) {
                    if(this.options.length>0){
                        if(this.options[0].children) {
                            if(this.options[0].children.length>0) {
                                let a = this.options[0];
                                this.secondChildren = a.children;
                                if(this.secondChildren.length>0) {
                                    if(this.secondChildren[0].children) {
                                        if(this.secondChildren[0].children.length>0){
                                            this.thirdChildren = this.secondChildren[0].children;
                                            if(this.thirdChildren.length>0) {
                                                if(this.thirdChildren[0].children) {
                                                    if(this.thirdChildren[0].children.length>0){
                                                        this.forthChildren = this.thirdChildren[0].children;
                                                    }
                                                }else {
                                                    this.forthChildren = [];
                                                }
                                            }
                                        }
                                    }else {
                                        this.thirdChildren = [];
                                        this.forthChildren = [];
                                    }
                                }
                            }
                        }
                    }
                }
                this.defaultNum1= 0;
                this.defaultNum2= 0;
                this.defaultNum3=-1;
                this.defaultNum4=-1;
            },
            sureSelect() {
                this.changeMask();
                this.$emit('getFilterPolicys',this.selectedOptions);
            },
            handleTouchClearStart() {
                this.clearTouchTag = true;
            },
            handleTouchClearEnd(){
                this.clearTouchTag = false;
            },
            handleTouchSureStart() {
                this.sureTouchTag = true;
            },
            handleTouchSureEnd(){
                this.sureTouchTag = false;
            }
        },
        watch:{
            searchTerms:function(val){
                for(let i = 0;i<val.length;i++) {
                    if(val[i].type=='s'){
                        this.options=val[i].children;
//                        this.fitstChildren=val[i].children;
                        if(this.options) {
                            if(this.options.length>0){
                                if(this.options[0].children) {
                                    if(this.options[0].children.length>0) {
                                        let a = this.options[0];
                                        this.secondChildren = a.children;
                                        if(this.secondChildren.length==0) {
                                            this.defaultNum2 = -1;
                                        }
                                    }
                                }
                            }else {
                                this.secondChildren = [];
                                this.thirdChildren = [];
                                this.forthChildren = [];
                            }
                        }
                        return;
                    }
                }
            },
            secondChildren(val) {
                if(val.length>0) {
                    if(val[0].children) {
                        this.defaultNum2 = 0;
                        if(val[0].children.length>0){
                            this.thirdChildren = val[0].children;
                        }
                    }else {
                        this.defaultNum2 = -1;
                        this.thirdChildren = [];
                        this.forthChildren = [];
                    }
                }
            },
            thirdChildren(val) {
                if(val.length>0) {
                    if(val[0].children) {
                        this.defaultNum3 = 0;
                        if(val[0].children.length>0){
                            this.forthChildren = val[0].children;
                            if(this.forthChildren.length==0) {
                            }
                        }
                    }else {
                        this.forthChildren = [];
                        this.defaultNum3 = -1;
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #policyOtherFilterBox {
        position: relative;
        width: 100%;
        height: 2.2rem;
        background: #fff;
        box-sizing: border-box;
        line-height: 2.2rem;
        text-align: left;
    }
    .filerImgBox {
        width: 20%;
        height: 2.2rem;
        position: relative;
        left: 0.95rem;
    }
    .filter-icon {
        width: 100%;
        height: auto;
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        -webkit-transform: translate(-50%,-50%);
    }
    .search-item {
        color: #333333;
        font-size: 0.75rem;
        width: 70%;
        padding-left: 1.5%;
        text-align: center;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .4s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .mask {
        position: fixed;
        top: 5.33rem;
        left: 0;
        bottom:0;
        z-index: 11;
        width: 100%;
        background: rgba(0, 0, 0, 0.3);
    }
    .dropDown {
        border-top: 1px solid #DCE2EE;
        width: 100%;
        height: 14.2rem;
        background: #fff;
    }
    .dropDown ul {
        height: 14.2rem;
        border-right: 1px solid #DCE2EE;
        /*border-left: 1px solid #DCE2EE;*/
    }
    .dropDown:first-child {
          border-left: 0;
      }
    .dropDown .noBorr {
        border-right: 0;
    }
    .borBottomeLi li {
        border-bottom: 1px solid #DCE2EE;
    }
    .dropDown li {
        padding: 0 0.96rem;
        font-size: 0.75rem;
        color: #333333;
        line-height:2.2rem;
    }
    .filterSpan {
        display: inline-block;
        width: 70%;
        padding: 0 5%;
        font-size: 0.75rem;
        color: #333333;
        line-height: 2.2rem;
        text-align: center;
    }
    .on-f-chose {
        color: #206FF2;
    }
    .dropDown .on-i-chose {
        color: #206FF2;
    }
    .filter-btn-box {
        width: 100%;
        border-top: 1px solid #DCE2EE;
    }
    .filter-btn-box span {
        width: 50%;
        display: block;
        float: left;
        font-size: 0.82rem;
        height: 2.4rem;
        line-height: 2.4rem;
        text-align: center;
    }
    .filter-del-btn {
        background-color: #fff;
        color: #333333;
    }
    .filter-sure-btn {
        background-color: #FB5959;
        color: #ffffff;
    }
    .on-clear-chose {
        background-color: #dddddd;
    }
    .on-sure-chose {
        background-color: #FB6060;
    }
</style>

