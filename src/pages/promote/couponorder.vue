<template>
<div>
  <header>
      <div class="header">
          <h1>订单列表</h1>
          <router-link slot="left" to="/promote/couponinfo" class="return" ><i class="icon-chevron-left"></i></router-link>
          <!-- <router-link slot="right" to="../promote/addmsg"class="return" style="float:right;right:0;left:inherit;"><i class="icon-plus"></i></router-link> -->
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="userMyactivity-tab" style="background-color:#EFEFF4;">
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
.listinfo .couponTitle{
  font-size: 0.75rem;
  color: #333;
  border-bottom: 1px solid #f1f1f1;
  padding: 0.3rem 0;
}
.listinfo p{
  font-size: 0.7rem;
  color: #999;
  padding: 0.1rem 0;
}
</style>
<script>
  import GLOBALURL from './../../utils/global'
  import NOPIC from './../../images/nopic.jpg'
  import $ from 'jquery'
  let merchantspk = "";
  export default{
    name: 'Couponorder',
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
        this.initCouponList(merchantspk); // 初始化个人订单列表
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {

      // 初始化优惠券信息列表
      initCouponList:function(merchantspk){
      	var params = {
      		"merchantsPK":merchantspk,
          "status":"",
          "beginTime":"",
      		"endTime":"",
          "beginNum":0,
          "queryNum":10
      	};
      	var loading = layer.open({type: 2});
      	$.post(GLOBALURL.LIST_QUERYCOUPONORDERLIST_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      		  if(result && result.length>0){
      				for(var i=0;i<result.length;i++){
                var status = result[i].carmcouponorderstatus;
		            if(status == "0"){
                  status = "<small style=\"color:#F54264\" class=\"gray\">未付款</small>";
	              }else if(status == "1"){
                  status = "<small style=\"color:#3ACABA\" class=\"gray\">已付款</small>";
	              }else if(status == "2"){
                  status = "<small style=\"color:#3ACABA\" class=\"gray\">部分退款</small>";
	              }else if(status == "3"){
                  status = "<small style=\"color:#3ACABA\" class=\"gray\">全部退款</small>";
	              }else if(status == "4"){
                  status = "<small style=\"color:#3ACABA\" class=\"gray\">已评论</small>";
	              }else if(status == "5"){
                  status = "<small style=\"color:#3ACABA\" class=\"gray\">已取消</small>";
	              }
      					html += "<li class=\"MyacLi\" data-type="+result[i].carmadsenabled+">";
      					html += "<div class=\"Myacticity\">";
      					html += "<div class=\"userMy-firm listinfo\">";
                html += "	<p class=\"couponTitle\">订单编号："+result[i].carmcouponorderno+"<span style=\"float:right;\">"+result[i].carmcouponordercouponass[0].carmcouponcategoryname+"</span></p>";
                html += " <p>优惠券名称：<small class=\"gray\">"+result[i].carmcouponordercouponass[0].carmcouponname+"</small></p>";
      					html += " <p>&nbsp;&nbsp;&nbsp;车主名称：<small class=\"gray\">"+"--"+"</small></p>";
                html += "	<p>&nbsp;&nbsp;&nbsp;订单数量：<small class=\"gray\">"+result[i].carmcouponordercouponass.length+"</small></p>";
                html += " <p>&nbsp;&nbsp;&nbsp;订单金额：<small class=\"gray\" style=\"color:#F47504;\">"+result[i].carmcouponordertotalprice+"元</small></p>";
                html += "	<p>&nbsp;&nbsp;&nbsp;订单状态："+status+"</p>";
                html += "	<p>&nbsp;&nbsp;&nbsp;下单时间：<small class=\"gray\">"+result[i].carmcouponordertime+"</small></p>";
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
