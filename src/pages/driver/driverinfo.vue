<template>
<div>

  <!-- 个人信息 -->
	<div class="firmDetails" id="userinfo">

    <div class="circle2-head" style="height:8rem;">
      <div class="Frjbg">
         <img src="./../../images/driver/bg_driver.png">
      </div>
      <div class="user-img" id="picurl" style="margin:5rem 0 0 0.8rem">
        <img src="./../../images/epsot_logo.jpg" />
      </div>
        <router-link slot="left" to="/home?modelIndex=1" class="return" ><i class="icon-angle-left"></i></router-link>
    </div>
    <div style="border-bottom:0.4rem solid #E7E5E5;height:3rem;font-size:0.7rem;color:#999999;">
      <span style="font-size:0.85rem;color:#333333;margin-left:25%;padding:0.3rem;" class="drivername">--</span>
      <span style="float:right;margin-right:0.6rem;padding:0.3rem;" class="plateno">--</span>
      <p style="margin-left:25%;padding:0.3rem;" class="carbrand">--</p>
    </div>
		<div class="firmD-tab">
			<!-- tab nav -->
      <!-- <scroller lock-y :scrollbar-x='false' ref="scroller">
         <tab :line-width=2 active-color='#06C1AE' v-model="tabindex">
           <tab-item @click.native="tabToggle(tabindex)" class="vux-center" :selected="tabName === item" v-for="(item, tabindex) in tabList" @click="tabName = item" :key="tabindex">{{item}}</tab-item>
         </tab>
      </scroller> -->
      <ul id="tab_btn" class="tab-list">
          <li class="pick" @click="tabToggle(0)"><span class="micon-diver-tab micon-diver-info active"></span><p>基本信息</p></li>
          <li @click="tabToggle(1)"><span class="micon-diver-tab micon-diver-obd"></span><p>OBD信息</p></li>
          <li @click="tabToggle(2)"><span class="micon-diver-tab micon-diver-fault"></span><p>故障信息</p></li>
      </ul>
      <!-- tab nav end-->
      <ul>
        <li class="basicinfo" v-show="tabindex == 0">
          <div class="firmD-menu">
						<ul class="vconlist">
							<li>
								<label>昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</label>
								<span class="vcon-content" id="nickname"/></span>
							</li>
							<li class="layui-form-item">
								<label>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</label>
                <span class="vcon-content" id="gender"/></span>
							</li>
							<li>
								<label>手机号码：</label>
                <span class="vcon-content" id="driverphone"/></span>
							</li>
							<li>
								<label>车&nbsp;&nbsp;牌&nbsp;&nbsp;号：</label>
                <span class="vcon-content" id="plateno"/></span>
							</li>
							<li>
								<label>车&nbsp;&nbsp;类&nbsp;&nbsp;型：</label>
                <span class="vcon-content" id="cartype"/></span>
							</li>
							<li>
								<label>注册日期：</label>
                <span class="vcon-content" id="regdate"/></span>
							</li>
							<li>
								<label>发证日期：</label>
                <span class="vcon-content" id="issuedate"/></span>
							</li>
							<div class="cl"></div>
						</ul>
					</div>
        </li>
        <li class="obdinfo" v-show="tabindex == 1">
          <div class="firmD-menu">
						<ul class="vconlist">
							<li>
								<label>水&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;温：</label>
								<input type="input" class="vcon-content inputinfo" value="--" disabled="disabled"/>
							</li>
							<li>
								<label>电瓶电压：</label>
								<input type="input" class="vcon-content inputinfo" value="--" disabled="disabled"/>
							</li>
              <li>
                <label>发动机转速：</label>
                <input type="input" class="vcon-content inputinfo" value="--" disabled="disabled"/>
              </li>
              <li>
                <label>平均耗油：</label>
                <input type="input" class="vcon-content inputinfo" value="--" disabled="disabled"/>
              </li>
              <li>
                <label>油&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;量：</label>
                <input type="input" class="vcon-content inputinfo" disabled="disabled"/>
              </li>
              <li>
                <label>累计里程：</label>
                <input type="input" class="vcon-content inputinfo" disabled="disabled"/>
              </li>
							<div class="cl"></div>
						</ul>
					</div>
        </li>
        <li class="trobleinfo" v-show="tabindex == 2">
          	<div class="firmDetails">
            <div class="datum-box">
                <div class="itemlist">
              </div>
            </div>
						<button @click="trobleCheck()" class="btn btn-max infobtn" style="margin:0 32%;position:fixed;bottom:15px;display:block;">重新检测</button>
            </div>
        </li>
      </ul>
		</div>
	</div>
