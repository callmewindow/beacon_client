<template>
  <div>
    <Navigator active-func="home"/>
    <el-row style="margin-left: 15%; margin-right: 15%">
      <el-button type="primary" round style="margin-top: 80px; float: right" @click="showAddCourse = true">创建课程</el-button>
    </el-row>
    <el-row :gutter="20" style="margin-left: 15%; margin-right: 15%; padding-bottom:50px">
      <el-col :span="6" v-for="(course,index) in course_list" :key="index" style="margin-top: 20px;">
        <el-card>
          <img src="@/assets/course-cover.png" style="width: 100%">
          <el-row style="margin-top: 5px">
            <el-link type="primary" :underline="false" style="font-size: 20px;height: 20px"
                     @click="frontTool.toPath('/course/'+course.id)">
              {{ course.course_name }}
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
      <AddCourse />
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
    return {// course_intro,course_name,end_time,id,is_open,profession,rule,start_time
      frontTool,
      showAddCourse: false,
      course_list: [],
    };
  },
  created() {
    this.get_course_list();
  },
  filters: {
    cut(str) {
      if (str) str = str.slice(0, 10);
      return str;
    }
  },
  methods: {
    async get_course_list() {
      try {
        const list = await courseAPI.courseQuery();
        window.console.log(list.data.courses);
        this.course_list = list.data.courses;
        this.course_list.reverse();
      } catch (e) {
        this.$message.error('请求超时');
      }
    },
  }
};
</script>

<style scoped>
</style>