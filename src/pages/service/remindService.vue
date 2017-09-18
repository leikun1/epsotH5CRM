<template>
<div>
  <header>
      <div class="header">
          <h1>提醒服务</h1>
          <a @click="pageBack()" href="javascript:void(0);" class="return"><i class="icon-chevron-left"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <!-- 救援电话 -->
	<div class="datum-box" id="remindList">
		<ul class="datum-list remindStyle">
			<li class="dropdown">
				<a href="javascript:void(0);">
				  <h1 @click="checkStatus(0)" data-toggle="dropdown" class="vtitle"><i class="ba-color8 icon-check"></i><i class="ba-color micon-remind01"></i>
            <b class="textUp">保养提醒</b><b class="textDown"><label class="finish">已</label><small>0</small><label  class="unfinish">未</label><small>0</small></b>
            <span class="icon-angle-right" @click="pageTurn('../service/remindInfo?remindType=0')" style="font-size:1.6rem;"></span>
          </h1>
				</a>
			</li>
			<li class="dropdown">
				<a href="javascript:void(0);">
					<h1 @click="checkStatus(1)" data-toggle="dropdown" class="vtitle"><i class="ba-color8 icon-check"></i><i class="ba-color micon-remind02"></i>
            <b class="textUp">保险提醒</b><b class="textDown"><label class="finish">已</label><small>0</small><label  class="unfinish">未</label><small>0</small></b>
            <span class="icon-angle-right" @click="pageTurn('../service/remindInfo?remindType=1')" style="font-size:1.6rem;"></span>
          </h1>
				</a>
			</li>
			<li class="dropdown">
				<a href="javascript:void(0);">
				  <h1 @click="checkStatus(2)" data-toggle="dropdown" class="vtitle"><i class="ba-color8 icon-check"></i><i class="ba-color micon-remind03"></i>
            <b class="textUp">年审提醒</b><b class="textDown"><label class="finish">已</label><small>0</small><label  class="unfinish">未</label><small>0</small></b>
            <span class="icon-angle-right" @click="pageTurn('../service/remindInfo?remindType=2')" style="font-size:1.6rem;"></span>
          </h1>
				</a>
			</li>
			<li class="dropdown">
				<a href="javascript:void(0);">
					<h1 @click="checkStatus(3)" data-toggle="dropdown" class="vtitle"><i class="ba-color8 icon-check"></i><i class="ba-color micon-remind04"></i>
            <b class="textUp">健康提醒</b><b class="textDown"><label class="finish">已</label><small>0</small><label  class="unfinish">未</label><small>0</small></b>
            <span class="icon-angle-right" @click="pageTurn('../service/remindInfo?remindType=3')" style="font-size:1.6rem;"></span>
          </h1>
				</a>
			</li>
      <li class="dropdown">
        <a href="javascript:void(0);">
          <h1 @click="checkStatus(4)" data-toggle="dropdown" class="vtitle"><i class="ba-color8 icon-check"></i><i class="ba-color micon-remind05"></i>
            <b class="textUp">故障提醒</b><b class="textDown"><label class="finish">已</label><small>0</small><label  class="unfinish">未</label><small>0</small></b>
            <span class="icon-angle-right" @click="pageTurn('../service/remindInfo?remindType=4')" style="font-size:1.6rem;"></span>
          </h1>
        </a>
      </li>
		</ul>

    <div class="selectBtn">
      <button @click="btnClick(0)" >全选</button>
      <button @click="btnClick(1)" >通知员工</button>
    </div>
	</div>

  <div class="all_box groupList" id="staffList" style="display:none;">
    <div id="nodata"><a class="imgconfig"></a><span class="textconfig">暂无数据</span></div>
  </div>

  <!--消息提醒-->
  <div class="comment-module remindSend" hidden="hidden">
    <div class="kuang" style="top:5.2rem;">
      <div class="comment-h" style="background-color: #06c1ae;">
        <i class="icon-remove close" @click="closeDialog()"></i>
        <p>员工通知</p>
      </div>
      <div class="comment-con">
        <form method="get">
          <input type="hidden" class="driverpk">
          <p style="margin-left:0.8rem;"><em class="lineStyle"></em><span>通知员工</span></p>
          <div class="firmIntro-box">
             <input type="text" class="receiver" style="padding:0.2rem 0.4rem;" disabled="true">
          </div>
          <p style="margin-left:0.8rem;"><em class="lineStyle"></em><span>通知类型</span></p>
          <div class="firmIntro-box">
             <input type="text" class="noticetype" style="padding:0.2rem 0.4rem;" value="提示消息" disabled="true">
          </div>
          <p style="margin-left:0.8rem;"><em class="lineStyle"></em><span>通知内容</span></p>
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
<style>
.selectBtn{
  position:fixed;bottom:0;width:100%;
}
.selectBtn button{
  width:49.3%;display:inline-block;margin:0;padding:0.6rem 0;background-color:#fff;
  color:#06C1AE;
  border: 1px solid #d9d9d9;
}
.remindStyle .textUp{
    float:left;
    line-height: 2rem;
}
.remindStyle .textDown{
    float:left;
    line-height: 2rem;
    margin-top: 1.2rem;
    margin-left: -3.8rem;
    font-size: 0.65rem;
}
.remindStyle .textDown .finish{
    margin-left: 0.1rem;
    color: #FF6666;
    border: 1px solid #FF6666;
    border-radius: 0.8rem;
    padding: 0.05rem 0.15rem;
}
.remindStyle .textDown .unfinish{
    margin-left: 0.6rem;
    color: #06C1AE;
    border: 1px solid #06C1AE;
    border-radius: 0.8rem;
    padding: 0.05rem 0.15rem;
}
.remindStyle .textDown small{
    margin: 0 0.2rem;
    color: #ccc;
    font-size: 0.7rem;
}
.vtitle .icon-check{
  margin-right: 0.3rem;
  display: none;
}
</style>
<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'
  let remindNum = 5;
  let merchantspk = "";
  export default{
    name: 'RemindService',
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
        this.initStaffList(); // 初始化个人订单列表
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      pageBack:function(){
         if($("#staffList").is(":visible")){
           $("#remindList").show();
           $("#staffList").hide();
         }else{
           this.$router.replace({ path: '/home?modelIndex=2' })
         }
      },
      // 点击关闭
      closeDialog:function(){
        $(".comment-module").hide();
      },
      // 全选员工
      btnClick:function(index){
         var selectNum = $(".vtitle .icon-check:visible").length;
         if(index == 0){ // 全选
             if(remindNum > selectNum){
               $(".vtitle .icon-check").show();
             }else{
               $(".vtitle .icon-check").hide();
             }
         }else{ // 通知员工
           if(selectNum == 0){
               layer.open({content:'请先选择需要通知的选项',skin:'msg',time: 2});
           }else{
              var noticeType = "";
              var checkedRemind = $(".vtitle .icon-check:visible");
              for(var i=0;i<checkedRemind.length;i++){
                noticeType += checkedRemind.eq(i).parent().find(".textUp").text()+",";
              }
              if(noticeType.indexOf(",")!=-1){
                noticeType = noticeType.substring(0,noticeType.length-1);
              }
              $(".noticetype").val(noticeType);
              $(".vtitle .icon-check").hide();
              $("#remindList").hide();
              $("#staffList").show();
           }
         }
      },
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
      checkStatus:function(index){
        $(".vtitle:eq("+index+") .icon-check").toggle();
      },
      // 初始保险提醒列表
      initStaffList:function(){
        var loading = layer.open({type: 2});
        var params = {
          "merchantsPK":merchantspk,
          "phone":"",
          "name":"",
          "beginNum":0,
          "queryNum":10
        };
        $.post(GLOBALURL.LIST_QUERYSTAFFLIST_URL,params,function(data){
          if(data.statusCode == 0){
            var result = data.value;
            var html = "";
            if(result && result.length > 0){
              for(var i=0;i<result.length;i++){
                html += "<div class=\"card_ecchange plus-pass\" style=\"height:3.0rem;\">";
                html += "	<i class=\"images_card\"><img src="+logoSrc+" style=\"width:2.8rem;height:2.8rem;\"></i>";
                html += "	<span style=\"margin-top:-.05rem\"><a class=\"btn cy-btn btn-red doRemind\" data-pk="+result[i].operatorpk+" data-name="+result[i].operatorname+">通知员工</a></span>";
                html += "	<h1>"+result[i].operatorname+"</h1>";
                html += "	<p style=\"margin-top:0.4rem\"><small style=\"font-size:0.75rem;\">"+(result[i].operatorgender?result[i].operatorgender:"--")+"</small><small style=\"font-size:0.75rem;float:right;margin-right:1rem;\">"+(result[i].operatorphone?result[i].operatorphone:"--")+"</small></p>";
                html += "</div>";
              }
             }
             $("#staffList").html(html);
             $("#staffList .doRemind").click(function(){
               $(".driverpk").val($(this).attr("data-pk"));
               $(".receiver").val($(this).attr("data-name"));
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
      submitRemind:function(){
        var msgContent = $(".msgContent").val();
        var driverpk =  $(".driverpk").val();
        var noticeType =  $(".noticetype").val();
        if(msgContent == ""){
          layer.open({content:'通知内容不能为空',skin:'msg',time: 2});
        }else if(msgContent.length > 200){
          layer.open({content:'通知内容不能超过200个字符',skin:'msg',time: 2});
        }else{
          var params = {
            "merchantsPK":merchantspk,
            "operatorPK":driverpk,
            "noticeContent":msgContent,
            "noticeType":noticeType,
          };
          var loading = layer.open({type: 2});
          $.post(GLOBALURL.ADD_SENDNOTICESTAFF_URL,params,function(data){
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
    },

}
</script>
