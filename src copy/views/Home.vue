<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ new Date() | formatTime }}
    <button @click="postData()">POST发送请求</button>
    <button @click="getData()">GET发送请求</button>
    <input
      class="file"
      name="file"
      type="file"
      accept="image/png,image/gif,image/jpeg"
      @change="upload"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Qs from "qs";
export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {},
  methods: {
    // 上传文件
    upload(e) {
      let file = e.target.files[0];
      let params = new FormData(); //创建form对象
      params.append("file", file); //通过append向form对象添加数据
      this.$http({
        url: "/api/postData",
        method: "post",
        data: params
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("错误", err);
        });
    },
    // post请求
    postData() {
      this.$http({
        url: "/api/postData",
        method: "POST",
        data: { name: "123" }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("错误", err);
        });
    },
    // get请求
    getData() {
      this.$http({
        url: "/api/getCount",
        method: "GET",
        params: {
          name: "GET数据"
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log("错误", err);
        });
    }
  }
};
</script>
<style lang="scss" scope>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
button {
  width: 690px;
  height: 100px;
  font-size: 36px;
  line-height: 100px;
  background-color: #fff;
  border: 1px solid #ddd;
}
</style>
