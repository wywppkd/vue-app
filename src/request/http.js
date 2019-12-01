/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from "axios";
import Qs from "qs";
import { Toast } from "vant";

// 创建axios实例
var instance = axios.create({
  timeout: 20000, // 超时时间
  transformRequest: [
    function(data) {
      return data;
    }
  ]
});

// POST请求默认Content-Type值
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    console.log("请求拦截器", config);
    Toast.loading({
      message: "加载中...",
      forbidClick: true,
      duration: 0
    });
    if (config.method.toLowerCase() === "post") {
      const contentType = config.headers["Content-Type"];

      // 根据Content-Type转换data格式
      if (contentType) {
        if (contentType.includes("multipart")) {
          // 类型 'multipart/form-data;'
          // 多用于上传文件
        } else if (contentType.includes("json")) {
          // 类型 'application/json;'
          // 服务器收到JSON字符串 "{name:"Tom",age:"18"}"
          config.data = JSON.stringify(config.data);
        } else {
          // 类型 'application/x-www-form-urlencoded;'
          // 服务器收到的数据 name=Tom&age=18
          config.data = Qs.stringify(config.data);
        }
      }
    }
    // token放入请求头Authorization中
    // token推荐从vuex中取
    config.headers.Authorization = localStorage.getItem("token") || "";
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
