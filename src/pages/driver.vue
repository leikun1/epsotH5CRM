<template>
   <div class="contact">
      <!--通讯录搜索栏-->
      <div class="contact-search">
         <select id="searchKey" @change="driverTypeChange()">
            <option value="0">车机用户</option>
            <option value="1">普通用户</option>
         </select>
         <i class="icon-caret-down"></i>
       </div>
       <!--通讯录搜索栏end-->
       <!--联系人-->
       <div class="contact-content" id="driverList">

           <div class="Letter-jump">
           </div>
        </div>
        <!--联系人end-->
        <!--字母检索列表-->
        <div class="letter-search">
          <ul>
             <a href="javascript:void(0);"><li>A</li></a>
               <a href="javascript:void(0);"><li>B</li></a>
               <a href="javascript:void(0);"><li>C</li></a>
               <a href="javascript:void(0);"><li>D</li></a>
               <a href="javascript:void(0);"><li>E</li></a>
               <a href="javascript:void(0);"><li>F</li></a>
               <a href="javascript:void(0);"><li>G</li></a>
               <a href="javascript:void(0);"><li>H</li></a>
               <a href="javascript:void(0);"><li>I</li></a>
               <a href="javascript:void(0);"><li>J</li></a>
               <a href="javascript:void(0);"><li>K</li></a>
               <a href="javascript:void(0);"><li>L</li></a>
               <a href="javascript:void(0);"><li>N</li></a>
               <a href="javascript:void(0);"><li>M</li></a>
               <a href="javascript:void(0);"><li>O</li></a>
               <a href="javascript:void(0);"><li>P</li></a>
               <a href="javascript:void(0);"><li>Q</li></a>
               <a href="javascript:void(0);"><li>R</li></a>
               <a href="javascript:void(0);"><li>S</li></a>
               <a href="javascript:void(0);"><li>T</li></a>
               <a href="javascript:void(0);"><li>U</li></a>
               <a href="javascript:void(0);"><li>V</li></a>
               <a href="javascript:void(0);"><li>W</li></a>
               <a href="javascript:void(0);"><li>X</li></a>
               <a href="javascript:void(0);"><li>Y</li></a>
               <a href="javascript:void(0);"><li>Z</li></a>
             </ul>
           </div>
          <!--字母检索列表end-->
    </div>
