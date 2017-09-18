<template>
  <div>
    <div class="all_box all_boxNodown">
      <div class="circle2-head" style="height:8rem;padding-top:0;">
        <div class="Frjbg" style="height:8rem;"><img src="./../images/main/background.png"></div>
        <div></div>
      </div>
      <div class="balance" id="showRemindStyle">
          <div class="dynamic-list-head mainList"><em class="micon-index-remind"></em>提醒服务<b @click="pageTurn('service/remindService')"><span class="icon-angle-right"></span><span>更多</span></b></div>
          <ul  class="greenStyle">
              <li><a href="javascript:;" @click="pageTurn('service/remindInfo?remindType=0')"><span>0</span><p>保养提醒</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('service/remindInfo?remindType=2')"><span>0</span><p>年检提醒</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('service/remindInfo?remindType=4')"><span>0</span><p>故障提醒</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('service/appointService')"><span>0</span><p>预约服务</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('')"><span>0</span><p>保养推荐</p></a></li>
              <li><a href="javascript:;" @click="pageTurn('promote/adsinfo')"><span>0</span><p>广告发布</p></a></li>
          </ul>
      </div>

      <div class="balance" id="showRateStyle" style="margin-bottom:4.5rem;">
          <div class="dynamic-list-head mainList" style="color:#F4864D;"><em class="micon-index-statistical"></em>本月数据统计<span style="color:#A9A9A9;">2017-05</span></div>
          <ul class="rateStyle">
              <li><a href="javascript:;">
                <div style='width:100px;height:100px;'>
                  <x-circle :percent="driverGrowthRate" :stroke-width="15" :trail-width="15" :stroke-color="strokeColor1" trail-color="#ececec">
                    <span :style="{color: strokeColor1}">{{driverGrowthRate}}%</span>
                  </x-circle>
                </div>
                <p>车主增长率</p></a></li>
              <li><a href="javascript:;">
                <div style='width:100px;height:100px;'>
                  <x-circle :percent="orderGrowthRate" :stroke-width="15" :trail-width="15" :stroke-color="strokeColor2" trail-color="#ececec">
                    <span :style="{color: strokeColor2}">{{orderGrowthRate}}%</span>
                  </x-circle>
                </div>
                <p>订单增长率</p></a></li>
              <li><a href="javascript:;">
                <div style='width:100px;height:100px;'>
                  <x-circle :percent="appointGrowthRate" :stroke-width="15" :trail-width="15" :stroke-color="strokeColor3" trail-color="#ececec">
                    <span :style="{color: strokeColor3}">{{appointGrowthRate}}%</span>
                  </x-circle>
                </div>
                <p>预约增长率</p></a></li>
          </ul>
          <ul class="yellowStyle">
              <li><a href="javascript:;"><span>0</span><p>总服务数</p></a></li>
              <li><a href="javascript:;"><span>0</span><p>新增顾客</p></a></li>
              <li><a href="javascript:;"><span>0</span><p>新增订单</p></a></li>
              <li><a href="javascript:;"><span>0</span><p>救援服务</p></a></li>
              <li><a href="javascript:;"><span>0</span><p>咨询服务</p></a></li>
              <li><a href="javascript:;"><span>0</span><p>关怀服务</p></a></li>
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
  .mainList em{
    vertical-align: middle;
    margin: 0.2rem 0.4rem;
    width:1.3rem;
    height:1.3rem;
    display: inline-block;
  }
  .mainList span{
    float:right;
    line-height:2rem;
    margin: 0 0.2rem;
    color:#333;
    font-size: 0.75rem;
  }
  #showRemindStyle{
    border-top:0.4rem solid #E7E5E5;
    height: 10rem;
  }
  #showRemindStyle li{
    width:33%;
  }
  #showRateStyle{
    border-top:0.4rem solid #E7E5E5;
    height: 15.5rem;
  }
  #showRateStyle li{
    width:33%;
  }
  #showRateStyle .rateStyle li{
    border-right: 0;
  }
  .greenStyle span{
    color:#06c1ae;
    font-size: 0.9rem;
  }
  .yellowStyle span{
    color:#F4864D;
    font-size: 0.85rem;
  }
</style>
<script>
  import { Group,Cell,Swiper,Scroller,Divider,XCircle, Range, Icon } from 'vux'
  import logoSrc from './../images/epsot_logo.jpg'
  import GLOBALURL from './../utils/global'
  import $ from 'jquery'

  export default{
    name: 'Group',
    data(){
      return{
        driverGrowthRate:0,
        orderGrowthRate:0,
        appointGrowthRate:0,
        strokeColor1:"#F07E43",
        strokeColor2:"#A3DD08",
        strokeColor3:"#FFC410",
      }
    },
    components:{
      Scroller,
      Cell,
      Group,
      Divider,
      Swiper,
      XCircle,
      Range,
      Icon
    },
    created () {
      let userInfo = sessionStorage.getItem("userInfo");
      let merchantspk = "";
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        merchantspk = userInfo.merchantspk;
        this.getRemindInfo(merchantspk);
        this.getStatisticsInfo(merchantspk);
      }
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
      },
      getRemindInfo:function(merchantspk){
        $.post(GLOBALURL.INFO_REMINDINFO_URL,{"merchantspk":merchantspk},function(data){
              if(data.statusCode == 0){
                var result = data.value;
                $(".greenStyle span:eq(0)").text(result.maintenanceNum);
                $(".greenStyle span:eq(1)").text(result.verificationNum);
                $(".greenStyle span:eq(2)").text(result.faultNum);
                $(".greenStyle span:eq(3)").text(result.appointmentNum);
                $(".greenStyle span:eq(4)").text(result.insuranceNum);
                $(".greenStyle span:eq(5)").text(result.adsNum);
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
          },"json");
      },
      getStatisticsInfo:function(merchantspk){
        let initRateData = this.initRateData;
        $.post(GLOBALURL.INFO_STATISTICS_URL,{"merchantspk":merchantspk},function(data){
              if(data.statusCode == 0){
                var result = data.value;
                $(".yellowStyle span:eq(0)").text(result.totalServiceNum);
                $(".yellowStyle span:eq(1)").text(result.newDriverNum);
                $(".yellowStyle span:eq(2)").text(result.newOrderNum);
                $(".yellowStyle span:eq(3)").text(result.newRescueNum);
                $(".yellowStyle span:eq(4)").text(result.newAppointmentNum);
                $(".yellowStyle span:eq(5)").text(result.newCarefulNum);
                let appointGrowthRate = result.appointGrowthRate.replace("%","");
                let driverGrowthRate = result.driverGrowthRate.replace("%","");
                let orderGrowthRate = result.orderGrowthRate.replace("%","");
                initRateData(appointGrowthRate,driverGrowthRate,orderGrowthRate);
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
          },"json");
      },
      initRateData:function(appointGrowthRate,driverGrowthRate,orderGrowthRate){
         this.appointGrowthRate = Number(appointGrowthRate);
         this.driverGrowthRate = Number(driverGrowthRate);
         this.orderGrowthRate = Number(orderGrowthRate);
      }

    }
  }
</script>
