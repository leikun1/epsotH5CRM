<template>
<div>
  <header>
      <div class="header">
          <h1>优惠券列表</h1>
          <router-link slot="left" to="/promote/couponinfo" class="return" ><i class="icon-chevron-left"></i></router-link>
          <!-- <router-link slot="right" to="../promote/addmsg"class="return" style="float:right;right:0;left:inherit;"><i class="icon-plus"></i></router-link> -->
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="userMyactivity-tab" style="padding:0.4rem 0;">
    <!-- tab nav -->
    <ul id="tab_btn" class="tab-list">
      <li style="line-height:2rem;" class="pick" data-type="" @click="tabToggle(0)">全部</li>
      <li style="line-height:2rem;" data-type="0" @click="tabToggle(1)"><span class="bar"></span>已启用</li>
      <li style="line-height:2rem;" data-type="1" @click="tabToggle(2)"><span class="bar"></span>未启用</li>
    </ul>
        <!-- tab nav end-->
        <ul class="userMy-content">
            <li class="tab_content show">
            	<ul class="userMy-list userMy-paid userMy-not" id="couponlist">
            	</ul>
            </li>
        </ul>
  </div>

</div>
</template>
<style>
#couponlist li{
  background: #fff;
  padding: 0;
}
.listinfoCoupon{
  height: 6.5rem;
}
.listinfoCoupon .couponContent{
  background: url("../../images/promote/icon_coupon_bg.png") no-repeat;
  background-size: 100%;
  height: 4.5rem;
  color: #fff;
  width: 90%;
  margin: 0 5%;
}
.listinfoCoupon .coupontime{
  margin:0.6rem 5% 0 5%;
}
.listinfoCoupon strong{
   position: absolute;
   font-size: 2rem;
   font-weight: 600;
   padding: 0.4rem 1.5rem;
}
.listinfoCoupon span{
    padding: 0.5rem 0 0 5.7rem;
    position: absolute;
}
.listinfoCoupon .upstyle{
    color: #fff;
    font-size: 1.0rem;
}
.listinfoCoupon .downstyle{
    color: #fff;
    font-size: 0.8rem;
    display: block;
}
.listinfoCoupon .mstyle{
    color: #fff;
    font-size: 0.8rem;
    position: absolute;
    padding: 0.2rem 0 0 1rem;
}
</style>
<script>
  import GLOBALURL from './../../utils/global'
  import NOPIC from './../../images/nopic.jpg'
  import $ from 'jquery'
  let merchantspk = "";
  let couponTabIndex = "0";

  export default{
    name: 'Couponlist',
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
      tabToggle:function(dataIndex){
        $("#tab_btn li").removeClass("pick");
        $("#tab_btn li:eq("+dataIndex+")").addClass("pick");
        if(dataIndex == 0){
          $("#couponlist li").show();
        }else{
          $("#couponlist li").hide();
          $("#couponlist li[data-type="+(Number(dataIndex))+"]").show();
        }
        couponTabIndex = dataIndex;
      },
      // 初始化优惠券信息列表
      initCouponList:function(merchantspk){
      	var params = {
      		"merchantsPK":merchantspk,
          "category":"",
          "isOpen":"",
          "status":"",
          "checkStatus":"",
          "beginTime":"",
      		"endTime":"",
          "beginNum":0,
          "queryNum":10
      	};
      	var loading = layer.open({type: 2});
      	$.post(GLOBALURL.LIST_QUERYCOUPONLIST_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      		  if(result && result.length>0){
      				for(var i=0;i<result.length;i++){
                var isopen = result[i].carmcouponisopen;
                var checkstatus = result[i].carmcouponcheckstatus;
                if(isopen == "1"){
                  isopen = "micon-check-on-yellow";
                }else{
                  isopen = "micon-check-off-yellow";
                }
                if(checkstatus == "1"){
                  checkstatus = "<small class=\"green\">审核通过</small>";
                }else{
                  checkstatus = "<small class=\"red\">审核未通过</small>";
                }
      					html += "<li class=\"MyacLi\" data-type="+result[i].carmcouponisopen+">";
      					html += "<div class=\"Myacticity\">";
      					html += "<div class=\"userMy-firm listinfoCoupon\">";
                html += "<p class=\"couponContent\"><small class=\"mstyle\">¥</small>";
                html += "<strong>"+result[i].carmcouponstoreprice+"</strong>";
                html += "<span><small class=\"upstyle\">"+result[i].carmcouponname+"</small>";
                html += "<small class=\"downstyle\">"+result[i].carmcouponcategorybrief+"</small></span>";
                html += "</p>";
                html += "<p class=\"coupontime\"><small class=\"gray\"><i style=\"width:0.8rem;height:0.8rem;\" class=\"micon-service-icon micon-service-days\"></i>"+result[i].carmcouponaddtime+"</small><i class="+isopen+" style=\"float:right;margin:0 0.2rem;\"></i></p>";
      					// html += " <p><span class=\"leftinfo\" style=\"width:50%\">优惠券称：<small class=\"gray\">"+result[i].carmcouponname+"</small></span><span>优惠券类型：<small class=\"gray\">"+result[i].carmcouponcategoryname+"</small></span></p>";
                // html += " <p><span class=\"leftinfo\" style=\"width:50%\">门店价：<small class=\"gray\">"+result[i].carmcouponstoreprice+"</small></span><span>优惠价格：<small class=\"gray\">"+result[i].carmcoupongroupprice+"</small></span></p>";
                // html += " <p><span class=\"leftinfo\" style=\"width:50%\">开放状态："+isopen+"</span><span>审核状态："+checkstatus+"</span></p>";
                // html += " <p>上架时间：<small class=\"gray\">"+result[i].carmcouponaddtime+"</small></p>";
      					html += "</div>";
      					html += "</div>";
      					html += "</li>";
      				}
      			}else{
      				html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
      			}
            $("#couponlist").html(html);
            if(couponTabIndex == 0){
              $("#couponlist li").show();
            }else{
              $("#couponlist li").hide();
              $("#couponlist li[data-type="+(Number(couponTabIndex)-1)+"]").show();
            }
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
