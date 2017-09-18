<template>
<div class="micon-service-loginbg">
  <!-- <header>
      <div class="header">
          <h1>登录</h1>
          <router-link slot="left" to="/" class="return" ><i class="icon-chevron-left"></i></router-link>
          <a @click="loginOut" href="javascript:void(0);" class="return" style="float:right;right:0;left:inherit;"><i class="icon-off"></i></a>
      </div>
  </header>
  <div style="height: 2.5rem;"></div> -->
  <div class="login-box" id="loginPage" >
       <div class="head-login">
         <div class="logo">
             <img :src="picurl" style="width:6rem;height:6rem;">
         </div>
       </div>
       <div class="login">
        <div id="login" class="input-group register-group">
          <div class="input-row">
             <label><i class="icon-tablet" style="color:#fff;"></i></label>
             <input id="username" type="text" placeholder="请输入用户名" v-model="username" style="background-color:transparent;color:#fff;">
           </div>
           <div class="input-row">
             <label><i class="icon-lock" style="color:#fff;"></i></label>
             <input id="password" type="password" placeholder="请输入登录密码" v-model="password" style="background-color:transparent;color:#fff;">
           </div>
           <button id="doLogin" type="button" class="btn cy-btn btn-red" style="background-color:#70DDD9!important;line-height:1.6rem;" @click="submitLogin">登录</button>
         </div>
         <div class="login-reg">
               <!-- <router-link slot="forgetpwd" to="/user/forgetpwd" class="reg-left" style="color:#fff;">忘记密码?</router-link> -->
               <!-- <router-link slot="register" to="/user/register" class="reg-right" style="color:#fff;">注册账号</router-link> -->
         </div>
       </div>
   </div>
</div>
</template>
<style>

input::-webkit-input-placeholder {
     color: #E9E9E9;
     font-size: 0.7rem;
 }
</style>
<script>
  import GLOBALURL from '../../utils/global'
  import $ from 'jquery'
  import logoSrc from './../../images/img_login_logo.png'
  import { initLoginStatus } from '../../utils/utils'


  export default{
    name: 'Login',
    components: {
    },
    data(){
      return{
        username:"",
        password:"",
        picurl:logoSrc
      }
    },
    created () {
      	var userInfo = sessionStorage.getItem("userInfo");
        if (userInfo) {
        	userInfo = JSON.parse(userInfo);
        	//this.picurl = userInfo.myCarMerchantsInfo.mycarstoreinfomainimage?userInfo.myCarMerchantsInfo.mycarstoreinfomainimage:logoSrc;
          this.username = userInfo.merchantsaccount;
        }else{
        	this.picurl = logoSrc;
          this.username = "";
        }
        sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      // 退出登录
      loginOut: function(){
        layer.open({
          content: '是否确认退出登录?'
          ,btn: ['确定', '取消']
          ,yes: function(index){
            layer.close(index);
            $('#loginPage .logo img').attr('src', logoSrc);
            $("#username").val("");
            sessionStorage.removeItem('userInfo');
            layer.open({content:'退出成功',skin: 'msg',time: 2});
          }
        });
      },
      // 前往登录
      submitLogin: function () {
          if(this.username == ""){
            layer.open({content:'登录账号不能为空',skin:'msg',time: 2});
          }else if(this.password == ""){
            layer.open({content:'登录密码不能为空',skin:'msg',time: 2});
          }else if(!/^[0-9A-Za-z]{6,12}$/i.test(this.password)){
            layer.open({content:'登录密码必须为6~12位数字或字母组成',skin: 'msg',time: 2});
          }else{
            this.doLogin(this.username,this.password);
          }
      },
      // 调用登录接口
      doLogin(userName,passWord){
        var loading = layer.open({type: 2});
        var router = this.$router;
        $.post(GLOBALURL.LOGIN_QUERYEKEY_URL,{"keyType":"rsa"},function(data){
          if(data.statusCode == 0){
            var result = data.value;
            var modulus = result.modulus;
            var publicExponent = result.publicExponent;
            var loginPassword = rsaEncrypt(publicExponent,modulus,$.trim(passWord));
            $.post(GLOBALURL.LOGIN_DOLOGIN_URL,{"merchantsAccount":userName,"merchantsPassword":loginPassword,"platform":"3"},function(data){
                if(data.statusCode == 0){
                     var userInfo = data.merchants;
                     if(userInfo){
                       userInfo = JSON.stringify(userInfo);
                       sessionStorage.setItem("userInfo",userInfo);
                       var _userAccount = {
                         "_userName":userName,
                         "_passWord":passWord
                       };
                       localStorage.setItem("_userAccount",JSON.stringify(_userAccount));
                     }
                     router.replace({ path: '/home' })
                  }else{
                    layer.open({content:data.message,skin:'msg',time: 2});
                  }
              },"json");
            }else{
              layer.open({content:data.message,skin:'msg',time: 2});
            }
         },"json");
         // 等待层
         setTimeout(function(){
           layer.close(loading);
         },500);
      }
    }
}
</script>
