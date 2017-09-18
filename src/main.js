// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import $ from 'jquery'

import Home from './pages/home'
import Login from './pages/user/login'
import Forgetpwd from './pages/user/forgetpwd'
import Driver from './pages/driver/driverinfo'
import RemindService from './pages/service/remindService'
import AppointService from './pages/service/AppointService'
import BirthService from './pages/service/birthService'
import RescueService from './pages/service/rescueService'
import RemindInfo from './pages/service/remindInfo'
import MonitorService from './pages/service/monitorService'

import Adsinfo from './pages/promote/adsinfo'
import Addads from './pages/promote/addads'
import Msginfo from './pages/promote/msginfo'
import Addmsg from './pages/promote/addmsg'
import Couponinfo from './pages/promote/couponinfo'
import Couponlist from './pages/promote/couponlist'
import Couponorder from './pages/promote/couponorder'

import './styles/bass.css'
import './styles/index.css'

Vue.use(VueRouter)

const routes = [
  {path: '/',component: Login},
  {path: '/home',component: Home},
  {path: '/user/login',component: Login},
  {path: '/user/forgetpwd',component: Forgetpwd},
  {path: '/driver/driverinfo',component: Driver},
  {path: '/service/remindService',component: RemindService},
  {path: '/service/remindInfo',component: RemindInfo},
  {path: '/service/appointService',component: AppointService},
  {path: '/service/birthService',component: BirthService},
  {path: '/service/rescueService',component: RescueService},
  {path: '/service/monitorService',component: MonitorService},
  {path: '/promote/adsinfo',component: Adsinfo},
  {path: '/promote/addads',component: Addads},
  {path: '/promote/msginfo',component: Msginfo},
  {path: '/promote/addmsg',component: Addmsg},
  {path: '/promote/couponinfo',component: Couponinfo},
  {path: '/promote/couponlist',component: Couponlist},
  {path: '/promote/couponorder',component: Couponorder},
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
