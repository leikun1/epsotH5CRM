
// 8080 环境
//var SURL = "http://www.epsot.cn/epsotServerV2.0/";
//var CRMSURL:"http://120.24.41.89:8080/epsotCRMServer/";

// 9690 环境
var SURL = "http://120.25.226.96:8090/epsotServerV2.0/";
var CRMSURL = "http://120.25.226.96:8090/epsotCRMServer/";

// 笑笑生本地环境
//var SURL = "http://192.168.2.12:8080/epsotServerV2.0/";
//var CRMSURL = "http://192.168.2.12:8080/epsotCRMServer/";

let GLOBALURL = {

  //登录
  LOGIN_QUERYEKEY_URL: CRMSURL +  "loginModel/doQueryEncryptKey",
  LOGIN_DOLOGIN_URL: CRMSURL +  "loginModel/doMerchantsLogin",
  LOGIN_UPDATEPASSWORD_URL: CRMSURL +  "loginModel/updatePassword",

  // 商家统计信息
  INFO_REMINDINFO_URL: CRMSURL +  "merchantFilerModel/doQueryMerchantRemindInfo",
  INFO_STATISTICS_URL: CRMSURL +  "merchantFilerModel/doQueryMerchantStatistics",

  //车主信息
  INFO_QUERYDRIVERLIST_URL: CRMSURL +  "consumerFilterModel/doQueryConsumerList",
  INFO_QUERYDRIVERDETAIL_URL: CRMSURL +  "consumerFilterModel/doQueryConsumerInfo",
  INFO_QUERYOBDDRIVERLIST_URL: SURL +  "userDataFilterModel/doQueryDriverList",
  INFO_QUERYOBDDRIVERDETAIL_URL: SURL +  "userDataFilterModel/doQueryDriverInfo",

  INFO_QUERYOBDDATADETAIL_URL: SURL +  "userDataFilterModel/doQueryUserOBDDataDetail",
  INFO_QUERYOBDNEWTROUBLE_URL: SURL +  "serviceFilterModel/doQueryUserNewestTrouble",

  //服务信息
  LIST_QUERYMAINTAINLIST_URL: SURL + "serviceFilterModel/doQueryMaintainRemindList",
  LIST_QUERYINSURANCELIST_URL: SURL + "serviceFilterModel/doQueryInsuranceRemindList",
  LIST_QUERYVERIFYLIST_URL: SURL + "serviceFilterModel/doQueryVerifyRemindList",
  LIST_QUERYAPPOINTLIST_URL: CRMSURL + "appointmentFilerModel/doQueryAppointmentList",
  LIST_QUERYRESCUELIST_URL: CRMSURL + "rescueFilerModel/doQueryRescueList",
  LIST_QUERYHEALTHLIST_URL: SURL + "serviceFilterModel/doQueryHealthRemindList",
  LIST_QUERYTROBLELIST_URL: SURL + "serviceFilterModel/doQueryTroubleRemindList",
  LIST_QUERYBIRTHLIST_URL: SURL + "userDataFilterModel/doQueryUserBirthList",
  LIST_QUERYMONITORLIST_URL: CRMSURL + "maintFilerModel/doQueryMaintMonitorList",

  // 推广信息
  LIST_QUERYADSLIST_URL: CRMSURL +  "adsFilerModel/doQueryAdsList",
  UPDATE_CHANGEADSENABLED_URL: CRMSURL + "adsFilerModel/doChangeAdsEnabled",

  LIST_QUERYMSGLIST_URL: SURL + "voiceFilterModel/doQueryVoiceNoticeList",
  ADD_ADDNOTICEMSG_URL: SURL + "voiceFilterModel/doAddNoticeMsg",
  LIST_QUERYCOUPONLIST_URL: SURL + "couponFilterModel/doQueryCouponList",
  LIST_QUERYCOUPONORDERLIST_URL: SURL + "couponFilterModel/doQueryWebCouponOrderList",

  // 报表信息
  LIST_QUERYMAINTAINREPORT_URL: CRMSURL + "maintFilerModel/doQueryWebMaintainReport",
  LIST_QUERYTROBLEREPORT_URL: SURL + "userDataFilterModel/doQueryWebTroubleRateReport",
  LIST_QUERYHEALTHREPORT_URL: SURL + "userDataFilterModel/doQueryWebHealthReport",

  // 员工列表
  LIST_QUERYSTAFFLIST_URL: CRMSURL + "merchantFilerModel/doQueryStaffList",
  // 员工通知消息发送
  ADD_SENDNOTICESTAFF_URL: CRMSURL + "merchantFilerModel/doNoticeStaff",

};

export default GLOBALURL;
