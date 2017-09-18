<template>
  <div>
  <header>
      <div class="header">
          <h1>实时视频监控</h1>
          <router-link slot="left" to="/home?modelIndex=2" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>
   <div class="contact" style="background-color:#EFEFF4;">
      <div class="contact-search">
         <select id="searchKey" @change="driverTypeChange()">
         </select>
         <i class="icon-caret-down"></i>
       </div>
       <!--联系人-->
       <div class="contact-content" id="videoList">

       </div>
    </div>
</div>
</template>
<style>
.videoItem{
  margin:0.4rem 0.2rem 0.4rem 0.6rem;
  background-color: #fff;
}
.videoItem video{
  width: 100%;
}
.videoItem p{
  text-align: center;
}
</style>
<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'

  export default{
    name: 'MonitorService',
    data(){
      return{
        pageIndex:1
      }
    },
    components:{
    },
    created () {
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    mounted(){
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        var merchantspk = userInfo.merchantspk;
        var username = userInfo.merchantsname;
        $("#searchKey").html("<option value="+merchantspk+">"+username+"</option>");
        this.initMonitorList(merchantspk);
      }
    },
    methods:{
      pageTurn:function(turnPath,needLogin,needDriver,turnType){
          var userInfo = sessionStorage.getItem("userInfo");
          var isDriver = sessionStorage.getItem("_isDriver");
      		if(needLogin && !userInfo){
            layer.open({content:'请您先登录...',skin:'msg',time: 2});
      		}else if(turnType == "onekeyCall"){ // 一键呼叫
      			layer.open({content:'抱歉,该功能暂不开放...',skin:'msg',time: 2});
      		}else if(turnType == "epsotshop"){ // 商城
            layer.open({content:'程序猿正在玩命开发中...',skin:'msg',time: 2});
      		}else if(isDriver=="false" && needDriver){
            layer.open({content:'抱歉,该功能暂不对游客开放...',skin:'msg',time: 2});
      		}else{
            this.$router.replace({path:turnPath});
          }
      },
      driverTypeChange:function(){

      },
      // 初始视频监控列表
      initMonitorList:function(merchantspk){
        var loading = layer.open({type: 2});
        var params = {
          "merchantsPK":merchantspk,
          "maintPK":"",
          "beginNum":0,
          "queryNum":20
        };
        $.post(GLOBALURL.LIST_QUERYMONITORLIST_URL,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            var html = "";
            if(result && result.length > 0){
              for(var i=0;i<result.length;i++){
                html += "<div class=\"videoItem\">";
                html += "  <video src="+result[i].maintstationassurl+" controls ></video>";
                html += "  <p class=\"videoText\">"+result[i].station.stationname+"</p>";
                html += "</div>";
              }
            }else{
               html += "<div>暂无数据</div>";
            }
             $("#videoList").html(html);
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
