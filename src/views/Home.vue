<template>
  <div id="all">
    <Navigator active-func="home" />
    <div id="main">
      <div id="top">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="12">
            <el-carousel height="233px" class="con-block">
              <el-carousel-item v-for="item in 4" :key="item">
                <el-image
                  style="width:100%;height:100%"
                  :src="centerLogo"
                  fit="contain"
                  :interval="3000"
                />
              </el-carousel-item>
            </el-carousel>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="5" id="latest">
            <div class="con-block selfBlock">
              <div id="username">
                <Username :name="username" text="教师" type="1" />
              </div>
              <div id="tip">最近学习：</div>
              <div
                class="classes"
                v-for="(item,index) in classes"
                :key="index"
                @click="FT.building()"
              >{{item}}</div>
              <div class="classes" style="padding-bottom:10px;cursor:default">......</div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div id="medium">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="18">
            <el-card>
              <div slot="header">
                <span>热门课程</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="FT.building()"
                >刷新</el-button>
              </div>
              <el-row type="flex" class="row-bg" justify="space-around">
                <el-col :span="5" v-for="o in 4" :key="o">
                  <div class="className" @click="FT.building">软件工程实践</div>
                  <div class="classType">软件工程</div>
                  <div class="classFrom">北京航空航天大学-X老师</div>
                  <div class="studentNum">163人</div>
                  <el-divider></el-divider>
                  <div class="classIntro">{{ classIntro | filterIntro }}</div>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div id="bottom">
        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="18">
            <el-card>
              <div slot="header">
                <span>热门分类</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="FT.building">刷新</el-button>
              </div>
              <el-row type="flex" class="row-bg" justify="start" :gutter="10">
                <el-col :span="2" v-for="o in 8" :key="o">
                  <el-tag class="hotTag" type="primary" effect="plain" @click="FT.building">软件工程</el-tag>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import * as FT from "@/tools/frontTool";
import * as UserAPI from "@/APIs/user.js";
import Navigator from "@/components/Navigator";
import Footer from "@/components/Footer";
import Username from "@/components/Username";
export default {
  name: "Home",
  components: {
    Navigator,
    Footer,
    Username,
  },
  data() {
    return {
      FT,
      centerLogo: require("@/assets/logo-horizon-complex.png"),
      username: "暂未登录",
      // classes: [
      //   "软件系统分析-软件工程",
      //   "软件过程质量-软件工程",
      //   "软件测试-软件工程",
      // ],
      classes: [
        "临时路由引导：",
        "/uploadvideo上传视频，/sendPost发布帖子",
        "/course课程信息，/user个人信息（还没更新）",
        "/addcourse新增课程，/postdetail帖子",
      ],
      classIntro:
        "《软件工程实践》是软件工程本科专业的一门专业必修课。它是集软件、硬件、程序语言开发、数据库设计、软件过程管理和交互设计为一体的重要实践课程。",
    };
  },
  filters: {
    filterIntro(value) {
      return value.substring(0, 40) + "...";
    },
  },
  created() {},
  methods: {
    toClass(item) {
      this.$message(item);
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
  },
};
</script>

<style scoped>
#all {
  width: 100%;
  height: 100vh;
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
}
#username {
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
.el-carousel__item:nth-child(2n) {
  background-color: rgba(255, 136, 136, 0.363);
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: rgba(248, 190, 151, 0.521);
}

#medium {
  margin-top: 15px;
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
  margin-left: 5px;
  height: 26px;
  float: left;
  color: #797b80;
}
.classFrom {
  clear: both;
  font-size: 15px;
  height: 20px;
  line-height: 20px;
}
.studentNum {
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