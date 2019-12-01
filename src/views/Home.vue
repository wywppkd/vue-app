<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ new Date() | formatTime }}
    <button @click="postData()">POST发送请求</button>
    <button @click="getData()">GET发送请求</button>
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
    postData() {
      this.$http({
        url: "/api/getCount",
        method: "POST",
        data: {
          name: "post数据"
        }
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
