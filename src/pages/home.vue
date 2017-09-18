<template>
  <div>
    <app-header :model-name="modelName" v-on:toggle="sideToggle" v-show="showStatus"></app-header>
    <!-- <transition-group name="model" > -->
    <div v-show="modelIndex == 0"><model-main ref="main"></model-main></div>
    <div v-show="modelIndex == 1"><model-driver ref="driver"></model-driver></div>
    <div v-show="modelIndex == 2"><model-service ref="service"></model-service></div>
    <div v-show="modelIndex == 3"><model-promote ref="promote"></model-promote></div>
    <div v-show="modelIndex == 4"><model-report ref="report"></model-report></div>
    <!-- </transition-group> -->
    <app-footer v-on:toggle="pageToggle"></app-footer>
    <transition name="fold" >
      <app-toggle v-show="isShow"></app-toggle>
    </transition>
    <div v-show="isShow" @click="isShow = !isShow" lang="ay"data-simplersidebar="mask" style="position: fixed; top: 0px; right: 0px; bottom: 0px; left: 0px; z-index: 2999; background-color: black; opacity: 0.5; display: block;"></div>
  </div>
</template>

<script>
  import AppHeader from '../components/common/header'
  import AppFooter from '../components/common/footer'
  import AppToggle from '../components/common/toggle'
  import ModelMain from './main'
  import ModelDriver from './driver'
  import ModelService from './service'
  import ModelPromote from './promote'
  import ModelReport from './report'
  import GLOBALURL from '../utils/global'
  import $ from 'jquery'
  import { initLoginStatus } from '../utils/utils'

  export default {
    components: {
      AppHeader,
      AppFooter,
      AppToggle,
      ModelMain,
      ModelDriver,
      ModelService,
      ModelPromote,
      ModelReport
    },
    data () {
      return {
        modelIndex:0,
        modelName:"主页",
        isShow:false,
        showStatus:true
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(!userInfo) {
        this.$router.replace({ path: '/' });
      }
      this.modelIndex = this.$route.query.modelIndex?this.$route.query.modelIndex:0;
      this.showStatus = true;
      if(this.modelIndex == 0){
        this.modelName = "首页";
        this.showStatus = false;
      }else if(this.modelIndex == 1){
        this.modelName = "车主";
      }else if(this.modelIndex == 2){
        this.modelName = "服务";
      }else if(this.modelIndex == 3){
        this.modelName = "推广";
      }else if(this.modelIndex == 4){
        this.modelName = "统计";
      }
      initLoginStatus(); // 初始化登录信息
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    mounted(){
      var modelIndex = this.modelIndex;
      $("#footerTab .nav-tab-item").removeClass("nav-active");
      $("#footerTab .nav-tab-item:eq("+modelIndex+")").addClass("nav-active");
      $("#footerTab .micon-main-tab").removeClass("active");
      $("#footerTab .micon-main-tab:eq("+modelIndex+")").addClass("active");
      if(modelIndex == 0){
      }else if(modelIndex == 1){
        this.$refs.driver.initOBDDriverList();
      }else if(modelIndex == 2){
      }else if(modelIndex == 3){
      }else{
      }
    },
    methods:{
      pageToggle: function (modelIndex,modelName) {
        this.modelIndex = modelIndex;
        this.modelName = modelName;
        this.showStatus = true;
        if(modelIndex == 0){
          this.showStatus = false;
        }else if(modelIndex == 1){
        }else if(modelIndex == 2){
        }else if(modelIndex == 3){
        }else if(modelIndex == 4){
          this.$refs.report.tabToggle(0);
        }
      },
      sideToggle: function () {
        this.isShow = true;
      }
    }
  }
</script>

<style>
.fold-enter-active {
animation-name: fold-in;
animation-duration: .6s;
}
.fold-leave-active {
animation-name: fold-out;
animation-duration: .6s;
}
@keyframes fold-in {
0% {
  transform: translate3d(100%, 0, 0);
}
100% {
  transform: translate3d(0, 0, 0);
}
}
@keyframes fold-out {
0% {
  transform: translate3d(0, 0, 0);
}
100% {
  transform: translate3d(100%, 0, 0);
}
}

/**
* vue-router transition
*/
.model-enter-active {
animation-name: fold-in;
animation-duration: .6s;
}
.model-leave-active {
animation-name: fold-out;
animation-duration: .6s;
}
@keyframes model-in {
0% {
  transform: translate3d(100%, 0, 0);
}
100% {
  transform: translate3d(0, 0, 0);
}
}
@keyframes model-out {
0% {
  transform: translate3d(0, 0, 0);
}
100% {
  transform: translate3d(100%, 0, 0);
}
}
</style>
