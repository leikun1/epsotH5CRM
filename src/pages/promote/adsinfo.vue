<template>
<div >
  <header>
      <div class="header">
          <h1>广告列表</h1>
          <router-link slot="left" to="/home?modelIndex=3" class="return" ><i class="icon-chevron-left"></i></router-link>
          <router-link slot="right" to="../promote/addads"class="return shareMap" style="float:right;right:0;left:inherit;"><i class="icon-plus"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="userMyactivity-tab" style="background-color:#EFEFF4;padding:0.4rem 0;">
		    <!-- tab nav -->
        <ul id="tab_btn" class="tab-list">
          <li style="line-height:2rem;" class="pick" data-type="" @click="tabToggle(0)">全部</li>
          <li style="line-height:2rem;" data-type="0" @click="tabToggle(1)"><span class="bar"></span>未启用</li>
          <li style="line-height:2rem;" data-type="1" @click="tabToggle(2)"><span class="bar"></span>已启用</li>
        </ul>
        <!-- tab nav end-->
        <ul class="userMy-content">
            <li class="tab_content show">
            	<ul class="userMy-list userMy-paid userMy-not" id="adslist">
            	</ul>
            </li>
        </ul>
  </div>

</div>
</template>
<style>

  #adslist li{
    background-color:#fff;
    padding:0;
  }
  .listinfo .adstitle{
    text-align: center;
    font-size: 0.85rem;
    color: #333;
    font-weight: 600;
    border-bottom: 1px solid #f1f1f1;
    padding: 0.3rem 0;
    margin-left: 2.5rem;
  }
  .listinfo .adscontent{
    font-size: 0.65rem;
    color: #666;
    padding: 0.3rem 0.6rem;
  }
  .listinfo .adstime{
    padding: 0.3rem;
  }
</style>
<script>
  import GLOBALURL from './../../utils/global'
  import NOPIC from './../../images/nopic.jpg'
  import $ from 'jquery'
  let merchantspk = "";
  let tabIndex = "0";
  export default{
    name: 'Adsinfo',
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
        this.initAdsList(merchantspk); // 初始化个人订单列表
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      tabToggle:function(dataIndex){
        $("#tab_btn li").removeClass("pick");
        $("#tab_btn li:eq("+dataIndex+")").addClass("pick");
        if(dataIndex == 0){
          $("#adslist li").show();
        }else{
          $("#adslist li").hide();
          $("#adslist li[data-type="+(Number(dataIndex)-1)+"]").show();
        }
        tabIndex = dataIndex;
      },
      // 初始化广告信息列表
      initAdsList:function(){
        let updateAdsStatus = this.updateAdsStatus;
      	var dealStatus = $("#tab_btn li.pick").attr("data-type");
      	var params = {
      		"merchantsPK":merchantspk,
      		"beginTime":"",
      		"endTime":"",
          "beginNum":0,
          "queryNum":10
      	};
      	var loading = layer.open({type: 2});
      	$.post(GLOBALURL.LIST_QUERYADSLIST_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      			var html = "";
      		    if(result && result.length>0){
      				for(var i=0;i<result.length;i++){
      				  var adstime = "--";
                if(result[i].carmadsbegintime && result[i].carmadsendtime){
                  adstime = result[i].carmadsbegintime+"-"+result[i].carmadsendtime;
                }
                var adsstatus = "micon-check-on";
                if(result[i].carmadsenabled == "0"){
                  adsstatus = "micon-check-off";
                }else{
                  adsstatus = "micon-check-on";
                }
      					html += "<li class=\"MyacLi\" data-type="+result[i].carmadsenabled+">";
      					html += "<div class=\"Myacticity\">";
      					html += "	<span id=\"adstatus\" class="+adsstatus+" data-pk="+result[i].carmadspk+" data-type="+result[i].carmadsenabled+" style=\"float:right;padding:0.2rem;margin:0.3rem 0.4rem;\">";
      					html += "	</span>";
      					html += "<div class=\"userMy-firm listinfo\">";
      					html += " <p class=\"adstitle\">"+result[i].carmadstitle+"</p>";
                html += " <p class=\"adscontent\">"+(result[i].carmadsbrief?result[i].carmadsbrief:"暂无简介...")+"</p>";
                html += "	<p><img style=\"height:5.5rem;margin:0.3rem 0\" src="+result[i].carmadssourceurl+" /></p>";
                html += "	<p class=\"adstime\"><small class=\"gray\"><i style=\"width:0.8rem;height:0.8rem;\" class=\"micon-service-icon micon-service-days\"></i>"+adstime+"</small><span><small class=\"gray\" style=\"float:right;margin:0 0.2rem;\">"+(result[i].carmadscheckstatus=="1"?"已通过":"未通过")+"</small></span></p>";
      					html += "</div>";
      					html += "</div>";
      					html += "</li>";
      				}
      			}else{
      				html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
      			}
      		  $("#adslist").html(html);
            if(tabIndex == 0){
              $("#adslist li").show();
            }else{
              $("#adslist li").hide();
              $("#adslist li[data-type="+(Number(tabIndex)-1)+"]").show();
            }
      			$("#adslist #adstatus").click(function(){
        				var status = $(this).attr("data-type");
                var adspk = $(this).attr("data-pk");
                var enabled = "0";
                if(status == "1"){
                  $(this).attr("class","micon-check-off")
                  enabled = "0";
                }else{
                  $(this).attr("class","micon-check-on")
                  enabled = "1";
                }
                updateAdsStatus(adspk,enabled);
      			});
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
