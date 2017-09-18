<template>
<div>
  <header>
      <div class="header">
          <h1>优惠券管理</h1>
          <router-link slot="left" to="/home?modelIndex=3" class="return" ><i class="icon-chevron-left"></i></router-link>
      </div>
  </header>
  <div style="height: 2.5rem;"></div>

	<div class="datum-box">
		<ul class="datum-list">
      <li class="dropdown">
				<a href="javascript:void(0);">
				  <h1 @click="pageTurn('../promote/couponlist')" data-toggle="dropdown" class="vtitle"><i class="ba-color micon-coupon1"></i><b>优惠券发布</b><span class="icon-angle-right"></span></h1>
				</a>
			</li>
			<li class="dropdown">
				<a href="javascript:void(0);">
					<h1 @click="pageTurn('../promote/couponorder')" data-toggle="dropdown" class="vtitle"><i class="ba-color micon-coupon2"></i><b>优惠券订单</b><span class="icon-angle-right"></span></h1>
				</a>
			</li>
			<li class="dropdown">
				<a href="tel:120">
				  <h1 @click="pageTurn('')" data-toggle="dropdown" class="vtitle"><i class="ba-color micon-coupon3"></i><b>优惠券使用</b><span class="icon-angle-right"></span></h1>
				</a>
			</li>
		</ul>
	</div>
	<!--救援电话end-->

</div>
</template>

<script>

  export default{
    name: 'Couponinfo',
    components: {
    },
    data(){
      return{
      }
    },
    created () {
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      pageTurn:function(turnPath,needLogin){
        var userInfo = sessionStorage.getItem("userInfo");
        if(needLogin && !userInfo){
          layer.open({content:'请您先登录...',skin:'msg',time: 2});
        }else if(turnPath){
          this.$router.replace({path:turnPath})
        }else {
          layer.open({content:'程序猿正在玩命开发中...',skin:'msg',time: 2});
        }
      }
    }
}
</script>
