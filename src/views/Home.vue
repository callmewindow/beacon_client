<template>
  <div id="all">
    <Navigator active-func="home" />
    <div id="main">
      <div id="top">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-carousel id="carouselImg" height="366px" class="con-block" :interval="3000">
              <el-carousel-item v-for="item in 4" :key="item">
                <el-image style="width:100%;height:100%" :src="centerLogo" fit="contain" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="5" id="latest">
            <div
              class="con-block selfBlock"
              style="padding-bottom:12px"
              v-if="this.$store.state.userId == -1"
            >
              <div class="username">暂未登录</div>
            </div>
            <div class="con-block selfBlock" v-if="this.$store.state.userId != -1">
              <div class="username">
                <Username v-if="$store.state.teacherID != 2" :name="username" text="教师" type="1" />
                <Username v-if="$store.state.teacherID == 2" :name="username" text="" type="1" />
              </div>
              <div id="tip">最近学习</div>
              <div
                v-if="selectClasses == []"
                class="classes"
                style="padding-bottom:10px;cursor:default"
              >暂未加入课程</div>
              <div v-if="selectClasses != []">
                <div
                  class="classes"
                  v-for="(item,index) in selectClasses"
                  :key="index"
                  @click="toClass(0)"
                >{{item.course_name +"-"+ item.profession}}</div>
                <div
                  v-if="this.allSelect.length>3"
                  class="classes"
                  style="font-size:14px;color:gray;"
                  @click="FT.toPath('/user/'+$store.state.userId)"
                >更多......</div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="18" class="divideBar">
          <el-image @click="showAuthUp = true" class="barImg" :src="simpleLogo" fit="contain" />
          <div class="barCon">是烽火也是灯塔，指引你前进的方向</div>
        </el-col>
      </el-row>

      <div id="medium">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="18">
            <el-card>
              <div slot="header">
                <span>热门课程</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="getHotCourse()"
                >刷新</el-button>
              </div>
              <el-row class="hotCourseCon" justify="space-around">
                <el-col class="hotCourse" :span="5" v-for="o in 8" :key="o">
                  <div class="className" @click="FT.building">软件工程实践</div>
                  <div class="classType">软件工程</div>
                  <div class="classFrom">北京航空航天大学-X老师</div>
                  <div class="studentNum">163人</div>
                  <!-- <el-divider></el-divider> -->
                  <!-- <div class="classIntro">{{ classIntro | filterIntro }}</div> -->
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="教师认证申请" :visible.sync="showAuthUp" width="30%">
      <TeacherAuth />
    </el-dialog>

    <Footer position="left" />
  </div>
</template>

