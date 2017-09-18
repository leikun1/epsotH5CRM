<template>
<div>
  <header>
      <div class="header">
          <h1>预约服务</h1>
          <router-link slot="left" to="/home?modelIndex=2" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div>
    <!-- tab nav -->
    <scroller lock-y :scrollbar-x='false' ref="scroller" style="border-top:0.4rem solid #E7E5E5;">
       <tab :line-width=2 active-color='#06C1AE' v-model="tabindex">
         <tab-item @click.native="tabToggle(tabindex)" class="vux-center" :selected="tabName === item" v-for="(item, tabindex) in tabList" @click="tabName = item" :key="tabindex">{{item}}</tab-item>
       </tab>
     </scroller>

    <div>
       <div class="all_box groupList" id="remindList">
         <div id="nodata"><a class="imgconfig"></a><span class="textconfig">暂无数据</span></div>
       </div>
    </div>
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'
  import { Tab, TabItem, Scroller } from 'vux'
  const tabList = () => ['全部', '已处理', '未处理']
  let merchantspk = "";

  export default{
    name: 'AppointService',
    components: {
      Tab,
      TabItem,
      Scroller
    },
    data(){
      return{
        tabList: tabList(),
        tabName:"",
        tabindex:0,
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        merchantspk = userInfo.merchantspk;
        this.initAppointList(merchantspk);
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      tabToggle:function(tabindex){
        $("#remindList .card_ecchange").hide();
        if(tabindex == 0){
          $("#remindList .card_ecchange").show();
        }else{
          $("#remindList .card_ecchange[data-status="+tabindex+"]").show();
        }
      },
      // 初始预约列表
      initAppointList:function(merchantspk){
      	var loading = layer.open({type: 2});
        var tabindex = this.tabindex;
      	var params = {
      		"merchantsPk":merchantspk,
      		"userPk":"",
      		"appointmentStatus":"",
      		"appointmentType":"",
          "beginTime":"",
          "endTime":"",
          "beginNum":0,
          "queryNum":10
      	};
       	$.post(GLOBALURL.LIST_QUERYAPPOINTLIST_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      			if(result && result.length > 0){
      				for(var i=0;i<result.length;i++){
                var appointStatus = result[i].carmappointmentstatus;
                var statusValue = "1"
                if(appointStatus == "0"){
                  appointStatus = "预约未到";
                  statusValue = "2";
                }else if(appointStatus == "1"){
                  appointStatus = "预约迟到";
                  statusValue = "1";
                }else{
                  appointStatus = "预约已到";
                  statusValue = "1";
                }
                var appointType = result[i].carmappointmenttype;
                if(appointType == "0"){
                  appointType = "维修预约";
                }else if(appointType == "1"){
                  appointType = "保养预约";
                }else if(appointType == "2"){
                  appointType = "安装预约";
                }else{
                  appointType = "维修预约";
                }

                html += "<div class=\"card_ecchange plus-pass\" style=\"height:6.5rem;display:none;\" data-status="+statusValue+">";
                html += "	<i class=\"images_card\"><img src="+logoSrc+" style=\"width:2.8rem;height:2.8rem;\"></i>";
                // html += "	<span style=\"margin-top:-.05rem\"><a class=\"btn cy-btn btn-red doRemind\" data-pk="+result[i].driverUserPK+" data-name="+result[i].drivingLisenceOwner+">提醒</a></span>";
                html += "	<h1>"+result[i].carmappointmentusername+"</h1>";
                html += "	<p style=\"margin-top:0.4rem\"><small style=\"fon t-size:0.75rem;\">"+(result[i].carmappointmentremarks?result[i].carmappointmentremarks:"--")+"</small><small style=\"font-size:0.75rem;float:right;margin-right:1rem;\">"+(result[i].carmappointmentbrandpk?result[i].carmappointmentbrandpk:"--")+"</small></p>";
                html += "	<p style=\"margin:0.6rem 0.6rem 0;font-size:0.7rem;color:#888;padding-left:0;\"><strong style=\"margin-right:3.5rem;\">预约类型：<b style=\"color:#06C1AE;\">"+appointType+"</b></strong><strong>预约状态：<b style=\"color:#06C1AE;\">"+appointStatus+"</b></strong></p>";
                html += "	<p style=\"margin:0.2rem 0.6rem 0;font-size:0.7rem;color:#888;padding-left:0;\"><strong style=\"margin-right:0.8rem;\">预约时间：<b style=\"color:#06C1AE;\">"+(result[i].carmappointmentbegintime?result[i].carmappointmentbegintime:"--")+"</b></strong></p>";
                html += "	<p style=\"margin:0.2rem 0.6rem 0;font-size:0.7rem;color:#888;padding-left:0;\"><strong style=\"margin-right:0.8rem;\">添加时间："+result[i].carmappointmentaddtime+"</strong></p>";
                html += "</div>";
      				}
      		   }
      		   $("#remindList").html(html);
             if(tabindex == 0){
               $("#remindList .card_ecchange").show();
             }else{
               $("#remindList .card_ecchange[data-status="+tabindex+"]").show();
             }
      		}else if(data.statusCode == -999){
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
       	});
      },
    }
}
</script>
