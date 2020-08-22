<template>
  <section class="container">
    <div class="row col-md-12">
      <div class="article_title">
        <h2>{{topic.title}}</h2>
      </div>
      <div class="article_user">
        <h5 class="text-muted pull-right">
          作者：{{topicUser.nickname}}
          <a
            class="pull-right"
            style="margin-left:20px;cursor:pointer"
            @click="handlePageJumpClick({name:'Personal',params:{email:topicUser.email}})"
          >他的主页</a>
        </h5>
      </div>
      <article class="markdown-body clearfix">
        <p class="bg-info">{{topic.content}}</p>
        <a
          class="pull-right messageCheck deleteTopic"
          v-if="topicUser.email===loginedUser.email"
          @click="handleDeleteTopicClick"
        >删除文章</a>
        <span class="pull-right">发表于：{{topic.create_time}}</span>
      </article>
      <div class="panel panel-default" v-for="(comment,index) in comments" :key="index">
        <div class="panel-heading">
          <span style="color:blue">{{comment.nickname}}</span> commented in
          <span>{{comment.modify_time}}</span>
          <span class="action">
            <a>
              <i class="glyphicon glyphicon-thumbs-down pull-right"></i>
            </a>
            <a>
              <i class="glyphicon glyphicon-thumbs-up pull-right"></i>
            </a>
            <a>
              <i class="glyphicon glyphicon-star-empty pull-right"></i>
            </a>
          </span>
        </div>
        <div class="panel-body">{{comment.content}}</div>
      </div>

      <hr />
      <form>
        <div class="form-group">
          <label for="exampleInputPassword1">参与讨论</label>
          <textarea class="form-control" name id cols="10" rows="5" v-model="content"></textarea>
        </div>
        <a class="btn btn-success" @click="handlePostCommentClick">发布</a>
        <span v-show="contentmessage" class="pull-right messageCheck">{{contentmessage}}</span>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      topicUser: "",
      loginedUser: this.$store.state.userInfo,
      content: "",
      topic: {},
      comments: [],
      contentmessage: "",
    };
  },
  async beforeMount() {
    //获取topic
    await axios({
      url: "http://106.14.23.225:80/api/topic",
      method: "get",
      params: this.$route.params,
      timeout: 1000,
    })
      .then((res) => {
        this.topic = res.data.topics[0];
      })
      .catch((err) => {
        console.log(err);
      });

    //获取本文的用户基本信息
    await axios({
      url: "http://106.14.23.225:80/api/user",
      method: "get",
      params: { email: this.topic.email },
      timeout: 1000,
    })
      .then((res) => {
        this.topicUser = res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });

    //获取评论信息
    await axios({
      url: "http://106.14.23.225:80/api/comment",
      method: "get",
      params: { topicId: this.topic.create_time },
      timeout: 1000,
    }).then((res) => {
      var err_code = res.data.err_code;
      if (err_code === 500) {
        return window.alert("服务器繁忙，请稍后重试！");
      } else if (err_code === 0) {
        this.comments = res.data.comments;
      }
    });
    for (var i = 0; i < this.comments.length; i++) {
      await axios({
        url: "http://106.14.23.225:80/api/user",
        method: "get",
        params: { email: this.comments[i].email },
      })
        .then((res) => {
          this.comments[i].nickname = res.data.user.nickname;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    handlePageJumpClick(obj) {
      this.$router.push({ name: obj.name, params: obj.params });
    },
    async handlePostCommentClick() {
      if (!this.content.trim()) {
        return (this.contentmessage = "内容不能为空！");
      }
      //判断登录状态
      if (!this.loginedUser) {
        //检测未登录状态，根据用户选择是否跳转登录页面
        if (
          window.confirm("您需要先登录您的账号才能参与讨论，是否立即登录？")
        ) {
          return this.$router.push({ path: "/user/login" });
        }
        //不做任何处理，并退出程序
        return 0;
      }
      var obj = {
        email: this.loginedUser.email,
        topicId: this.topic.create_time,
        content: this.content,
      };
      await axios({
        url: "http://106.14.23.225:80/api/comment",
        method: "post",
        data: obj,
        timeout: 1000,
      })
        .then((res) => {
          const err_code = res.data.err_code;
          if (err_code === 500) {
            return window.alert("服务器繁忙，请稍后重试！");
          } else if (err_code === 0) {
            this.content = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });

      await axios({
        url: "http://106.14.23.225:80/api/comment",
        method: "get",
        params: { topicId: this.topic.create_time },
        timeout: 1000,
      }).then((res) => {
        var err_code = res.data.err_code;
        if (err_code === 500) {
          return window.alert("服务器繁忙，请稍后重试！");
        } else if (err_code === 0) {
          this.comments = res.data.comments;
        }
      });
    },
    handleDeleteTopicClick() {
      var body = { create_time: this.topic.create_time };
      if (window.confirm("确定删除文章？")) {
        axios({
          url: "http://106.14.23.225:80/api/topic",
          method: "delete",
          data: body,
          timeout: 1000,
        })
          .then((res) => {
            const err_code = res.data.err_code;
            if (err_code === 500) {
              return window.alert("服务器繁忙，请稍后再试！");
            } else if (err_code === 0) {
              window.alert("删除成功");
              return this.$router.push({ path: "/" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style  scoped>
.deleteTopic {
  margin-left: 20px;
  font-size: 14px !important;
  cursor: pointer;
  text-decoration: none;
}
.messageCheck {
  font-size: 18px;
  color: red;
}
.panel .panel-heading .action i {
  margin-right: 10px;
}

.bg-info {
  font-size: 16px;
  line-height: 30px;
  text-indent: 2em;
}

.markdown-body {
  margin: 20px 0 50px;
}

.article_user {
  overflow: hidden;
}

.container {
  padding: 20px 30px 40px;
  background: #fff;
  border-radius: 10px;
}
textarea {
  resize: none;
}
</style>