</div>
</template>
<style>

.itemDetail span{
  float:left;
  border-radius: 50%;
  background: #ccc;
  color:#fff;
  margin: 1rem 1rem;
  width:2.1rem;
  height:2.1rem;
  text-align:center;
  line-height: 2rem;
}
.itemDetail .item{
  padding: 1rem 0 1rem 4rem;
  border-bottom: 1px solid #d9d9d9;
}
</style>
<script>
  import { Tab, TabItem, Swiper, SwiperItem,Scroller,Datetime } from 'vux'
  import GLOBALURL from './../../utils/global'
  import $ from 'jquery'
  import logoSrc from './../../images/epsot_logo.jpg'
  import { validIDCard,validDate,validPlateNo,validVin,initLoginStatus} from './../../utils/utils'
  const tabList = () => ['基本信息', 'OBD信息', '故障信息']
  let consumerpk = "";
  export default{
    name: 'Driverinfo',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Scroller,
      Datetime
    },
    data(){
      return{
        tabList: tabList(),
        tabName:"",
        tabindex:0,
      }
    },
    created () {
      consumerpk = this.$route.query.consumerpk;
			let consumertype  = this.$route.query.consumertype;
			if(consumertype == "1"){
				this.initOBDUserinfo(consumerpk);
				this.initOBDDatainfo(consumerpk);
				this.initOBDTrobleinfo(consumerpk);
			}else{
				this.initUserinfo(consumerpk);
			}
      sessionStorage.setItem("_prepath",this.$route.fullPath);
    },
    methods: {
      tabToggle:function(tabIndex){
        this.tabindex = tabIndex;
        $(".tab-list li:eq("+tabIndex+")").addClass("pick").siblings().removeClass("pick");
        $(".tab-list span").removeClass("active");
        $(".tab-list li:eq("+tabIndex+")").find("span").addClass("active");
      },
			trobleCheck:function(){
				this.initOBDTrobleinfo(consumerpk);
			},
      // 初始化个人详情信息
      initUserinfo:function(consumerpk){
      	var params ={
      		"consumerPK":consumerpk
      	};
      	$.post(GLOBALURL.INFO_QUERYDRIVERDETAIL_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result){
                $("#picurl img").attr("src",result[0].consumerProfileImageURL?result[0].consumerProfileImageURL:logoSrc);
                $(".carbrand").text(result[0].consumerCarInfoCarBrandShortName);
                $(".drivername").text(result[0].consumerName);
                $(".plateno").text(result[0].consumerDrivingLisPlateNo);
                $("#nickname").text(result[0].consumerNickName);
                $("#gender").text(result[0].consumerGender);
                $("#driverphone").text(result[0].consumerUsingNumber);
                $("#plateno").text(result[0].consumerDrivingLisPlateNo);
                $("#cartype").text(result[0].consumerDrivingLisVehicleType);
                $("#regdate").text(result[0].consumerDrivingLisRegDate);
                $("#issuedate").text(result[0].consumerDrivingLisIssueDate);
      		    }
      		}else if(data.statusCode == -999){
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
      	},"json");
      },
			// 初始化OBD个人详情信息
      initOBDUserinfo:function(consumerpk){
      	var params ={
      		"userpk":consumerpk
      	};
      	$.post(GLOBALURL.INFO_QUERYOBDDRIVERDETAIL_URL,params,function(data){
      		if(data.statusCode == 0){
      			var result = data.value;
      		    if(result){
								if(result.driver.users){
									var users = result.driver.users;
									var imgurl = users.userinfo.userinfoprofileimageurl;
									$("#picurl img").attr("src",imgurl?imgurl:logoSrc);
									$(".drivername").text(users.userinfo.userinfoname);
									$("#nickname").text(users.userinfo.userinfonickname);
									$("#driverphone").text(users.userphonenumber);
									$("#gender").text(users.userinfo.userinfogender);
								}
								if(result.car.drivinglisence){
									var drivinglisence = result.car.drivinglisence;
									$(".carbrand").text(drivinglisence.drivinglisencemodel);
									$(".plateno").text(drivinglisence.drivinglisenceplateno);
									$("#plateno").text(drivinglisence.drivinglisenceplateno);
									$("#cartype").text(drivinglisence.drivinglisenceusecharacter);
									$("#regdate").text(drivinglisence.drivinglisenceregdate);
									$("#issuedate").text(drivinglisence.drivinglisenceissuedate);
								}

      		    }
      		}else if(data.statusCode == -999){
      		}else{
      			layer.open({content:data.message,skin: 'msg',time: 2});
      		}
      	},"json");
      },
			// 初始化OBD详情信息
			initOBDDatainfo:function(consumerpk){
				var formatData = this.formatData;
				var params ={
					"userPK":consumerpk
				};
				$.post(GLOBALURL.INFO_QUERYOBDDATADETAIL_URL,params,function(data){
					if(data.statusCode == 0){
						var result = data.value;
							if(result && result.length>0 ){
								$(".obdinfo input:eq(0)").val(formatData(result[0].obdwatertemperature,0)+"℃");
								$(".obdinfo input:eq(1)").val(formatData(result[0].obdbatteryvolt,0)+"V");
								$(".obdinfo input:eq(2)").val(formatData(result[0].obdrev,0)+"rpm");
								$(".obdinfo input:eq(3)").val(formatData(result[0].obdavgoilperhundredkm,0)+"L/km");
								$(".obdinfo input:eq(4)").valval(formatData(result[0].obdoilpercent,0)+"%");
								$(".obdinfo input:eq(5)").val(formatData(result[0].obdtotalmile,0)+"km");
							}
					}else if(data.statusCode == -999){
					}else{
						layer.open({content:data.message,skin: 'msg',time: 2});
					}
				},"json");
			},
			// 初始化OBD故障信息
			initOBDTrobleinfo:function(consumerpk){
				var params ={
					"userPK":consumerpk
				};
				var loading = layer.open({type: 2});
				$.post(GLOBALURL.INFO_QUERYOBDNEWTROUBLE_URL,params,function(data){
					if(data.statusCode == 0){
						var result = data.value;
						var html = "";
						if(result && result.length>0 ){
							for(var i=0;i<result.length;i++){
								html +="<div class=\"itemDetail\">";
								html +="	<span>详情</span>";
								html +="	<div class=\"item\">";
								html +="		<p class=\"trobleId\">• "+result[i].obdtroublecodetypename+"</p>";
								html +="		<p class=\"trobleBrif\">• "+result[i].obdtroublecodebreif+"。</p>";
								html +="	</div>";
								html +="</div>";
							}
						}else{
							html +="<div style=\"text-align:center;margin-top:4rem;\">暂无故障信息</div>";
						}
						$(".trobleinfo .itemlist").html(html);
					}else if(data.statusCode == -999){
					}else{
						layer.open({content:data.message,skin: 'msg',time: 2});
					}
					// 等待层
					setTimeout(function(){
						layer.close(loading);
					},200);
				},"json");
			},
			// 格式数据
			formatData:function(dataValue,dataType){
				var steerData = {"1":"左","2":"右","3":"中"};
				var controlData = {"0":"未按","1":"开锁","2":"关锁","3":"尾箱锁","4":"长按开锁","5":"长按关锁"};
				var stallData = {"1":"P档","2":"R档","3":"N档","4":"D档"};
				var result = "--";
				//if(result){
					if(dataType == 0){
						result = dataValue?dataValue:"0";
					}else if(dataType == 1){
						result = (dataValue==1)?"打开":"关闭";
					}else if(dataType == 2){
						result = (dataValue==1)?"锁":"未锁";
					}else if(dataType == 3){
						result = (dataValue==1)?"引爆":"正常";
					}else if(dataType == 4){
						result = (dataValue==1)?"制动":"未制动";
					}else if(dataType == 5){
						result = (dataValue==1)?"扣":"未扣";
					}else if(dataType == 6){
						result = (dataValue==1)?"插入":"未插入";
					}else if(dataType == 7){
						result = (dataValue==1)?"故障":"正常";
					}else if(dataType == 8){
						result = (dataValue==1)?"踩下":"未踩";
					}else if(dataType == 9){
						result = steerData[dataValue]?steerData[dataValue]:"--";
					}else if(dataType == 10){
						result = controlData[dataValue]?controlData[dataValue]:"--";
					}else if(dataType == 11){
						result = stallData[dataValue]?stallData[dataValue]:"--";
					}
				//}
				return result;
			}
    }
}
</script>
