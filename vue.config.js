module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: "http://rap2api.taobao.org/app/mock/230933", // 域名
        secure: false, // 目标服务器是否是安全协议
        host: "0.0.0.0",
        changOrigin: true, // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config
        .plugin("webpack-bundle-analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin)
        .init(Plugin => new Plugin());
    }
  },
  configureWebpack: {
    externals: {
      vue: "Vue",
      axios: "axios"
    }
  }
};
