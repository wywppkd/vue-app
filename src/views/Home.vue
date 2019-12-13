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
      @change="update"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "home",
  components: {
    HelloWorld
  },
  mounted() {},
  methods: {
    update(e) {
      console.log("TCL: update -> e", e);
      let file = e.target.files[0];
      let data = new FormData(); //创建form对象
      data.append("file", file); //通过append向form对象添加数据
      console.log(data.get("file")); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
      this.$http({
        url: "/api/postData",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function(progressEvent) {
          console.log("上传...");
          console.log("TCL: postData -> progressEvent", progressEvent);
        },
        onDownloadProgress: function(progressEvent) {
          console.log("下载...");
          console.log("TCL: postData -> progressEvent", progressEvent);
        }
      });
    },
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
