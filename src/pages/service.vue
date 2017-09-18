<template>
  <div>
    <div class="all_box all_boxNodown">
      <div class="circle2-head" style="height:8rem;padding-top:0;">
        <div class="Frjbg" style="height:8rem;"><img src="./../images/service/bg_service.png"></div>
      </div>
      <div class="balance" id="serviceStyle">
          <ul>
              <li><a href="javascript:;" @click="pageTurn('service/remindService')"><span class="micon-diver-tab micon-service-remind"></span><p>提醒服务</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('service/birthService')"><span class="micon-diver-tab micon-service-care"></span><p>关怀服务</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('service/appointService')"><span class="micon-diver-tab micon-service-order"></span><p>预约服务</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('service/rescueService')"><span class="micon-diver-tab micon-service-rescue"></span><p>救援服务</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('')"><span class="micon-diver-tab micon-service-maintenance"></span><p>推荐保养</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('service/monitorService')"><span class="micon-diver-tab micon-service-monitoring"></span><p>实时视频监控</p></a></li>
          </ul>
      </div>
    </div>
  </div>
</template>
<style>
  #serviceList li{
    width:45%;
    background-color: #F1F1F1;
    margin:0.4rem;
    border-radius:0.2rem;
  }
  #serviceList li a{
    padding:0.5rem;
  }
  #serviceList li i{
    margin:0rem;
    width:2.0rem;
    height:2.0rem;
  }
  #serviceStyle{
    border-top:0.4rem solid #E7E5E5;
  }
  #serviceStyle ul li{
    width: 33%;
  }
  #serviceStyle ul li a{
    padding: 1.2rem 0.8rem;
  }
  #serviceStyle ul li p{
    padding:0.4rem 0;
  }
</style>
<script>
  import { Group,Cell,Swiper,Scroller,Divider } from 'vux'
  import logoSrc from './../images/epsot_logo.jpg'
  import GLOBALURL from './../utils/global'
  import $ from 'jquery'

  export default{
    name: 'Group',
    data(){
      return{
        groupList:[]
      }
    },
    components:{
      Scroller,
      Cell,
      Group,
      Divider,
      Swiper
    },
    created () {
    },
    methods:{
      // 页面跳转
      pageTurn:function(turnPath,needLogin){
        var userInfo = sessionStorage.getItem("userInfo");
        if(needLogin && !userInfo){
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }else if(turnPath){
          this.$router.replace({path:turnPath})
        }else {
          layer.open({content:'程序猿正在玩命开发中...',skin:'msg',time: 2});
        }
      }
    }
  }
</script>
