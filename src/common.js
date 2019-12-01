/**
 * 公共的js方法,可以挂在到Vue原型上
 * https://cn.vuejs.org/v2/guide/plugins.html#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6
 *
 * 也可以将公共方法写到filter中
 * .vue内直接调用this.$options.filters['formatPrice'](50000)
 */
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
