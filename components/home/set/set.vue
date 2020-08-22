<template>
  <div>
    <div class="col-md-3 list-group">
      <a href="#" class="list-group-item disabled">用户设置</a>
      <a
        name="profile"
        href="#/home/userset/profile"
        class="list-group-item"
        :class="{active:active==='profile'}"
        @click="handleActiveClick($event)"
      >基本信息</a>
      <a
        name="admin"
        href="#/home/userset/admin"
        class="list-group-item"
        :class="{active:active==='admin'}"
        @click="handleActiveClick($event)"
      >账户设置</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    if (window.location.hash != "#/home/userset/admin") {
      this.active = "profile";
    } else {
      this.active = "admin";
    }
  },
  data() {
    return {
      active: "",
    };
  },
  methods: {
    handleActiveClick(e) {
      this.active = e.target.name;
    },
  },
};
</script>
<style  scoped>
</style>