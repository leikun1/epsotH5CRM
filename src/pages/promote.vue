<template>
    <div class="all_box all_boxNodown">
      <div class="promoteItem" @click="pageTurn('promote/adsinfo')">
        <img src="../images/promote/img_promote_ad.png"/>
        <p class="promoteText">广告发布</p>
      </div>
      <div class="promoteItem" @click="pageTurn('promote/msginfo')">
        <img src="../images/promote/img_promote_infor.png"/>
        <p class="promoteText">资讯推送</p>
      </div>
      <div class="promoteItem" @click="pageTurn('promote/couponinfo')">
        <img src="../images/promote/img_promote_coupon.png"/>
        <p class="promoteText">优惠券管理</p>
      </div>
      <div class="promoteItem" @click="pageTurn()">
        <img src="../images/promote/img_promote_integral.png"/>
        <p class="promoteText">积分管理</p>
      </div>
	 </div>
</template>
<style>
  .promoteItem{
    width: 44.5%;
    float:left;
    margin:0.4rem 0.2rem 0.4rem 0.6rem;
  }
  .promoteItem p{
    text-align: center;
  }
</style>
<script>
  import $ from 'jquery'

  export default{
    name: 'Promote',
    data(){
      return{
      }
    },
    components:{
    },
    created () {
    },
    methods:{
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

    }
  }
</script>