</template>
<style>
#driverList .card_ecchange{
  border-bottom:1px solid #f1f1f1;
}
#driverList .card_ecchange span{
  margin-right: 0.5rem;
}
</style>
<script>
  import { Group,Cell,Swiper,Scroller,Divider } from 'vux'
  import GLOBALURL from '../utils/global'
  import $ from 'jquery'
  import logoSrc from '../images/epsot_logo.jpg'

  export default{
    name: 'Index',
    data(){
      return{
        pageIndex:1
      }
    },
    components:{
      Scroller,
      Cell,
      Group,
      Divider,
      Swiper
    },
    created () {
      this.initOBDDriverList();
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
          var type = $("#searchKey").val();
          if(type == 0){
            this.initOBDDriverList();
          }else{
            this.initDriverList();
          }
      },
      doSearch:function(){
        var searchKey = $("#searchKey").val();
        if(searchKey == ""){
          layer.open({content:'搜索名称不能为空',skin:'msg',time: 2});
        }else{
          this.initDriverList(searchKey);
        }
      },
      initDriverList:function(searchKey){
        let userInfo = sessionStorage.getItem("userInfo");
        let router =  this.$router;
        let userpk = "";
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
          let params = {
            "merchantsPK":userInfo.merchantspk,
            "name":searchKey,
            "nickName":"",
            "usingNumber":"",
            "landLine":"",
            "beginNum":1,
            "queryNum":10
          }
          var loading = layer.open({type: 2});
          $.post(GLOBALURL.INFO_QUERYDRIVERLIST_URL,params,function(data){
             if(data.statusCode == 0){
               var result = data.value;
               //  var html = "<a name=\"A\" class=\"letter-a\">A</a>";
               var html = "";
               if(result && result.length>0){
                 for(let i=0;i<result.length;i++){
                   var imgurl = result[i].consumerprofileimageurl?result[i].consumerprofileimageurl:logoSrc;
                   html += "<a class=\"card_ecchange plus-pass nav-icon\" data-pk="+result[i].consumerpk+">";
                   html += "  <i class=\"images_card\"><img src="+imgurl+"></i>";
                   //  html += "  <em class=\"nav-badge\">1</em>";
                   html += "  <h1>"+result[i].consumername+"</h1>";
                   html += "  <p>"+result[i].consumerusingnumber+"</p>";
                   html += "</a>";
                 }
               }else{
                   html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
               }

               $("#driverList .Letter-jump").html(html);
               $("#driverList .card_ecchange").click(function(){
                  var consumerpk = $(this).attr("data-pk");
                  var consumertype = "0";
                  router.replace({path:"/driver/driverinfo",query:{consumerpk:consumerpk,consumertype:consumertype}});
               });
             }else if(data.statusCode == -999){
             }else{
               layer.open({content:data.message,skin:'msg',time: 2});
             }
              // 等待层
              setTimeout(function(){
                layer.close(loading);
              },200);
            },"json");
        }
      },
      initOBDDriverList:function(searchKey){
        let userInfo = sessionStorage.getItem("userInfo");
        let router =  this.$router;
        let userpk = "";
        if (userInfo) {
          userInfo = JSON.parse(userInfo);
          let params = {
            "merchantsPK":userInfo.merchantspk,
            "userName":searchKey,
            "userPhone":"",
            "beginNum":1,
            "queryNum":10
          }
          var loading = layer.open({type: 2});
          $.post(GLOBALURL.INFO_QUERYOBDDRIVERLIST_URL,params,function(data){
             if(data.statusCode == 0){
               var result = data.value;
               //  var html = "<a name=\"A\" class=\"letter-a\">A</a>";
               var html = "";
               if(result && result.length>0){
                 for(let i=0;i<result.length;i++){
                   var imgurl = result[i].userinfo.userinfoprofileimageurl?result[i].userinfo.userinfoprofileimageurl:logoSrc;
                   html += "<a class=\"card_ecchange plus-pass nav-icon\" data-pk="+result[i].userpk+">";
                   html += "  <i class=\"images_card\"><img src="+imgurl+"></i>";
                   //  html += "  <em class=\"nav-badge\">1</em>";
                   html += "  <h1>"+result[i].userinfo.userinfonickname+"</h1>";
                   html += "  <p>"+result[i].userphonenumber+"</p>";
                   html += "</a>";
                 }
               }else{
                 html += "<div id=\"nodata\"><a class=\"imgconfig\"></a><span class=\"textconfig\">暂无数据</span></div>";
               }
               $("#driverList .Letter-jump").html(html);
               $("#driverList .card_ecchange").click(function(){
                  var consumerpk = $(this).attr("data-pk");
                  var consumertype = "1";
                  router.replace({path:"/driver/driverinfo",query:{consumerpk:consumerpk,consumertype:consumertype}});
               });
             }else if(data.statusCode == -999){
             }else{
               layer.open({content:data.message,skin:'msg',time: 2});
             }
              // 等待层
              setTimeout(function(){
                layer.close(loading);
              },200);
            },"json");
        }
      },
      pinyinCompare:function(val1,val2) {
          // 转换为拼音
          val1 = Pinyin.getFullChars(val1).toLowerCase();
          val2 = Pinyin.getFullChars(val2).toLowerCase();

          // 获取较长的拼音的长度
          var length =  val1.length > val2.length ? val1.length:val2.length ;

          // 依次比较字母的unicode码，相等时返回0，小于时返回-1，大于时返回1
          for(var i = 0; i < length; i++ ) {
              var differ = val1.charCodeAt(i) - val2.charCodeAt(i);
              if(differ == 0) {
                  continue;
              }else {
                  if(val1.charAt(i) == '_' ) {
                      return -1;
                  }
                  return differ;
              }
          }
          if(i == length) {
              return val1.length - val2.length;
          }
      },
    }
  }
</script>