<script>
import * as FT from "@/tools/frontTool";
import * as AT from "@/tools/apiTool";
import * as UserAPI from "@/APIs/user.js";
import * as CourseAPI from "@/APIs/course.js";
import Navigator from "@/components/Navigator";
import Footer from "@/components/Footer";
import Username from "@/components/Username";
import TeacherAuth from "@/components/TeacherAuth";
export default {
  name: "Home",
  components: {
    Navigator,
    Footer,
    Username,
    TeacherAuth,
  },
  data() {
    return {
      FT,
      showAuthUp: false,
      timeTest: "",
      centerLogo: require("@/assets/logo-horizon-complex.png"),
      simpleLogo: require("@/assets/logo-horizon-simple.png"),
      username: "加载中",
      // classes: [
      //   "软件系统分析-软件工程",
      //   "软件过程质量-软件工程",
      //   "软件测试-软件工程",
      // ],
      selectClasses: [],
      allSelect: [],
      // classes: [
      //   "临时路由引导：",
      //   "/uploadvideo上传视频，/sendPost发布帖子",
      //   "/course课程信息，/user个人信息（还没更新）",
      //   "/addcourse新增课程，/postdetail帖子",
      // ],
      // classIntro:
      //   "《软件工程实践》是软件工程本科专业的一门专业必修课。它是集软件、硬件、程序语言开发、数据库设计、软件过程管理和交互设计为一体的重要实践课程。",
      hotCourse: [],
    };
  },
  filters: {
    filterIntro(value) {
      return value.substring(0, 40) + "...";
    },
    filterName(value) {
      return value.substring(0, 6) + "...";
    },
  },
  async created() {
    this.username = this.$store.state.nickname;
    let temp = await CourseAPI.getUserCourse(this.$store.state.userId);
    this.allSelect = temp.data.courses;
    this.allSelect.reverse();
    this.allSelect.push(this.allSelect[0]);
    this.allSelect.push(this.allSelect[0]);
    this.allSelect.push(this.allSelect[0]);
    this.allSelect.push(this.allSelect[0]);
    for (let index = 0; index < this.allSelect.length && index < 3; index++) {
      this.selectClasses.push(this.allSelect[index]);
    }
    await this.getHotCourse();
  },
  methods: {
    toClass(courseId) {
      FT.toPath("/course/" + courseId);
    },
    async registerTest() {
      // 手动修改内容可以完成注册
      const tempU = {
        username: "wyx0",
        user_password: "wyx847590417",
        school: "北京航空航天大学",
        user_nickname: "稼轩fake",
        school_id: "17373109",
        email: "847590417@qq.com",
      };
      const temp = await UserAPI.register(
        tempU.username,
        tempU.user_password,
        tempU.user_nickname,
        tempU.school,
        tempU.school_id,
        tempU.email
      );
      // 获取其中需要的内容
      let userData = temp.data;
      console.log(userData);
    },
    async loginTest() {
      const tempU = {
        username: "张泰威",
        user_password: "张泰威",
      };
      const temp = await UserAPI.login(tempU.username, tempU.user_password);
      // 完整的返回消息
      console.log(temp);
      // 获取其中需要的内容，也就是后端给的result
      let userData = temp.data;
      console.log(userData);
    },
    async getHotCourse() {
      console.log("get!");
    },
  },
};
</script>

<style scoped>
#all {
  width: 100%;
  height: auto;
  padding-bottom: 70px;
}
#main {
  padding-top: 75px;
  width: 100%;
  clear: both;
}
.con-block {
  border-radius: 5px;
  background-color: white;
}
.selfBlock {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}
.username {
  padding-top: 12px;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
  text-align: center;
}
#tip {
  margin-top: 10px;
  margin-left: 15px;
  font-size: 13px;
  color: #797b80;
}
.classes {
  cursor: pointer;
  margin-top: 5px;
  margin-left: 15px;
  font-size: 16px;
}
#carouselImg {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-carousel__item:nth-child(2n) {
  background-color: rgba(255, 136, 136, 0.363);
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: rgba(248, 190, 151, 0.521);
}

.divideBar {
  height: 60px;
  padding-top: 5px;
  margin-top: 15px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.barImg {
  float: left;
  height: 50px;
  width: 150px;
}
.barCon {
  float: left;
  height: 50px;
  width: 460px;
  text-align: center;
  margin-left: calc(37vw - 380px);
  letter-spacing: 5px;
  line-height: 50px;
  font-size: 20px;
  font-weight: bold;
}

#medium {
  margin-top: 15px;
}
.hotCourseCon {
  height: auto;
}
.hotCourse {
  border-bottom: 1px solid rgb(128, 128, 128);
  margin: 20px 0;
  margin-left: 30px;
  padding-left: 20px;
  padding-bottom: 5px;
}
.className {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  height: 26px;
  line-height: 26px;
  color: #409eff;
  float: left;
}
.classType {
  font-size: 13px;
  margin-top: 1px;
  margin-left: 5px;
  height: 26px;
  float: left;
  color: #797b80;
}
.classFrom {
  clear: both;
  font-size: 15px;
  margin: 5px 0;
  height: 20px;
  line-height: 20px;
}
.studentNum {
  margin-top: 2px;
  font-size: 13px;
  color: #797b80;
}
.classIntro {
  font-size: 14px;
}
.el-divider {
  margin: 10px;
}
.hotTag {
  cursor: pointer;
}
#bottom {
  margin-top: 15px;
}
</style>