<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import router from "./router";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")) || false, //先去localStorage中获取数据
  },
  mutations: {
    setuserInfo(state, v) {
      sessionStorage.setItem("userInfo", JSON.stringify(v)); //将传递的数据先保存到localStorage中
      state.userInfo = v; // 之后才是修改state中的状态
    },
  },
});

export default {
  store,
  router,
  data() {
    return {};
  },
  methods: {},
};
</script>
<style  scoped>
</style>