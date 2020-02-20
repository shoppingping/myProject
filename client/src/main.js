// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import echarts from 'echarts'
import china from 'echarts/map/js/china.js'
import $ from 'jquery'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */

// router.beforeEach((to, from, next) => {
//     // 如果有 userid 代表登录，可以之行 next
//     // 没有 userid 的代表没有登录，跳转登录页面
//     // 但是访问登录页就不要再跳转了，这样惠进入跳转循环。
//     // 所以再 ｜｜ 后边增加准许不登录访问的 path 就可以了
//     // var arr = ['/login', '/registered','/SetPassWord','/guide'];
//   	var reg = /^\/(login)(\/.+)*$/;
//     // if(arr.indexOf(to.path) >= 0 || sessionStorage.getItem('userId')){
//     if(to.path!="/index/content"&&reg.test(to.path) || sessionStorage.getItem('userId')){
//       next();
//     } else {
//       next({
//         path: '/login'
//       })
//     }
// })

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
