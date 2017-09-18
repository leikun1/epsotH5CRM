<template>
<div>
  <header>
      <div class="header">
          <h1>{{remindTypeName}}</h1>
          <router-link slot="left" to="../service/remindService" class="return" ><i class="icon-chevron-left"></i></router-link>
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
     <div class="all_box groupList" id="remindList">
       <div id="nodata"><a class="imgconfig"></a><span class="textconfig">暂无数据</span></div>
     </div>
  </div>
  <!--消息提醒-->
  <div class="comment-module remindSend" hidden="hidden">
    <div class="kuang" style="top:5.2rem;">
      <div class="comment-h" style="background-color: #06c1ae;">
        <i class="icon-remove close" @click="closeDialog()"></i>
        <p>{{remindTypeName}}</p>
      </div>
      <div class="comment-con">
        <form method="get">
          <input type="hidden" class="driverpk">
          <p style="margin-left:0.8rem;"><em class="lineStyle"></em><span>接收车主</span></p>
          <div class="firmIntro-box">
             <input type="text" class="receiver" style="padding:0.2rem 0.4rem;" disabled="true">
          </div>
          <p style="margin-left:0.8rem;"><em class="lineStyle"></em><span>消息类型</span></p>
          <div class="firmIntro-box">
             <input type="text" class="msgType" style="padding:0.2rem 0.4rem;" value="提示消息" disabled="true">
          </div>
          <p style="margin-left:0.8rem;"><em class="lineStyle"></em><span>消息内容</span></p>
          <div class="firmIntro-box">
            <textarea rows="4" placeholder="在这里输入消息内容" class="msgContent" style="padding:0.2rem 0.4rem;"></textarea>
          </div>
          <a href="javascript:;" class="btn btn-max submitUpdate" style="margin:.5rem 0;background-color:#06C1AE;" @click="submitRemind()">发送</a>
        </form>
      </div>
    </div>
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import { Tab, TabItem, Swiper, SwiperItem,Scroller,Datetime } from 'vux'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'
  const tabList = () => ['全部', '已提醒', '未提醒']

  let merchantspk = "";
  export default{
    name: 'RemindInfo',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Scroller,
      Datetime
    },
    data(){
      return{
        remindTypeName:"保养提醒",
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
        let remindType = this.$route.query.remindType;
        if(remindType == "0"){
          this.remindTypeName = "保养提醒";
          this.initMaintainList(merchantspk);
        }else if(remindType == "1"){
          this.remindTypeName = "保险提醒";
          this.initInsuranceList(merchantspk);
        }else if(remindType == "2"){
          this.remindTypeName = "年检提醒";
          this.initCheckList(merchantspk);
        }else if(remindType == "3"){
          this.remindTypeName = "健康提醒";
          this.initHealthList(merchantspk);
        }else if(remindType == "4"){
          this.remindTypeName = "故障提醒";
          this.initTrobleList(merchantspk);
        }
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      tabToggle:function(tabIndex){

      },
      // 点击关闭
      closeDialog:function(){
        $(".comment-module").hide();
      },
      submitRemind:function(){
        var msgContent = $(".msgContent").val();
        var driverpk =  $(".driverpk").val();
        if(msgContent == ""){
          layer.open({content:'消息内容不能为空',skin:'msg',time: 2});
        }else if(msgContent.length > 200){
          layer.open({content:'消息内容不能超过200个字符',skin:'msg',time: 2});
        }else{
          var params = {
            "noticeSenderpk":merchantspk,
            "noticeReceiverpk":driverpk,
            "noticeContent":msgContent,
            "noticeType":"0",
            "noticeReceiverType":"0",
            "noticeBeginTime":"",
            "noticeEndTime":"",
            "platform":"3"
          };
          var loading = layer.open({type: 2});
          $.post(GLOBALURL.ADD_ADDNOTICEMSG_URL,params,function(data){
            if(data.statusCode == 0){
              layer.open({content:data.message,skin: 'msg',time: 2});
              $(".remindSend input").val("");
              $(".comment-module").hide();
            }else if(data.statusCode == -999){
            }else{
              layer.open({content:data.message,skin: 'msg',time: 2});
            }
            // 等待层
            setTimeout(function(){
              layer.close(loading);
            },200);
          },"json");
        }
      },
      // 初始保养提醒列表
      initMaintainList:function(merchantspk){
      	var loading = layer.open({type: 2});
      	var params = {
      		"merchantsPK":merchantspk,
      		"driverUserpk":"",
      		"driverName":"",
      		"carModel":"",
          "beginNum":0,
          "queryNum":10
      	};
       	$.post(GLOBALURL.LIST_QUERYMAINTAINLIST_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      			if(result && result.length > 0){
      				for(var i=0;i<result.length;i++){
                html += "<div class=\"card_ecchange plus-pass\" style=\"height:4.8rem;\">";
                html += "	<i class=\"images_card\"><img src="+logoSrc+" style=\"width:3rem;height:3rem;\"></i>";
                html += "	<span style=\"margin-top:-.05rem\"><a class=\"btn cy-btn btn-red doRemind\" data-pk="+result[i].driverUserPK+" data-name="+result[i].drivingLisenceOwner+">提醒</a></span>";
                html += "	<h1>"+result[i].drivingLisenceOwner+"</h1>";
                html += "	<p style=\"margin-top:0.4rem\"><small style=\"font-size:0.75rem;\">"+(result[i].carsPlateNum?result[i].carsPlateNum:"--")+"</small><small style=\"font-size:0.75rem;float:right;margin-right:1rem;\">"+(result[i].drivingLisenceModel?result[i].drivingLisenceModel:"--")+"</small></p>";
                html += "	<p style=\"margin:0.8rem 0 0 3rem;font-size:0.7rem;color:#6D6D6D;padding-left:0;\"><strong><i class=\"micon-service-icon micon-service-mileage\"></i>"+result[i].carsMileageNum+"km</strong><strong style=\"float:right;margin-right:1rem;\"><i class=\"micon-service-icon micon-service-days\"></i>"+result[i].driveDays+"天</strong></p>";
                html += "</div>";
      				}
      		   }
      		   $("#remindList").html(html);
      		   $("#remindList .doRemind").click(function(){
               $(".driverpk").val($(this).attr("data-pk"));
               $(".receiver").val($(this).attr("data-name"));
               $(".msgContent").val("保养提醒：亲爱的巨能车主用户，您的爱车到了建议保养里程范围，建议您对您的爱车进行保养。祝您旅途愉快！");
               $(".remindSend").show();
      		   });
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
      // 初始保险提醒列表
      initInsuranceList:function(merchantspk){
        var loading = layer.open({type: 2});
        var params = {
          "merchantsPK":merchantspk,
          "driverName":"",
          "carModel":"",
          "beginNum":0,
          "queryNum":10
        };
        $.post(GLOBALURL.LIST_QUERYINSURANCELIST_URL,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            var html = "";
            if(result && result.length > 0){
              for(var i=0;i<result.length;i++){
                html += "<div class=\"card_ecchange plus-pass\" style=\"height:4.8rem;\">";
                html += "	<i class=\"images_card\"><img src="+logoSrc+" style=\"width:2.8rem;height:2.8rem;\"></i>";
                html += "	<span style=\"margin-top:-.05rem\"><a class=\"btn cy-btn btn-red doRemind\" data-pk="+result[i].insuranceUserPK+" data-name="+result[i].drivingLisenceOwner+">提醒</a></span>";
                html += "	<h1>"+result[i].drivingLisenceOwner+"</h1>";
                html += "	<p style=\"margin-top:0.4rem\"><small style=\"font-size:0.75rem;\">"+(result[i].insuranceCardPlateNo?result[i].insuranceCardPlateNo:"--")+"</small><small style=\"font-size:0.75rem;float:right;margin-right:1rem;\">"+(result[i].drivingLisenceModel?result[i].drivingLisenceModel:"--")+"</small></p>";
                html += "	<p style=\"margin:0.8rem 0 0 0;font-size:0.7rem;color:#6D6D6D;padding-left:0;\"><strong><i class=\"micon-service-icon micon-service-limit\"></i>"+(result[i].insuranceCardBeginTime?result[i].insuranceCardBeginTime:"--")+"至"+(result[i].insuranceCardEndTime?result[i].insuranceCardEndTime:"--")+"</strong><strong style=\"float:right;margin-right:1rem;\"><i class=\"micon-service-icon micon-service-companyname\"></i>"+(result[i].insuranceCardCompany?result[i].insuranceCardCompany:"--")+"</strong></p>";
                html += "</div>";
              }
             }
             $("#remindList").html(html);
             $("#remindList .doRemind").click(function(){
               $(".driverpk").val($(this).attr("data-pk"));
               $(".receiver").val($(this).attr("data-name"));
               $(".msgContent").val("续保提醒：亲爱的巨能车主用户，您的爱车保险快要到期了，请您尽快对您爱车进行续保。祝您旅途愉快！");
               $(".remindSend").show();
             });
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
      // 初始年审提醒列表
      initCheckList:function(merchantspk){
        var loading = layer.open({type: 2});
        var params = {
          "merchantsPK":merchantspk,
          "driverUserpk":"",
          "driverName":"",
          "carModel":"",
          "beginNum":0,
          "queryNum":10
        };
        $.post(GLOBALURL.LIST_QUERYVERIFYLIST_URL,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            var html = "";
            if(result && result.length > 0){
              for(var i=0;i<result.length;i++){
                html += "<div class=\"card_ecchange plus-pass\" style=\"height:5.3rem;\">";
                html += "	<i class=\"images_card\"><img src="+logoSrc+" style=\"width:2.8rem;height:2.8rem;\"></i>";
                html += "	<span style=\"margin-top:-.05rem\"><a class=\"btn cy-btn btn-red doRemind\" data-pk="+result[i].driverUserPK+" data-name="+result[i].drivingLisenceOwner+">提醒</a></span>";
                html += "	<h1>"+result[i].drivingLisenceOwner+"</h1>";
                html += "	<p style=\"margin-top:0.4rem\"><small style=\"font-size:0.75rem;\">"+(result[i].drivingLisencePlateNo?result[i].drivingLisencePlateNo:"--")+"</small><small style=\"font-size:0.75rem;float:right;margin-right:1rem;\">"+(result[i].drivingLisenceModel?result[i].drivingLisenceModel:"--")+"</small></p>";
                html += "	<p style=\"margin:0.6rem 0.6rem 0;font-size:0.7rem;color:#6D6D6D;padding-left:0;\"><strong style=\"margin-right:0.8rem;\">初次登记日期："+(result[i].drivingLisenceRegDate?result[i].drivingLisenceRegDate:"--")+"</strong><strong>剩余时间："+(result[i].betweenDays?result[i].betweenDays:"--")+"天</strong></p>";
                html += "	<p style=\"margin:0.2rem 0.6rem 0;font-size:0.7rem;color:#6D6D6D;padding-left:0;\"><strong style=\"margin-right:0.8rem;\">推荐年审日期："+(result[i].verifyDate?result[i].verifyDate:"--")+"</strong></p>";
                html += "</div>";
              }
             }
             $("#remindList").html(html);
             $("#remindList .doRemind").click(function(){
               $(".driverpk").val($(this).attr("data-pk"));
               $(".receiver").val($(this).attr("data-name"));
               $(".msgContent").val("年审提醒：亲爱的巨能车主用户，您的爱车快要进行年审了，请您尽快前往所在地车管所进行年审。祝您旅途愉快！");
               $(".remindSend").show();
             });
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
      // 初始故障提醒列表
      initTrobleList:function(merchantspk){
        var loading = layer.open({type: 2});
        var params = {
          "merchantsPK":merchantspk,
          "beginTime":"",
          "endTime":"",
          "carModel":"",
          "beginNum":0,
          "queryNum":10
        };
        $.post(GLOBALURL.LIST_QUERYTROBLELIST_URL,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            var html = "";
            if(result && result.length > 0){
              for(var i=0;i<result.length;i++){
                html += "<div class=\"card_ecchange plus-pass\" style=\"height:5.3rem;\">";
                html += "	<i class=\"images_card\"><img src="+(result[i].dirvingLisence.users.userinfo.userinfoprofileimageurl?result[i].dirvingLisence.users.userinfo.userinfoprofileimageurl:logoSrc)+" style=\"width:2.8rem;height:2.8rem;\"></i>";
                html += "	<span style=\"margin-top:-.05rem\"><a class=\"btn cy-btn btn-red doRemind\" data-pk="+result[i].dirvingLisence.users.userpk+" data-name="+result[i].dirvingLisence.drivinglisenceowner+">提醒</a></span>";
                html += "	<h1>"+result[i].dirvingLisence.drivinglisenceowner+"</h1>";
                html += "	<p style=\"margin-top:0.4rem\"><small style=\"font-size:0.75rem;\">"+(result[i].dirvingLisence.drivinglisenceplateno?result[i].dirvingLisence.drivinglisenceplateno:"--")+"</small><small style=\"font-size:0.75rem;float:right;margin-right:1rem;\">"+(result[i].dirvingLisence.drivinglisencemodel?result[i].dirvingLisence.drivinglisencemodel:"--")+"</small></p>";
                html += "	<p style=\"margin:0.6rem 0.6rem 0;font-size:0.7rem;color:#6D6D6D;padding-left:0;\"><strong style=\"margin-right:0.8rem;\">上次检测时间："+(result[i].oBDTrouble?result[i].oBDTrouble.obdtroubleuploadtime:"--")+"</strong></p>";
                html += "	<p style=\"margin:0.2rem 0.6rem 0;font-size:0.7rem;color:#6D6D6D;padding-left:0;\"><strong style=\"margin-right:0.8rem;\">检测故障个数"+(result[i].oBDTrouble?result[i].oBDTrouble.obdtroublenum:"--")+"个</strong></p>";
                html += "</div>";
              }
             }
             $("#remindList").html(html);
             $("#remindList .doRemind").click(function(){
               $(".driverpk").val($(this).attr("data-pk"));
               $(".receiver").val($(this).attr("data-name"));
               $(".msgContent").val("故障提醒：亲爱的巨能车主用户，您的爱车检测到有新的故障信息，请前往巨能APP查看详情。祝您旅途愉快！");
               $(".remindSend").show();
             });
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
      // 初始故障提醒列表
      initHealthList:function(merchantspk){
        var loading = layer.open({type: 2});
        var params = {
          "merchantsPK":merchantspk,
          "beginTime":"",
          "endTime":"",
          "userName":"",
          "beginNum":0,
          "queryNum":10
        };
        $.post(GLOBALURL.LIST_QUERYHEALTHLIST_URL,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            var html = "";
            if(result && result.length > 0){
              for(var i=0;i<result.length;i++){

              }
             }
            //  $("#remindList").html(html);
            //  $("#remindList .doRemind").click(function(){
            //    $(".driverpk").val($(this).attr("data-pk"));
            //    $(".receiver").val($(this).attr("data-name"));
            //    $(".msgContent").val("故障提醒：亲爱的巨能车主用户，您的爱车检测到有新的故障信息，请前往巨能APP查看详情。祝您旅途愉快！");
            //    $(".remindSend").show();
            //  });
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
