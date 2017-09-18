<template>
  <div>
     <ul id="tab_btn" class="tab-list">
         <li class="pick" @click="tabToggle(0)"><span class="micon-report-tab micon-report-maintenance active"></span><p>保养报表</p></li>
         <li @click="tabToggle(1)"><span class="micon-report-tab micon-report-fault"></span><p>故障率报表</p></li>
         <li @click="tabToggle(2)"><span class="micon-report-tab micon-report-health"></span><p>健康报表</p></li>
     </ul>
     <div class="queryStyle">
       <div class="quertTime"><span>日</span><span>周</span><span class="active">月</span></div>
       <p class="vux-divider"></p>
     </div>
     <!-- <transition-group name="fold" tag="div">
       <div v-show="tabindex === 0" v-bind:key="tabindex" id="bayang" @click="tabToggle(0)"></div>
       <div v-show="tabindex === 1" v-bind:key="tabindex" id="guzhang" @click="tabToggle(1)"></div>
       <div v-show="tabindex === 2" v-bind:key="tabindex" id="jiankang" @click="tabToggle(2)"></div>
     </transition-group> -->
     <div>
       <div class="reportChart" id="bayang" ></div>
       <div class="reportChart" id="guzhang" style="display:none;"></div>
       <div class="reportChart" id="jiankang" style="display:none;"></div>
     </div>
  </div>
</template>
<style scoped>
  #bayang,#guzhang,#jiankang {
    position: relative;
    left: 50%;
    width: 90%;
    height: 18rem;
    margin-left: -45%;
    box-shadow: 0 0 10px #06C1AE;
    border-radius: 10px;
    margin-top: 0.4rem;
  }
