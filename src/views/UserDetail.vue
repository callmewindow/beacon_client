<template>
  <div>
    <Navigator active-func="UserDetail" />
    <div class="back">
      <el-card class="card align-center text-align: center;">
        <el-row :gutter="20" class="row-bg">
          <el-col :span="8" :offset="2">
            <div class="info-title">
              <i class="el-icon-user-solid"></i>
              <b style="margin-left: 5%">{{users.username}}</b>
            </div>
            <div class="info-content" v-show="users.identity===0">
              教师
              <b style="margin-left: 5px; margin-right:5px">|</b>
              {{users.school}}
            </div>
            <div class="info-content" style="margin-top: 10px">{{users.major}}</div>
            <template v-if="users.identity===0">
              <el-button class="button" @click="FT.building">教师认证</el-button>
            </template>
          </el-col>
          <el-col :span="1" :offset="4">
            <i class="el-icon-edit-outline el-icon"></i>
          </el-col>
          <el-col :span="2">
            <div class="icon-content" style="margin-top: 30px">课程/圈子</div>
            <div class="icon-content" style="margin-top: 10px; font-size: medium">{{users.circle}}个</div>
          </el-col>
          <el-col :span="1">
            <div style="font-size:30px; color: white;margin-top: 30px">|</div>
          </el-col>
          <el-col :span="1">
            <i class="el-icon-lollipop el-icon"></i>
          </el-col>
          <el-col :span="2">
            <div class="icon-content" style="margin-top: 30px">圈子积分</div>
            <div class="icon-content" style="margin-top: 10px; font-size: medium">{{users.score}}分</div>
          </el-col>
          <el-col :span="1">
            <div style="font-size:30px; color: white;margin-top: 30px">|</div>
          </el-col>
          <el-col :span="1">
            <i class="el-icon-time el-icon"></i>
          </el-col>
          <el-col :span="2">
            <div class="icon-content" style="margin-top: 30px">学习时长</div>
            <div class="icon-content" style="margin-top: 10px; font-size: medium">{{users.time}}</div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <div
            class="info-content"
            style="float: right;margin-right:30%;margin-top: -2%"
          >学习时长将会隔天进行更新</div>
        </el-row>
      </el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab" style="size: 40px">
        <el-tab-pane label="课程" name="first">
          <div style="margin-left: 5%">
            <el-row :gutter="100" style="margin-top: 2px ">
              <el-col :span="5" :offset="0" v-for="(o,index) in course" :key="index">
                <div style="min-width: 200px ;margin-bottom: 30px">
                  <div v-on: @mouseover="show(index)" @mouseleave="i=-1" @click="FT.building()">
                    <el-card :body-style="{padding:'2px'}" shadow="hover" class="courseCard">
                      <div class="className">{{o.course_name}}</div>
                      <el-tag
                        class="tag"
                        type="warning"
                        style="width: 60px"
                        v-show="o.profession"
                      >{{o.profession}}</el-tag>
                      <div class="classFrom info-content">{{o.teachername}}</div>
                      <div v-show="index !==i" class="startime info-content">
                        <i class="el-icon-date"></i>
                        {{time(o.start_time)}}
                      </div>
                      <div v-show="index!==i" class="studentNum info-content">
                        <i class="el-icon-user"></i>
                        {{o.studentnum}}
                      </div>
                      <div v-show="index === i" class="classIntro">{{o.course_intro }}</div>
                      <div
                        v-show="index === i"
                        class="info-content"
                        style=" color: #797b80;float: left;margin-left: 5%;font-size: 12px"
                      >
                        <i class="el-icon-date"></i>
                        {{time(o.start_time)}}
                      </div>
                      <div
                        v-show="index === i"
                        class="info-content"
                        style="color: #797b80;float: right ;font-size: 12px"
                      >
                        <i class="el-icon-user"></i>
                        {{o.studentnum}}
                      </div>
                    </el-card>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="帖子" name="second"></el-tab-pane>

        <el-tab-pane label="消息中心" name="third"></el-tab-pane>
      </el-tabs>
      <Footer />
    </div>
  </div>
</template>

