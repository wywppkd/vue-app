// 全局filter,每个vue文件都可以使用
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
