<template>
<div>
  <header>
      <div class="header">
          <h1>{{remindTypeName}}</h1>
          <router-link slot="left" to="/home?modelIndex=2" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div>
     <div class="all_box groupList" id="remindList">
       <div id="nodata"><a class="imgconfig"></a><span class="textconfig">暂无数据</span></div>
     </div>
  </div>
  <!--消息提醒-->
  <div class="comment-module remindSend" hidden="hidden">
    <div class="kuang micon-service-blessbg " style="top:5.2rem;">
      <div class="comment-h" style="color:#9E9383;margin-top:0.4rem;">
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
          <a href="javascript:;" class="btn btn-max submitUpdate" style="margin:.5rem 0;background-color:#4863A2;" @click="submitRemind()">发送</a>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'

  let merchantspk = "";
  export default{
    name: 'BirthService',
    components: {
    },
    data(){
      return{
        remindTypeName:"生日提醒",
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        merchantspk = userInfo.merchantspk;
        this.initBirthList(merchantspk);

      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
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
      initBirthList:function(merchantspk){
        var formatDateTime = this.formatDateTime;
        var formateBirthDay = this.formateBirthDay;
        var formateAge = this.formateAge;
      	var loading = layer.open({type: 2});
      	var params = {
      		"merchantsPK":merchantspk,
      		"carModel":"",
      		"userName":"",
          "beginNum":0,
          "queryNum":20
      	};
       	$.post(GLOBALURL.LIST_QUERYBIRTHLIST_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      			if(result && result.length > 0){
      				for(var i=0;i<result.length;i++){
                var sexClass = "micon-service-icon micon-service-man";
                if(result[i].userInfoGender == "男"){
                  sexClass = "micon-service-icon micon-service-man";
                }else{
                  sexClass = "micon-service-icon micon-service-woman";
                }
                var birthDate = formatDateTime(result[i].userInfoBirthdate);
                var birthAge = formateAge(result[i].userInfoBirthdate);
                var birthInterval = formateBirthDay(result[i].userInfoBirthdate);
                html += "<div class=\"card_ecchange plus-pass\" style=\"height:4.8rem;\">";
                html += "	<i class=\"images_card\"><img src="+(result[i].userInfoProfileImageURL?result[i].userInfoProfileImageURL:logoSrc)+" style=\"width:3rem;height:3rem;\"></i>";
                if(birthInterval==315){
                  html += "	<span style=\"margin-top:-.05rem\"><a class=\"btn cy-btn btn-red doBlessing\" data-pk="+result[i].userPK+" data-name="+result[i].userInfoName+">送祝福</a></span>";
                }else{
                  html += "	<span style=\"margin-top:-.05rem\"><a style=\"font-size:0.9rem;color:#FB541F;font-weight:600;\" data-pk="+result[i].userPK+" data-name="+result[i].userInfoName+">"+birthInterval+"<b style=\"font-size:0.8rem;font-weight:400;\">天</b></a></span>";
                }
                html += "	<h1>"+result[i].userInfoName+"</h1>";
                html += "	<p style=\"margin:0.8rem 0 0 2.5rem;font-size:0.7rem;color:#6D6D6D;padding-left:0;\"><strong><i class='"+sexClass+"' style=\"margin:0 0.2rem 0 0;\"></i>"+birthDate+"</strong>";
                if(birthInterval==315){
                  html += "	<strong style=\"float:right;margin-right:0.8rem;color:#FB541F;\"><i class=\"micon-service-icon micon-service-cake\"></i>今天"+birthAge+"岁生日</strong></p>";
                }else{
                  html += "	<strong style=\"float:right;margin-right:0.8rem;\">距"+birthAge+"岁生日</strong></p>";
                }
                html += "</div>";
      				}
      		   }
      		   $("#remindList").html(html);
      		   $("#remindList .doBlessing").click(function(){
               $(".driverpk").val($(this).attr("data-pk"));
               $(".receiver").val($(this).attr("data-name"));
               $(".msgContent").val("生日提醒：亲爱的巨能车主用户，今天是您的生日，祝您生日快乐，旅途愉快！");
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
      formatDateTime:function(inputTime){
          var date = new Date(inputTime);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return y+'年'+m+'月'+d+'日';
      },
      formateBirthDay:function(birth){
  			 birth = new Date(birth);
  		   var currentTime = new Date();
  			 birth.setFullYear(currentTime.getFullYear());
  			 currentTime.setHours(0);
  			 currentTime.setMinutes(0);
  			 currentTime.setSeconds(0);
  			 currentTime.setMilliseconds(0);
  			 if((currentTime.getTime()) > birth.getTime())birth.setFullYear(currentTime.getFullYear() + 1);
		     var dates = Math.abs((currentTime.getTime() - birth.getTime()))/(1000*60*60*24);
		     return  Math.floor(dates);
      },
      formateAge:function(birth){
         birth = new Date(birth);
         var currentTime = new Date();
         var dates = Math.abs(currentTime.getFullYear() - birth.getFullYear());
         return  Math.floor(dates);
      }


    }
}
</script>
