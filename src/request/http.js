/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios";
// import Qs from "qs";
import { Toast } from "vant";

let instance = axios.create({
  // 如果要使用Content-Type:application/x-www-form-urlencoded; 打开这里的注释即可
  // transformRequest: [
  //   function(data, headers) {
  //     return Qs.stringify(data);
  //   }
  // ]
});

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    console.log("请求拦截器", config);
    config.withCredentials = false;
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0
    });
    // token放入请求头Authorization中
    // token推荐从vuex中取
    // config.headers.Authorization = localStorage.getItem("token") || "";
    return config;
  },
  error => Promise.error(error)
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    Toast.clear();
    const code = res.data.code;
    if (code === "0001") {
      // token过期统一处理
      Toast.fail("登录超时, 请重新登录");
      return;
    }
    return Promise.resolve(res.data);
  },
  // 请求失败
  error => {
    Toast.clear();
    Toast.fail("网络异常, 请稍后再试");
    return Promise.reject(error);
  }
);

export default instance;