</style>
<style>
.queryStyle .quertTime{
    border:1px solid #E3E3E3;
    margin: 0.6rem 1rem;
    border-radius: 0.2rem;
}
.queryStyle p{
    text-align: center;
}
.queryStyle span{
  width:4.7rem;
  background: #FBFCFB;
  padding: 0.2rem 0.4rem;
  text-align: center;
  display: inline-block;
  border-right: 1px solid #E3E3E3;
}
.queryStyle span.active{
  width:4.7rem;
  background: #E3E3E3;
  padding: 0.2rem 0.4rem;
  text-align: center;
  display: inline-block;
  border-right: 1px solid #E3E3E3;
}
</style>
<script>
  import echarts from 'echarts'
  import GLOBALURL from '../utils/global'
  import $ from 'jquery'
  let merchantspk = ""
  const tabList = () => ['保养报表', '故障率报表', '健康报表']

  export default{
    name: 'Report',
    data(){
      return{
        tabindex:0,
        chart: null
       }
    },
    components:{
    },
    created () {
      var userInfo = sessionStorage.getItem("userInfo");
      if(userInfo) {
        userInfo = JSON.parse(userInfo);
        merchantspk = userInfo.merchantspk;
        this.initMaintainReport();
        this.initTrobleReport();
        this.initHealthReport();
      }
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    mounted() {
    },
    methods:{
      tabToggle:function(tabIndex){
        this.tabindex = tabIndex;
        $(".reportChart:eq("+tabIndex+")").show().siblings().hide();
        $(".tab-list li:eq("+tabIndex+")").addClass("pick").siblings().removeClass("pick");
        $(".tab-list span").removeClass("active");
        $(".tab-list li:eq("+tabIndex+")").find("span").addClass("active");
        if(tabIndex == 0){
          this.initMaintainReport();
        }else if(tabIndex == 1){
          this.initTrobleReport();
        }else{
          this.initHealthReport();
        }
      },
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
      initMaintainReport:function(){
        var drawMaintainReport = this.drawMaintainReport;
        $.post(GLOBALURL.LIST_QUERYMAINTAINREPORT_URL,{"merchantsPK":merchantspk},function(data){
              if(data.statusCode == 0){
                var result = data.value;
                drawMaintainReport(result);
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
        },"json");
      },
      initTrobleReport:function(){
        var drawTrobleReport = this.drawTrobleReport;
        $.post(GLOBALURL.LIST_QUERYTROBLEREPORT_URL,{"merchantsPK":merchantspk},function(data){
              if(data.statusCode == 0){
                var result = data.value;
                drawTrobleReport(result);
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
        },"json");
      },
      initHealthReport:function(){
        var drawHealthReport = this.drawHealthReport;
        $.post(GLOBALURL.LIST_QUERYHEALTHREPORT_URL,{"merchantsPK":merchantspk},function(data){
              if(data.statusCode == 0){
                var result = data.value;
                drawHealthReport(result);
              }else{
                layer.open({content:data.message,skin:'msg',time: 2});
              }
        },"json");
      },
      drawMaintainReport:function(value) {
         this.chart = echarts.init(document.getElementById('bayang'),'vintage');
         this.chart.setOption({
           title : {
               text: '',
               subtext: ''
           },
           tooltip : {
               trigger: 'axis'
           },
           legend: {
               data:['保养','首保','事故','召回','维修']
           },
           toolbox: {
               show : false,
               feature : {
                   mark : {show: true},
                   dataView : {show: true, readOnly: false},
                   magicType : {show: true, type: ['line', 'bar']},
                   restore : {show: true},
                   saveAsImage : {show: true}
               }
           },
           calculable : true,
           xAxis : [
               {
                   type : 'category',
                   data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
               }
           ],
           yAxis : [
               {
                   type : 'value'
               }
           ],
           series : [
               {
                   name:'保养',
                   type:'bar',
                   data:value[0],
                   markPoint : {
                       data : [
                           {type : 'max', name: '最大值'},
                           {type : 'min', name: '最小值'}
                       ]
                   }
               },
               {
                   name:'首保',
                   type:'bar',
                   data:value[1],
                   markPoint : {
                       data : [
                            {type : 'max', name: '最大值'},
                          {type : 'min', name: '最小值'}
                       ]
                   }
               }
           , {
                   name:'事故',
                   type:'bar',
                   data:value[2],
                   markPoint : {
                       data : [
                           {type : 'max', name: '最大值'},
                         {type : 'min', name: '最小值'}
                       ]
                   }

           }
           , {
                   name:'召回',
                   type:'bar',
                   data:value[3],
                   markPoint : {
                       data : [
                           {type : 'max', name: '最大值'},
                         {type : 'min', name: '最小值'}
                       ]
                   }

           }
           , {
                   name:'维修',
                   type:'bar',
                   data:value[4],
                   markPoint : {
                       data : [
                           {type : 'max', name: '最大值'},
                         {type : 'min', name: '最小值'}
                       ]
                   }

           }
       ]});
     },
     drawTrobleReport:function(value) {
         this.chart = echarts.init(document.getElementById('guzhang'),'vintage');
         this.chart.setOption({
             title : {
                 text: '',
                 subtext: ''
             },
             tooltip : {
                 trigger: 'axis'
             },
             legend: {
                 data:['引擎系统','底盘系统','车身系统','网路系统','其他']
             },
             toolbox: {
                 show : false,
                 feature : {
                     mark : {show: true},
                     dataView : {show: true, readOnly: false},
                     magicType : {show: true, type: ['line', 'bar']},
                     restore : {show: true},
                     saveAsImage : {show: true}
                 }
             },
             calculable : true,
             xAxis : [
                 {
                     type : 'category',
                     data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                 }
             ],
             yAxis : [
                 {
                     type : 'value'
                 }
             ],
             series : [
                 {
                     name:'引擎系统',
                     type:'bar',
                     data:value[1],
                     markPoint : {
                         data : [
                             {type : 'max', name: '最大值'},
                             {type : 'min', name: '最小值'}
                         ]
                     }
                 },
                 {
                     name:'底盘系统',
                     type:'bar',
                     data:value[2],
                     markPoint : {
                         data : [
                              {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                         ]
                     },
                 }
             , {
                     name:'车身系统',
                     type:'bar',
                     data:value[3],
                     markPoint : {
                         data : [
                             {type : 'max', name: '最大值'},
                           {type : 'min', name: '最小值'}
                         ]
                     },

             }
             , {
                     name:'网路系统',
                     type:'bar',
                     data:value[4],
                     markPoint : {
                         data : [
                              {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                         ]
                     },

               }
             , {
                    name:'其他系统',
                    type:'bar',
                    data:value[0],
                    markPoint : {
                        data : [
                             {type : 'max', name: '最大值'},
                           {type : 'min', name: '最小值'}
                        ]
                      },
               }
       ]});
      },
      drawHealthReport:function(value){
			    this.chart = echarts.init(document.getElementById('jiankang'),'vintage');
			    this.chart.setOption({
  			    title : {
  			        text: '',
  			        subtext: ''
  			    },
  			    tooltip : {
  			        trigger: 'axis'
  			    },
  			    legend: {
  			        data:['100-90','90-80','80-70','70-60','60以下']
  			    },
  			    toolbox: {
  			        show : false,
  			        feature : {
  			            mark : {show: true},
  			            dataView : {show: true, readOnly: false},
  			            magicType : {show: true, type: ['line', 'bar']},
  			            restore : {show: true},
  			            saveAsImage : {show: true}
  			        }
  			    },
  			    calculable : true,
  			    xAxis : [
  			        {
  			            type : 'category',
  			            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
  			        }
  			    ],
  			    yAxis : [
  			        {
  			            type : 'value'
  			        }
  			    ],
			      series : [
			        {
			            name:'100-90',
			            type:'bar',
			            data:value.wonderful,
			            markPoint : {
			                data : [
			                    {type : 'max', name: '最大值'},
			                    {type : 'min', name: '最小值'}
			                ]
			            }
			        },
			        {
			            name:'90-80',
			            type:'bar',
			            data:value.good,
			            markPoint : {
			                data : [
			                    {type : 'max', name: '最大值'},
				                  {type : 'min', name: '最小值'}
			                ]
			            },
			        },
					    {
		            name:'80-70',
		            type:'bar',
		            data:value.normal,
		            markPoint : {
		                data : [
		                    {type : 'max', name: '最大值'},
			                  {type : 'min', name: '最小值'}
		                ]
		            },
					   },
				     {
		            name:'70-60',
		            type:'bar',
		            data:value.bad,
		            markPoint : {
		                data : [
		                   {type : 'max', name: '最大值'},
			                 {type : 'min', name: '最小值'}
		                ]
		            },
					   },
					   {
				         name:'60以下',
				         type:'bar',
				         data:value.terrible,
				         markPoint : {
				            data : [
				                 {type : 'max', name: '最大值'},
		                     {type : 'min', name: '最小值'}
			                ]
				         },
					   }
          ]});
			},
    },
  }
</script>
