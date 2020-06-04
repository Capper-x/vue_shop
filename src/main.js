// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element,{Message,MessageBox,Dialog}from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//导入字体图标
import './assets/fonts/iconfont.css'


//导入全局样式表
import './assets/css/global.css'

import axios from 'axios'
 //配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
axios.interceptors.request.use(config=>{
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须return config
  return config
  
})


Vue.use(Element);
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox
Vue.use(Dialog)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
