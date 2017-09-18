<template>
  <nav class="nav-bar nav-bar-tab" id="footerTab">
      <a v-on:click="toggle(0,'首页')" class="nav-tab-item">
          <span class="nav-icon micon-main-tab micon-main-index active"></span>
          <span class="nav-tab-label">首页</span>
      </a>
	    <a v-on:click="toggle(1,'车主')" class="nav-tab-item">
	        <span class="nav-icon micon-main-tab micon-main-driver"></span>
	        <span class="nav-tab-label">车主</span>
	    </a>
	    <a v-on:click="toggle(2,'服务')" class="nav-tab-item">
	        <span class="nav-icon micon-main-tab micon-main-service"><span class="nav-badge" style="display:none">0</span></span>
	        <span class="nav-tab-label">服务</span>
	    </a>
	    <a v-on:click="toggle(3,'推广')" class="nav-tab-item">
	        <span class="nav-icon micon-main-tab micon-main-promote"></span>
	        <span class="nav-tab-label">推广</span>
	    </a>
	    <a v-on:click="toggle(4,'统计')" class="nav-tab-item">
	        <span class="nav-icon micon-main-tab micon-main-report"></span>
	        <span class="nav-tab-label">统计</span>
	    </a>
	</nav>
</template>

<script>
  import { Tabbar,TabbarItem } from 'vux'
  import $ from 'jquery'
  export default{
    name: 'AppFooter',
    components: {
      Tabbar,
      TabbarItem,
    },
    data(){
      return{
      }
    },
    methods: {
        toggle: function (index,model) {
           //this.siblings('.nav-tab-item').removeClass("nav-active");
           $("#footerTab .nav-tab-item").removeClass("nav-active");
           $("#footerTab .nav-tab-item:eq("+index+")").addClass("nav-active");
           $("#footerTab .micon-main-tab").removeClass("active");
           $("#footerTab .micon-main-tab:eq("+index+")").addClass("active");
           this.$emit('toggle',index,model);
        }
    }
  }
</script>
