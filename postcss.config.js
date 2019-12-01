const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
module.exports = {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue: 75.0, // 设计稿为750px
      propList: ["*"], // 对所有css属性进行转换rem
      minPixelValue: 2, // 最小像素值(1px不进行转换)
      selectorBlackList: ["van-"] //排除第三方库的样式; eg:排除van-开头(即vant库中的css样式)的class名
    })
  ]
};
