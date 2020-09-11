<template>
  <el-row :gutter="10" style="margin-left: 15%; margin-right: 15%">
    <el-col :span="6" v-for="course in course_list" :key="course.id" style="margin-top: 10px">
      <el-card style="padding: 0">
        <img src="@/assets/course-cover.png" style="width: 100%">
        <el-row style="margin-top: 5px">
          <el-link type="primary" :underline="false" style="font-size: 20px">
            {{ course.title }}
          </el-link>
        </el-row>
        <el-row style="margin-top: 5px">
          <div>
            开课时间：{{course.time_from}}-{{course.time_to}}
          </div>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import * as postAPI from "@/APIs/course.js";

export default {
  name: "CourseList",
  data() {
    return {
      course_list: [
        {
          id: "课程id",
          title: "课程名名名名名名",
          time_from: "开始时间",
          time_to: "结束时间"
        },
      ]
    };
  },
  created() {
    this.get_course_list();
  },
  methods: {
    async get_course_list() {
      try {
        const list = await postAPI;//<-----------------------------------------NEED API
        window.console.log(list);
      } catch (e) {
        this.$message.error('请求超时');
      }
    },
  }
};
</script>

<style scoped>

</style>