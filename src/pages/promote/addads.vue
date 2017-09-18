<template>
<div>
  <header>
      <div class="header">
          <h1>广告发布</h1>
          <router-link slot="left" to="/promote/adsinfo" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

  <div class="g-Give" style="background-color:#fff;border-top:0.6rem solid #EFEFF4;">
      <form method="get">
    		<p style="margin-left:0.8rem;padding:0.2rem 0;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>广告标题</span></p>
    		<div class="firmIntro-box">
    			 <input style="padding:0.4rem 0.4rem;width:96%;" id="adsTitle" type="text" placeholder="标题长度 3 - 20 字符">
    		</div>
    		<p style="margin-left:0.8rem;padding:0.2rem 0;width:96%;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>广告简介</span></p>
    		<div class="firmIntro-box">
    			<textarea style="border:1px solid rgba(0,0,0,.2);padding:0.4rem 0.4rem;" id="adsDescribe" rows="4" placeholder="在这里输入广告简介"></textarea>
    		</div>
        <p style="margin-left:0.8rem;padding:0.2rem 0;"><em class="lineStyle" style="margin:0.2rem 0;"></em><span>广告资源</span></p>
        <div class="firmLicense-box" style="background-color:#fff;margin:5px 0;padding:0.4rem 0">
						<a href="javascript:;" class="Pu-Add-img" style="margin:0 40%;">
							<img src="../../images/add-img.png">
							<input type="file">
						</a>
				</div>
    		<a href="javascript:;" class="btn btn-max" style="margin:.5rem 0;background-color:#06C1AE;" id="addAds" @click="addAds">发布</a>
      </form>
  </div>

</div>
</template>

<script>
  import GLOBALURL from '../../utils/global'
  import logoSrc from './../../images/epsot_logo.jpg'
  import $ from 'jquery'

  export default{
    name: 'Addads',
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
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      addAds:function(){
        var router = this.$router;
        var userpk = this.userpk;
        var adsTitle = $("#adsTitle").val();
        var adsDescribe = $("#adsDescribe").val();
        if(adsTitle == ""){
          layer.open({content:"广告标题不能为空",skin: 'msg',time: 2});
        }else if(adsTitle.length < 3 || adsTitle.length > 20){
          layer.open({content:"广告标题长度为3-20个字符",skin: 'msg',time: 2});
        }else if(adsDescribe == ""){
          layer.open({content:"广告描述不能为空",skin: 'msg',time: 2});
        }else if(adsDescribe > 30){
          layer.open({content:"广告描述不能超过30个字符",skin: 'msg',time: 2});
        }else{
            // var params = {
          	// 	"driverId":userpk,
          	// 	"groupName":groupName,
          	// 	"description":groupDescribe,
          	// 	"platform":"3"
          	// };
          	// $.post(GLOBALURL.CREATE_GROUP,params,function(data){
          	// 	if(data.statusCode == 0){
          	// 		layer.open({content:data.message,skin: 'msg',time: 2});
          	// 		$("#groupName").val("");
          	// 		$("#groupDescribe").val("");
            //     router.replace({path:"/home?modelIndex=1"});
          	// 	}else if(data.statusCode == -999){
          	// 	}else{
          	// 		layer.open({content:data.message,skin: 'msg',time: 2});
          	// 	}
          	// },"json");
        }
      }
    }
}
</script>
