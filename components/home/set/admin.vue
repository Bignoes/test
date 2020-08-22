<template>
  <section class="container">
    <div class="col-md-5">
      <div class="subhead">
        <h2>修改密码</h2>
      </div>
      <hr />
      <form>
        <div class="form-group">
          <label for="exampleInputPassword1">当前密码</label>
          <input
            type="password"
            class="form-control"
            placeholder="请输入当前账户密码"
            name="password"
            v-model="pw0"
            @blur="handleCheckPasswod"
          />
        </div>
        <p v-show="passwordmessage" class="checkColor">{{passwordmessage}}</p>
        <div class="form-group">
          <label for="exampleInputPassword1">新的密码</label>
          <input
            type="password"
            class="form-control"
            placeholder="请输入新密码"
            v-model="pw1"
            @blur="handleCheckNewPassword"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">确认密码</label>
          <input
            type="password"
            class="form-control"
            placeholder="请再次输入新密码"
            v-model="pw2"
            @blur="handleCheckNewPassword"
          />
        </div>
        <p v-show="pwmessage" class="checkColor">{{pwmessage}}</p>
        <a type="submit" class="btn btn-success" @click="handleUpdatePassword">保存</a>
      </form>
      <div class="subhead">
        <h2>注销账号</h2>
        <hr />
      </div>
      <div>
        <button class="btn btn-danger" @click="handleDeleteClick">注销账号</button>
      </div>
      <hr />
    </div>
  </section>
</template>

<script>
import md5 from "blueimp-md5";

export default {
  data() {
    return {
      loginedUser: this.$store.state.userInfo,
      passwordmessage: "",
      pwmessage: "",
      pw0: "",
      pw1: "",
      pw2: "",
    };
  },
  methods: {
    handleCheckPasswod() {
      if (!this.pw0) {
        return (this.passwordmessage = "请输入当前账号的密码");
      }
      var password = this.pw0;
      axios({
        url: "http://106.14.23.225:80/api/user",
        method: "get",
        params: { email: this.loginedUser.email, password },
        timeout: 1000,
      })
        .then((res) => {
          var err_code = res.data.err_code;
          if (err_code === 500) {
            window.alert("服务器忙，请稍后重试！");
          } else if (err_code === 1) {
            this.passwordmessage = "密码不正确，请重新输入！";
          } else if (err_code === 0) {
            this.passwordmessage = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCheckNewPassword() {
      if (this.pw1 === this.pw0) {
        return (this.pwmessage = "新密码不能与近期使用过密码相同");
      }
      if (this.pw1 != this.pw2) {
        return (this.pwmessage = "两次输入密码不同，请重新输入");
      }
      this.pwmessage = "";
    },
    handleUpdatePassword() {
      if (this.passwordmessage || this.pwmessage) {
        return;
      }
      var obj = this.loginedUser;
      obj.password = this.pw1;
      axios({
        url: "http://106.14.23.225:80/api/user",
        method: "put",
        data: obj,
        timeout: 1000,
      })
        .then((res) => {
          var err_code = res.data.err_code;
          if (err_code === 500) {
            window.alert("服务器忙，请稍后重试！");
          } else if (err_code === 0) {
            (this.pw0 = ""), (this.pw1 = ""), (this.pw2 = "");
            window.alert("修改成功！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteClick() {
      if (window.confirm("一旦注销，不可找回,确定删除此账号？")) {
        const email = this.loginedUser.email;
        axios({
          url: "http://106.14.23.225//user",
          method: "DELETE",
          data: { email },
          timeout: 1000,
        }).then((res) => {
          const err_code = res.data.err_code;
          if (err_code != 0) {
            window.alert("服务器繁忙，请稍后重试。");
          }
          this.$store.commit("setuserInfo", null);
          this.$router.push({ path: "/" });
        });
      }
    },
  },
};
</script>
<style  scoped>
.checkColor {
  position: relative;
  color: red;
}
</style>