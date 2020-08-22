<template>
  <div class="main">
    <div class="header">
      <a href="#/">
        <p>Home</p>
      </a>
      <h1>用户登录</h1>
    </div>
    <form>
      <div class="form-group">
        <label for>邮箱</label>
        <input
          type="email"
          class="form-control"
          name="email"
          placeholder="Email"
          v-model="formData.email"
          @blur="handleLoginCheck"
        />
      </div>
      <div class="form-group clearfix">
        <label for>密码</label>
        <input
          type="password"
          class="form-control"
          name="password"
          placeholder="Password"
          v-model="formData.password"
          @blur="handleLoginCheck"
        />
        <a class="pull-right" href>忘记密码？</a>
      </div>
      <div class="checkbox clearfix">
        <label>
          <input type="checkbox" />
          记住我
        </label>
        <span v-show="loginmessgae" class="pull-right messageCheck">{{loginmessgae}}</span>
      </div>
      <div class="checkbox"></div>
      <a class="btn btn-success btn-block" @click="handlelogin($event)">登录</a>
    </form>
    <div class="message">
      <p>
        没有账号?
        <a href="#/user/register">点击创建</a>.
      </p>
    </div>

    <!-- <a @click="handlestore">tes</a> -->
  </div>
</template>

<script>
import axios from "axios";
import Vuex from "vuex";

export default {
  data() {
    return {
      loginmessgae: "请输入邮箱和密码",
      formData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handlelogin(e) {
      if (this.loginmessgae) {
        return;
      }
      axios({
        url: "http://106.14.23.225:80/api/user",
        method: "get",
        params: this.formData,
        timeout: 1000,
      })
        .then((res) => {
          var err_code = res.data.err_code;
          if (err_code === 500) {
            window.alert("服务器忙，请稍后重试！");
          } else if (err_code === 1) {
            window.alert("邮箱或密码错误");
          } else if (err_code === 0) {
            this.$store.commit("setuserInfo", res.data.user);
            if (this.$route.query.fromPath === "register") {
              return this.$router.push({ path: "/" });
            }
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleLoginCheck() {
      if (!this.formData.email.trim() && !this.formData.password) {
        this.loginmessgae = "请输入邮箱和密码";
      } else if (!this.formData.email.trim()) {
        this.loginmessgae = "请输入邮箱";
      } else if (!this.formData.password) {
        this.loginmessgae = "请输入您的密码";
      } else {
        this.loginmessgae = "";
      }
    },
  },
};
</script>
<style  scoped>
.main {
  width: 50%;
  margin: 100px auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.main .header a {
  text-decoration: none;
}

.main .header a p {
  margin-top: 10px;
  font-size: 18px;
  text-decoration: none;
  color: #666;
}
.messageCheck {
  color: red;
}
</style>