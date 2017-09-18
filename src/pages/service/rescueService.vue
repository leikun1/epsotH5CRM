<template>
<div>
  <header>
      <div class="header">
          <h1>救援服务</h1>
          <router-link slot="left" to="/home?modelIndex=2" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div>
     <div class="all_box groupList" id="remindList">
       <div id="nodata"><a class="imgconfig"></a><span class="textconfig">暂无数据</span></div>
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
    name: 'RescueService',
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
        this.initRescueList(merchantspk);
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 初始预约列表
      initRescueList:function(merchantspk){
      	var loading = layer.open({type: 2});
      	var params = {
      		"merchantsPk":merchantspk,
      		"userPk":"",
          "beginNum":0,
          "queryNum":10
      	};
       	$.post(GLOBALURL.LIST_QUERYRESCUELIST_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      			if(result && result.length > 0){
      				for(var i=0;i<result.length;i++){
                var appointStatus = result[i].carmappointmentstatus;
                if(appointStatus == "0"){
                  appointStatus = "预约未到";
                }else if(appointStatus == "1"){
                  appointStatus = "预约迟到";
                }else{
                  appointStatus = "预约已到";
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
                html += "<div class=\"card_ecchange plus-pass\" style=\"height:6.6rem;\">";
                html += "	<i class=\"images_card\"><img src="+logoSrc+" style=\"width:2.8rem;height:2.8rem;\"></i>";
                html += "	<h1>--<small style=\"margin-left:1.2rem\">--</small></h1>";
                html += "	<p>--</p>";
                html += "	<p style=\"margin:0.8rem 0.6rem 0;font-size:0.7rem;color:#888;padding-left:0;\"><strong style=\"margin-right:1.2rem;\">距离(公里)："+result[i].mycarrescuemerchantsdistance+"</strong><strong>参考费用(元)："+result[i].mycarrescuevalidateprice+"</strong></p>";
                html += "	<p style=\"margin:0.2rem 0.6rem 0;font-size:0.7rem;color:#888;padding-left:0;\"><strong style=\"margin-right:0.8rem;\">呼叫时间："+(result[i].mycarrescuecalltime?result[i].mycarrescuecalltime:"--")+"</strong></p>";
                html += "	<p style=\"margin:0.2rem 0.6rem 0;font-size:0.7rem;color:#888;padding-left:0;\"><strong style=\"margin-right:0.8rem;\">车主位置："+(result[i].mycarrescueaddress?result[i].mycarrescueaddress:"--")+"</strong></p>";

                html += "</div>";
      				}
      		   }
      		   $("#remindList").html(html);
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
