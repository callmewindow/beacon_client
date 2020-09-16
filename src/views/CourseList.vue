<template>
  <div>
    <Navigator active-func="course"/>
    <el-row :gutter="10" style="margin-left: 15%; margin-right: 15%">
      <el-col :span="17" style="margin-top: 80px;">
        <el-input placeholder="搜索课程" prefix-icon="el-icon-search" v-model="search_keyword" clearable></el-input>
      </el-col>
      <el-col :span="4" style="margin-top: 80px;">
        <el-button type="primary" @click="search_course">搜索课程</el-button>
        <el-button type="primary" v-if="display_search_result" @click="display_search_result=false">返回</el-button>
      </el-col>
      <el-col :span="3" style="margin-top: 80px;">
        <el-button type="primary" style="float: right" @click="showAddCourse = true">
          创建课程
          <i class="el-icon-arrow-right"></i>
        </el-button>
      </el-col>
    </el-row>
<!--    全部课程列表-->
    <el-row :gutter="20" style="margin-left: 15%; margin-right: 15%; padding-bottom:50px" v-if="!display_search_result">
      <el-col :span="6" v-for="(course,index) in course_list" :key="index" style="margin-top: 20px;">
        <el-card>
          <img src="@/assets/course-cover.png" style="width: 100%">
          <el-row style="margin-top: 5px">
            <el-link type="primary" :underline="false" style="font-size: 20px;height: 20px"
                     @click="frontTool.toPath('/course/'+course.id)">
              {{ course.course_name|cut_8 }}
            </el-link>
          </el-row>
          <el-row style="margin-top: 5px">
            <div>
              开课：{{ course.start_time|cut }} 至 {{ course.end_time|cut }}
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
<!--    搜索结果列表-->
    <el-row :gutter="20" style="margin-left: 15%; margin-right: 15%; padding-bottom:50px" v-if="display_search_result">
      <el-col :span="6" v-for="(course,index) in search_list" :key="index" style="margin-top: 20px;">
        <el-card>
          <img src="@/assets/course-cover.png" style="width: 100%">
          <el-row style="margin-top: 5px">
            <el-link type="primary" :underline="false" style="font-size: 20px;height: 20px"
                     @click="frontTool.toPath('/course/'+course.id)">
              {{ course.course_name|cut_8 }}
            </el-link>
          </el-row>
          <el-row style="margin-top: 5px">
            <div>
              开课：{{ course.start_time|cut }} 至 {{ course.end_time|cut }}
            </div>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="showAddCourse" width="50%">
      <AddCourse/>
    </el-dialog>
    <Footer/>
  </div>
</template>

<script>
import * as courseAPI from "@/APIs/course.js";
import Navigator from "@/components/Navigator";
import AddCourse from "@/components/AddCourse";
import Footer from "@/components/Footer";
import * as frontTool from "@/tools/frontTool";
//import Username from "@/components/Username";

export default {
  name: "CourseList",
  components: {
    Navigator,
    Footer,
    AddCourse,
    //Username,
  },
  data() {
    return {
      frontTool,
      showAddCourse: false,
      course_list: [],// course_intro,course_name,end_time,id,is_open,profession,rule,start_time
      search_keyword: "",
      search_list: [],
      display_search_result: false
    };
  },
  created() {
    this.get_course_list();
  },
  filters: {
    cut(str) {
      if (str) str = str.slice(0, 10);
      return str;
    },
    cut_8(str) {
      if (str && str.length > 8) str = str.slice(0, 8) + "...";
      return str;
    },
  },
  methods: {
    async get_course_list() {
      try {
        const list = await courseAPI.courseQuery();
        this.course_list = list.data.courses;
        this.course_list.reverse();
      } catch (e) {
        this.$message.error('请求超时');
      }
    },
    async search_course(e) {
      try {
        const list = await courseAPI.searchCourse(this.search_keyword);
        //window.console.log(list);
        this.search_list = list.data;
        this.display_search_result = true;
      } catch (e) {
        this.$message.error('请求超时');
      }
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
  }
};
</script>

<style scoped>
</style>