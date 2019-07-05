import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import http from "./http";
import axios from "axios";
import mavonEditor from "mavon-editor";
import 'mavon-editor/dist/css/index.css'
import lodash from "lodash";
import VCharts from 'v-charts'
Vue.config.productionTip = false;
Vue.prototype.$axios = http;
Vue.prototype.$lodash=lodash
Vue.use(VCharts)
Vue.use(mavonEditor)
Vue.use(ElementUI);
// 处理响应超时时间
axios.defaults.timeout = 100000;
// 设置post请求的响应头
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
// 设置响应拦截
axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    return Promise.reject(error);
  }
);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
