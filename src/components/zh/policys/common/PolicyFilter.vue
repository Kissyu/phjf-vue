<template>
  <div id="policyFilterBox">
    <div class="search-item"
         v-show=" item.type == 'c' "
         v-for="(item, index) in searchTerms"
         :change-on-select="true"
         @click.self="tab(index)"
         :class="{active:index == num,'removeActive':removeActive}"
    >
      {{item.name}}
      <transition name="fade">
        <div class="mask" :indeterminate="isIndeterminate" v-show="index == num && isActive[index]" @click.self="isToggle(index)">
          <div class="dropDown">
            <el-checkbox class="allOther" v-model="checkAll[index]" @change="handleCheckAllChange">全部</el-checkbox>
            <el-checkbox-group class="checkbox-group" v-model="checkedCities[index]" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="itemChild in item.children" :label="itemChild.search_code" :key="itemChild.search_code">
                {{itemChild.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['searchTerms'],
    name: 'policyFilterBox',
    data() {
      return {
        checkAll: [false,false,false],
        checkedCities: [[],[],[],[]],
        cities: [[],[],[],[]],
        isIndeterminate: true,
        num: -1,
        isActive: [false,false,false],
        removeActive:false
      }
    },
    created() {
      this.ready();
    },
    methods: {
      ready(){
        document.addEventListener('click', (e) => {
          if (!this.$el.contains(e.target)){
            var fArr=this.isActive;
            fArr.forEach(function(item,index){
              if(item == true){
                fArr[index] = false;
              }
            });
            this.removeActive=true;
            this.isActive = fArr;
            this.isToggle();
          }
        })
      },
      changeOptions(index){//显示下拉列表
        this.removeActive=false;
        const cityOptions= [];
        this.searchTerms[index].children.forEach(function(item){
          cityOptions.push(item.search_code);
        });
        this.cities[index] = cityOptions;
      },
      isToggle(index){//隐藏显示
        this.isActive.forEach((item, key) => {
          if(key===index){
            this.$set(this.isActive, index , !this.isActive[index]);
          }else{
            this.$set(this.isActive, key, false);
          }
        })
      },
      tab(index) {//切换
        this.changeOptions(index);
        this.num = index;
        this.isToggle(index);
        if(this.checkedCities[index].length == this.cities[this.num].length){
          this.checkAll[this.num] = true;
          this.isIndeterminate=false;

        }else if(this.checkedCities[index].length < this.cities[this.num].length){
          this.checkAll[this.num] = false;
          this.isIndeterminate=true;
        }
      },
      getPolicyFilter(){//给父组件传参
        const arr=[];
        this.checkedCities.forEach(function(item,index){
          if(item.length !== 0){
            arr.push(item)
          }
        });
        for(var i = 0; i < this.cities.length; i++){
          for(var j = 0; j < arr.length; j++){
            if(JSON.stringify(arr[j])==JSON.stringify(this.cities[i])){
              arr.splice(arr.indexOf(arr[j]),1);
            }
          }
        }
        console.log(arr);
        this.$emit("getFilter",arr);
      },
      handleCheckAllChange(val) {
        this.checkedCities[this.num] = val ? this.cities[this.num] : [];
        this.isIndeterminate = false;
        this.getPolicyFilter();
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll[this.num] = checkedCount === this.cities[this.num].length;
        if(checkedCount > 0 && checkedCount < this.cities[this.num].length){
          this.isIndeterminate=true;
        }else{
          this.isIndeterminate=false;
        }
        this.getPolicyFilter();
      }
    }
  }
</script>

<style scoped>
  #policyFilterBox {
    position: relative;
    width: 100%;
    height: 2.2rem;
    background: #fff;
    box-sizing: border-box;
    line-height: 2.2rem;
    text-align: left;
  }

  .search-item {
    float: left;
    color: #333333;
    font-size: 0.75rem;
    width: 33.33%;
    text-align: center;
  }

  .active {
    color: #206FF2;
  }
  .removeActive{
    color: #333333;
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
    position: absolute;
    top: 0rem;
    left: 0;
    z-index: 111;
    width: 100%;
    background: #fff;
    text-align: left;
  }
  .checkbox-group{
    display: initial;
  }
  .el-checkbox {
    box-sizing: border-box;
    width: 40%;
    display: inline-block;
    margin-left: 0;
    padding-left: 12%;
    text-align: left;
    padding-right: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  .allOther{margin-right: -4px;}
</style>

