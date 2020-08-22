<template>
  <section>
    <header class="container">
      <h2 class="text-warning">个人主页</h2>
      <div class="person">
        <div class="avatar">
          <img src alt />
        </div>
        <div class="detail">
          <h3>昵称：{{user.nickname}}</h3>
          <span class="text-primary">个人签名：</span>
          <p v-if="user.bio" class="bio">{{user.bio}}</p>
          <p v-else class="bio">这个人很懒，什么都没有留下 。。。。。</p>
        </div>
      </div>
    </header>
    <section class="container">
      <h3 class="text-primary">发表过 {{ topics.length }} 个话题：</h3>
      <ul class="media-list">
        <li
          class="media"
          v-for="(item,index) in topics"
          :key="index"
          @click="handlePageJumpClick({name:'TopicDetail',params:{create_time:item.create_time}})"
        >
          <h4 class="media-heading clearfix">
            <a>
              {{item.title}}
              <span class="pull-right text-warning">{{item.create_time}}</span>
            </a>
          </h4>
          <div class="article">
            <div class="content overtext">
              <span>{{ item.content }}</span>
            </div>
            <div class="read_number">
              <a class="pull-right">
                <i class="glyphicon glyphicon-eye-open"></i>
                <span>{{ item.read_number }}</span>
              </a>
            </div>
          </div>
        </li>
      </ul>
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="active">
            <a href="javascript:;">1</a>
          </li>
        </ul>
      </nav>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      user: "",
      topics: [],
    };
  },
  async mounted() {
    //获取该用户信息
    await axios({
      url: "http://106.14.23.225:80/api/user",
      method: "get",
      params: this.$route.params,
      timeout: 1000,
    })
      .then((res) => {
        this.user = res.data.user;
      })
      .catch((err) => {
        console.log(err);
      });

    //获取用户发表过的文章
    await axios({
      url: "http://106.14.23.225:80/api/topic",
      method: "get",
      params: this.$route.params,
      timeout: 1000,
    })
      .then((res) => {
        this.topics = res.data.topics;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    handlePageJumpClick(obj) {
      this.$router.push({ name: obj.name, params: obj.params });
    },
  },
};
</script>

<style  scoped>
.navbar {
  background-color: #fff;
}

.article {
  display: flex;
  justify-content: space-between;
}

.avatar_nickname,
.read_number {
  width: 100px;
}

.content {
  width: 75%;
}

.overtext {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.media-heading a {
  display: block;
  font-size: 26px;
  text-decoration: none;
}

.media-heading a span {
  font-size: 12px;
}

.media-list {
  border-radius: 10px;
  background-color: #fff;
}

.media-list li {
  border-bottom: 1px solid #f3f3f3;
  padding: 20px;
  margin: 0;
  cursor: pointer;
}

.media-list {
  height: 600px;
}

body {
  background-color: #f1f1f1;
}

header {
  margin-bottom: 20px;
}

.person {
  display: flex;
  height: 150px;
  background-color: #fff;
  border-radius: 5px;
}

.avatar {
  margin-left: 20px;
  margin-right: 40px;
}

.avatar img {
  margin: 15px 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 90px;
}

.detail h3 {
  margin: 10px 0;
}

.detail p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 14px;
  padding-right: 2em;
  text-indent: 2em;
}
</style>