<script>
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import * as FT from "../tools/frontTool";
import * as userAPI from "../APIs/user.js";
import * as courseAPI from "../APIs/course.js";
export default {
  name: "UserDetail",
  components: { Navigator, Footer },
  data() {
    return {
      FT,
      userId: this.$store.state.userId,
      circleUrl: require("@/assets/useravatar.jpg"),
      users: {
        username: "烽火",
        userId: "BH17373109",
        identity: 0,
        school: "北京航空航天大学",
        major: "软件工程",
        circle: "5",
        score: 99,
        time: "13时26分",
      },
      activeName: "first",
      seen: false,
      current: 0,
      currentDate: new Date(),
      course: [
        {
          name: "软件工程实践",
          profession: "软件工程",
          teacher: "吕云翔",
          classIntro: "《软件工程实践》是软件工程本科专业的一门专业...",
        },
        {
          name: "数据库",
          profession: "计算机",
          teacher: "黄坚",
          classIntro: "《数据库》是计算机本科专业的一门专业必修课。它是...",
        },
      ],
      i: -1,
    };
  },
  created() {
    this.get_userdetail();
    this.get_usercourse();
  },
  filters: {
    filterIntro(value) {
      return value.substring(0, 30) + "...";
    },
  },
  methods: {
    authentication() {
      this.$router.push({ path: "/authentication" });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    show(index) {
      this.i = index;
    },
    get_userdetail() {
      userAPI.getUserDetail(this.userId).then((res) => {
        console.log("1111", res.data.user);
        this.users.username = res.data.user.nickname;
        this.users.school = res.data.user.school;
        this.users.major = res.data.user.profession;
        this.users.score = res.data.user.score;
        this.users.time = res.data.user.coursetime;
      });
    },
    get_usercourse() {
      courseAPI.getUserCourse(this.userId).then((res) => {
        // let str = '{"message": "OK", "courses": [{"course_name": "科技写作", "course_intro": "Ian", "start_time": datetime.datetime(2020, 9, 11, 5, 3, 33), "profession": "Ian", "studentnum": 2, "teachername": null}, {"course_name": "软工23", "course_intro": "没什么用23", "start_time": datetime.datetime(2020, 9, 11, 5, 3, 33), "profession": null, "studentnum": 1, "teachername": null}]}'
        // console.log("11", typeof res.data);
        console.log("11", res);
        this.course = res.data.courses;
      });
    },
    time(s) {
      //  将截取后的时间return出来
      if (s) return s.substring(0, 10);
    },
  },
};
</script>

<style scoped >
.back {
  width: 100%;
  clear: both;
  background-color: #fffafa;
  height: 700px;
}
.card {
  margin-left: 6%;
  margin-right: 6%;
  background-image: linear-gradient(
    to left,
    rgba(255, 0, 0, 0.5),
    rgba(255, 165, 0, 0.65)
  );
}
.row-bg {
  margin-top: 5%;
}
.info-title {
  font-size: 20px;
  margin-top: 20px;
  font-family: 微软雅黑;
  font-weight: bold;
  color: white;
}
.info-content {
  margin-top: 8px;
  font-size: 13px;
  font-family: 微软雅黑;
  color: white;
}
.button {
  margin-top: 20px;
  margin-left: -3px;
  width: 60px;
  padding: 5px;
  background-color: #ffdead;
  color: #ff7256;
  -webkit-border-radius: 15px;
  border-radius: 10px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  font-weight: 900;
  font-size: 70%;
}
.el-icon {
  margin-top: 40px;
  color: white;
  font-size: xx-large;
}
.icon-content {
  font-family: 微软雅黑;
  font-size: 14px;
  color: white;
}
.tab {
  margin-top: 30px;
  margin-left: 90px;
  margin-right: 90px;
}
/deep/ .el-tabs__item.is-active {
  color: #ff7f00;
}
/deep/ .el-tabs__item {
  color: #363636;
  font-size: 16px;
  font-weight: 500;
  padding: 0 30px;
}
/deep/.el-tabs__active-bar {
  background-color: #ff7256;
}
.className {
  margin-top: 12%;
  font-size: 15px;
  font-family: 微软雅黑;
  font-weight: bold;
  float: inherit;
}

.classFrom {
  margin-top: 5%;
  clear: both;
  font-size: 12px;
  height: 20px;
  line-height: 20px;
  color: #797b80;
}
.studentNum {
  font-size: 12px;
  color: #797b80;
  float: right;
  margin-right: 5%;
  margin-top: 14%;
}
.startime {
  font-size: 12px;
  color: #797b80;
  float: left;
  margin-top: 14%;
  margin-left: 5%;
  display: block;
}
/deep/.el-col-8 {
  width: 20%;
}
/deep/.el-card {
  border: 0px white;
}
.courseCard {
  background-image: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6),
    rgba(244, 164, 96, 0)
  );
  width: 100%;
  text-align: center;
  height: 150px;
}
.classIntro {
  font-size: 12px;
  color: #797b80;
  float: left;
  margin-top: 8%;
  margin-left: 5%;
  margin-right: 5%;
  width: 180px;
  height: 29px;
}
.tag {
  background-color: #ff7256;
  color: white;
  font-weight: bolder;
  text-align: center;
  float: right;
  padding: 0 5px;
  margin-top: -24%;
}
</style>
