import Vue from 'vue'
import App from './App'
import config from './config/'
Vue.config.productionTip = false
Vue.prototype.$config =  config;
App.mpType = 'app'
const app = new Vue({
   ...App
})
app.$mount()
