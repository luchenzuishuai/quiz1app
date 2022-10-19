import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

// axios.defaults.baseURL = 'http://114.116.10.5:8070'
// axios.defaults.baseURL = 'https://springbootdemo0.azurewebsites.net:8080'
// axios.defaults.baseURL = 'https://20.40.202.19:8080'

// 带SSL，解决https请求http接口报错问题
axios.defaults.baseURL = 'https://www.2b206.icu:8082'

axios.defaults.timeout = 30000

Vue.prototype.$http = axios

Vue.use(ElementUI, { locale })
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
