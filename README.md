## 使用Vue-CLI3搭建项目, 我都做了哪些事情?

### 安装vue-cli
```bash
$ npm uninstall vue-cli -g # 卸载旧版本
$ npm install -g @vue/cli  # 安装新版本
$ vue -V                   # 检查vue-cli版本
```

### 初始化项目
```bash
$ vue create app # 创建新项目
  # Manually select features 选择自定义安装
  # 勾选Babel, Router, Vuex, CSS Pre-processors, Linter/Formatter
  # 是否使用history模式的路由? y
  # Sass/SCSS
  # ESLint+Prettier
  # Lint on Save
$ cd app # 切换到项目目录
$ npm run serve # 启动开发环境
$ npm run build # 生产环境打包
```

### 开发环境配置`vscode`
- 安装插件
  1. ESLint
  2. Prettier — Code formatter
  3. Vue 2 Snippets
  4. Vetur

- 设置`settings.json`
```json
{
  "editor.tabSize": 2,
  "eslint.validate": [
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "javascriptreact",
      "autoFix": true
    }
  ],
  "eslint.autoFixOnSave": true,
  "editor.formatOnSave": false,
  "vetur.validation.template": true
}
```

---
### 设置开发环境反向代理
```js
// vue.config.js
module.exports = {
  devServer: {
    // 设置反向代理
    proxy: {
      "/api": {
        target: "https://xiaoce-discount-storage-api-ms.juejin.im", // 接口地址
        secure: false, // 目标服务器是否是安全协议
        host: "0.0.0.0",
        changOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
```

---
### 引入`normalize.css`统一浏览器默认样式
```js
$ npm i normalize.css -S

// main.js
import "normalize.css";
```

### 引入公共`common.scss`文件
```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        data: `@import "@/assets/css/common.scss";`
      }
    }
  }
}
```

### 适配移动端
- 使用淘宝的rem方案
- 利用postcss插件打包时将px自动转成rem
```js
$ npm i amfe-flexible -S  // 淘宝rem方案
$ npm i postcss-pxtorem -S  // 将px自动转成rem

// postcss.config.js
  const autoprefixer = require('autoprefixer')
  const pxtorem = require('postcss-pxtorem')
  module.exports = {
    plugins: [
      autoprefixer(),
      pxtorem({
        rootValue: 75.0,     // 设计稿为750px
        propList: ['*'],     // 对所有css属性进行转换rem
        minPixelValue: 2, // 最小像素值(1px不进行转换)
        selectorBlackList: ['van-'] //排除第三方库的样式; eg:排除van-开头(即vant库中的css样式)的class名
          // 参考:https://juejin.im/post/5b606f1c6fb9a04fa560f9d1
      })
    ]
  }

// main.js
  import 'amfe-flexible';
```
---

### 配置路由,动态修改页面title
```js
// /src/router/index.js
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
```

### 引入公共过滤器filters
```js
// src/filters.js
export default {
  formatTime: s => {
    let fix = num => {
      return ("" + num).length < 2
        ? (new Array(3).join("0") + num).slice(-2)
        : "" + num;
    };
    var time = new Date(s);
    return (
      time.getFullYear() +
      "-" +
      fix(time.getMonth() + 1) +
      "-" +
      fix(time.getDate()) +
      " " +
      fix(time.getHours()) +
      ":" +
      fix(time.getMinutes()) +
      ":" +
      fix(time.getSeconds())
    );
  }
};


// main.js
import filters from "./filters";
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));
```

### 引入公共方法common.js
```js
// src/common.js
export default {
  install(Vue, options) {
    // 时间戳=>2018-06-06 13:58:56
    Vue.prototype.$formatTime = function(s) {
      let fix = num => {
        return ("" + num).length < 2
          ? (new Array(3).join("0") + num).slice(-2)
          : "" + num;
      };
      var time = new Date(s);
      return (
        time.getFullYear() +
        "-" +
        fix(time.getMonth() + 1) +
        "-" +
        fix(time.getDate()) +
        " " +
        fix(time.getHours()) +
        ":" +
        fix(time.getMinutes()) +
        ":" +
        fix(time.getSeconds())
      );
    };
  }
};


// main.js
import common from './common.js' // 公共js方法
Vue.use(common)
```


---

### 引入第三方组件的Toast(推荐vant)
```js
$ npm i vant -S // 下载vant组件库
```

- 方式1: 按需引入组件
```js
$ npm i babel-plugin-import -D // 下载插件
    // babel-plugin-import插件会将代码import {componentName} from 'Ego' 转换成 => 
    // import Button from 'ego/lib/button'; import 'ego/lib/button/style';

// babel.config.js
  module.exports = {
    plugins: [
      [
        "import",
        {
          libraryName: "vant",
          libraryDirectory: "es",
          style: true
        },
        "vant"
      ]
    ]
  };

// main.js
  import { Toast } from 'vant'; // 引入需要组件
  Vue.use(Button);// 挂载到vue
```

- 方式2:引入所有组件
```js
// main.js
import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);
```

### 封装axios
```js
$ npm i axios -S

// main.js
import http from "./request/http";// http.js是二次封装后的axios
Vue.prototype.$http = http;
```


