import "normalize.css";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters"; // 公共过滤器
import http from "./request/http"; // 封装后的axios
import common from "./common"; // 公共js方法

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
Vue.use(common);

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
