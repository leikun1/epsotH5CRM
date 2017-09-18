<template>
<div>
  <header>
      <div class="header">
          <h1>推送列表</h1>
          <router-link slot="left" to="/home?modelIndex=3" class="return" ><i class="icon-chevron-left"></i></router-link>
          <router-link slot="right" to="../promote/addmsg"class="return shareMap" style="float:right;right:0;left:inherit;"><i class="icon-plus"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="userMyactivity-tab" style="background-color:#EFEFF4;padding:0.2rem 0;">
        <!-- tab nav end-->
        <ul class="userMy-content">
            <li class="tab_content show">
            	<ul class="userMy-list userMy-paid userMy-not" id="msglist">
            	</ul>
            </li>
        </ul>
  </div>

</div>
</template>
<style>
#msglist li{
  background-color:#fff;
  padding:0 0.4rem;
}
.listinfo{
  background-color: #fff;
}
.listinfo .msgtitle{
  font-size: 0.85rem;
  color: #06c1ae;
  font-weight: 600;
  border-bottom: 1px solid #f1f1f1;
  padding: 0.3rem 0;
  margin-left: 0.4rem;
}
.listinfo .msgContent{
  color: #333;
  font-size: 0.7rem;
  padding: 0.4rem;
}
</style>
<script>
  import GLOBALURL from './../../utils/global'
  import NOPIC from './../../images/nopic.jpg'
  import $ from 'jquery'
  let merchantspk = "";
  export default{
    name: 'Msginfo',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        merchantspk = userInfo.merchantspk;
        this.initMsgList(merchantspk); // 初始化个人订单列表
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {

      // 初始化广告信息列表
      initMsgList:function(merchantspk){
      	var params = {
      		"noticeSenderpk":merchantspk,
          "noticeSendStatus":"",
          "noticeEnabled":"",
          "noticeType":"",
      		"beginTime":"",
      		"endTime":"",
          "beginNum":0,
          "queryNum":10
      	};
      	var loading = layer.open({type: 2});
      	$.post(GLOBALURL.LIST_QUERYMSGLIST_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      		    if(result && result.length>0){
              var msgType = {
                "0":"提示消息",
                "1":"广告消息",
                "2":"优惠消息"
              }
              var reciverType = {
                "0":"指定车主",
                "1":"车机在线",
                "2":"手机在线",
                "3":"所有用户"
              }
      				for(var i=0;i<result.length;i++){
      					html += "<li class=\"MyacLi\" data-type="+result[i].carmadsenabled+">";
      					html += "<div class=\"Myacticity\">";
      					html += "<div class=\"userMy-firm listinfo\">";
      					html += " <p class=\"msgtitle\">"+msgType[result[i].voicenoticetype]+"</p>";
                html += "	<p class=\"msgContent\">"+(result[i].voicenoticecontent?result[i].voicenoticecontent:"...")+"</p>";
                html += "	<p class=\"adstime\"><small class=\"gray\"><i style=\"width:0.8rem;height:0.8rem;margin:0 0.4rem 0.1rem 0;\" class=\"micon-service-icon micon-service-days\"></i>"+result[i].noticeupdatetime+"</small><span><small class=\"gray\" style=\"float:right;margin:0 0.2rem;\"><i style=\"width:0.8rem;height:0.8rem;margin:0 0.4rem 0.3rem 0;\" class=\"micon-service-icon micon-promote-user\"></i>"+reciverType[result[i].voicenoticextends]+"</small></span></p>";
                html += "</div>";
      					html += "</div>";
      					html += "</li>";
      				}
      			}else{
      				html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
      			}
            $("#msglist").html(html);
      		}else if(data.statusCode == -999){
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		};
          // 等待层
          setTimeout(function(){
            layer.close(loading);
          },200);
      	},"json");
      },
      updateAdsStatus:function(adspk,enabled){
        let initAdsList = this.initAdsList;
        $.post(GLOBALURL.UPDATE_CHANGEADSENABLED_URL,{"adsPK":adspk,"enabled":enabled,"platform":"3"},function(data){
              if(data.statusCode == 0){
                layer.open({content:data.message,skin:'msg',time: 2});
                initAdsList();
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
          },"json");
      }
    }
}
</script>
