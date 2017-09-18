<template>
<div>
  <header>
      <div class="header">
          <h1>消息推送</h1>
          <router-link slot="left" to="/promote/msginfo" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="g-Give" style="background-color:#fff;border-top:0.6rem solid #EFEFF4;">
      <form method="get">
    		<p style="margin-left:0.8rem;padding:0.2rem 0;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>消息类型</span></p>
    		<div class="firmIntro-box">
           <select style="padding:0.4rem 0.4rem;width:96%;" class="text_add dataValue" id="msgType" >
             <option value="0">提示消息</option>
             <option value="1">广告消息</option>
             <option value="2">优惠消息</option>
            </select>
    		</div>
        <p style="margin-left:0.8rem;padding:0.2rem 0;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>接收对象</span></p>
        <div class="firmIntro-box">
           <select style="padding:0.4rem 0.4rem;width:96%;"class="text_add" id="receiverType" >
             <option value="1">车机在线</option>
             <option value="2">手机在线</option>
             <option value="3">所有用户</option>
           </select>
        </div>
    		<p style="margin-left:0.8rem;padding:0.2rem 0;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>消息内容</span></p>
    		<div class="firmIntro-box">
    			<textarea style="border:1px solid rgba(0,0,0,.2);padding:0.4rem 0.4rem;" id="msgDescribe" rows="4" placeholder="在这里输入消息内容"></textarea>
    		</div>
    		<a href="javascript:;" class="btn btn-max" style="margin:.5rem 0;background-color:#06C1AE;" id="sendMsg" @click="sendMsg()">确认发布</a>
      </form>
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import logoSrc from './../../images/epsot_logo.jpg'
  import $ from 'jquery'
  let merchantspk = "";

  export default{
    name: 'Addmsg',
    components: {
    },
    data(){
      return{
        userpk:""
      }
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if (userInfo) {
        userInfo = JSON.parse(userInfo);
        merchantspk = userInfo.merchantspk;
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      sendMsg:function(){
        var router = this.$router;
        var msgType = $("#msgType").val();
        var receiverType = $("#receiverType").val();
        var msgDescribe = $("#msgDescribe").val();
        if(msgDescribe == ""){
          layer.open({content:"消息内容不能为空",skin: 'msg',time: 2});
        }else if(msgDescribe > 50){
          layer.open({content:"消息内容不能超过50个字符",skin: 'msg',time: 2});
        }else{
            var params = {
          		"noticeSenderpk":merchantspk,
          		"noticeReceiverpk":"",
          		"noticeContent":msgDescribe,
              "noticeType":msgType,
              "noticeReceiverType":receiverType,
              "noticeBeginTime":"",
              "noticeEndTime":"",
          		"platform":"3"
          	};
          	$.post(GLOBALURL.ADD_ADDNOTICEMSG_URL,params,function(data){
          		if(data.statusCode == 0){
          			layer.open({content:data.message,skin: 'msg',time: 2});
          			$("#msgDescribe").val("");
                router.replace({path:"/promote/msginfo"});
          		}else if(data.statusCode == -999){
          		}else{
          			layer.open({content:data.message,skin: 'msg',time: 2});
          		}
          	},"json");
        }
      }
    }
}
</script>
