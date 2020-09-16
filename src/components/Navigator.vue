<template>
  <div id="navigator">
    <el-menu id="menu" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item @click="FT.toPath('/home')">
        <el-image style="height:50px;width:130px;margin:auto;margin-left:100px;" :src="wel" />
      </el-menu-item>
      <el-menu-item class="nav-text" @click="FT.toPath('/courseList')" index="course">
        课程
      </el-menu-item>
      <el-menu-item class="nav-text" @click="FT.building" index="college">
        学校
      </el-menu-item>
      <el-menu-item class="nav-text" @click="FT.building" index="forum">
        圈子
      </el-menu-item>

      <el-menu-item style="float:right;margin-right:100px;" @click="FT.toPath('/user/0')" index="user">
        <el-badge
          :is-dot="this.$store.state.messageNum !== 0"
          :hidden="this.$store.state.messageNum === 0"
          class="item"
        >
          <i class="el-icon-user"></i>
        </el-badge>
      </el-menu-item>

    </el-menu>

    <el-card shadow="never" id="loginWin" v-if="loginShow === 'yes'">
      <!-- <Login /> -->
    </el-card>
  </div>
</template>

<script>
import * as FT  from "@/tools/frontTool";
export default {
  name: "Navigator",
  props: {
    activeFunc: String,
    login: String
  },
  data() {
    return {
      FT,
      wel: require("@/assets/logo-horizon-simple.png"),
      activeIndex: this.activeFunc,
      now: this.activeFunc,
      loginShow: this.login
    };
  },
  methods: {
    toUser() {
      if (this.$store.state.userId === "null") {
        this.$message("请先登录");
        this.$router.push({ path: "/Login" });
      } else {
        this.$router.push({ path: "/User" });
      }
    },
  }

};
</script>

<style scoped>
#navigator{
  width: 100%;
  height: auto;
  position: fixed;
  z-index: 10;
}

#menu {
  width: 100%;
  float: left;
}
#loginWin {
  margin: auto;
  max-width: 500px;
}
.nav-text{
  margin-left: 30px;
}
</style>
