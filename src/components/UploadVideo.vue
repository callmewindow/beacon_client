<template>
  <el-card class="All">
    <Navigator active-func="class" />
    <el-card id="card">
      <el-row>
        <el-col :span="22" :offset="1">
          <div class="bg-top font-top">
            视频上传
            <el-divider></el-divider>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-steps :active="page" align-center finish-status="success">
          <el-step icon="el-icon-edit" title="视频上传"></el-step>
          <el-step icon="el-icon-upload2" title="上传成功"></el-step>
        </el-steps>
      </el-row>
      <el-row>
        <el-col :offset="5" :span="14">
          <div class="grid-content bg-white">
            <el-tabs type="border-card">
              <el-form
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                ref="ruleForm"
                v-if="page===0"
              >
                <el-form-item></el-form-item>
                <el-form-item label="视频标题" prop="videoTitle">
                  <el-input v-model="ruleForm.videoTitle"></el-input>
                </el-form-item>
                <el-form-item label="视频简介" prop="videoIntro">
                  <el-input v-model="ruleForm.videoIntro"></el-input>
                </el-form-item>
                <el-form-item label="课程视频" prop="video">
                  <el-upload
                    :action="videoUrl"
                    :auto-upload="false"
                    :before-upload="beforeUpload"
                    :file-list="identityVideo"
                    :limit="100"
                    :on-exceed="handleExceed"
                    :on-remove="handleRemove"
                    :on-success="videoSuccess"
                    class="upload-demo"
                    drag
                    ref="upload"
                    v-bind:name="uploadVideoForm.userId"
                  >
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">
                      将视频拖到此处，或
                      <em>点击添加视频</em>
                    </div>
                  </el-upload>
                </el-form-item>
                <el-form-item>
                  <el-button @click="submitVideo" type="primary">上传</el-button>
                </el-form-item>
              </el-form>

              <transition name="el-zoom-in-top">
                //动态效果
                <div style="text-align: center; margin-top:80px;" v-show="show">
                  <span style="font-size: 40px; color: #409EFF;">
                    {{showMsg}}
                    <br />
                  </span>
                  <i
                    class="el-icon-circle-check"
                    style="margin-top:15px; margin-bottom:100px;font-size: 40px; color: #409EFF;"
                  ></i>
                </div>
              </transition>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </el-card>

    <Footer />
  </el-card>
</template>

<script>
import * as applyAPI from "../APIs/apply";
import Navigator from "@/components/Navigator";
import Footer from "@/components/Footer";
import moment from "moment";

export default {
  name: "upload_video",
  components: {
    Navigator,
    Footer,
  },
  data() {
    const checkVideo = (rule, value, callback) => {
      if (this.ifIdentityVideo) {
        callback();
      } else {
        callback(new Error("请添加视频"));
      }
    };

    return {
      videoUrl: "https://jsonplaceholder.typicode.com/posts/", //http://101.200.219.50:8000/api/expert/uploadImage
      page: 0,
      showMsg: "视频已上传",
      show: false,
      identityVideo: [],
      ifIdentityVideo: false,
      uploadVideoForm: {
        userId: this.$store.state.userId,
        title: "",
        introduction: "",
        upload_time: "",
        course: "",
      },
      ruleForm: {
        videoTitle: "",
        videoIntro: "",
      },
      rules: {
        videoTitle: [
          { required: true, message: "请输入视频的标题", trigger: "blur" },
        ],
        videoIntro: [
          { required: true, message: "请输入视频的简介", trigger: "blur" },
        ],
        video: [{ required: true, validator: checkVideo, trigger: "blur" }],
      },
    };
  },
  created() {
    //this.getApplyState();
  },

  methods: {
    beforeUpload(file) {
      const isMP4 = file.type === "video/mp4";
      const isLt500MB = file.size / 1024 / 1024 < 500;
      if (!isMP4) {
        this.$message.error("上传视频只能是 MP4 格式！");
      }
      if (!isLt500MB) {
        this.$message.error("上传视频大小不能超过 500MB!");
      }
      if (isMP4 && isLt500MB) {
        this.ifIdentityVideo = true;
      }
      return isMP4 && isLt500MB;
    },

    handleExceed() {
      this.$message.warning(`单次最多只可上传一百份视频！`);
    },

    videoSuccess(res) {
      //, file, fileList
      window.console.log(res); // 这里可以获得上传成功的相关信息
      if (res === "ok") {
        this.submitForm("ruleForm");
      }
    },

    handleRemove() {
      this.ifIdentityVideo = false;
    },

    submitVideo() {
      this.submitForm("ruleForm");
      this.$refs.upload.submit();
    },

    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.uploadVideoForm.upload_time = moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          this.uploadVideoForm.title = this.ruleForm.videoTitle;
          this.uploadVideoForm.introduction = this.ruleForm.videoIntro;
          //this.uploadVideoForm.course = ;
          this.uploadVideo();
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },

    success() {
      //负责切换状态栏状态
      this.page = 2;
      this.show = true;
    },

    async uploadVideo() {
      try {
        window.console.log(this.uploadVideoForm.userId);
        window.console.log(this.uploadVideoForm);
        const temp = await applyAPI.uploadApply(this.uploadVideoForm);
        window.console.log(temp.data["msg"]);
        if (temp.data["ms'g"] === "ok") {
          this.success();
        } else {
          this.$message.error("上传失败，请联系管理员");
        }
      } catch (e) {
        this.$message.error("上传失败，请联系管理员");
      }
    },
  },
};
</script>

<style scoped>
.All {
  text-align: left;
}

.el-row {
  margin-bottom: 10px;
}

.el-col {
  border-radius: 4px;
}

.bg-top {
  background: rgba(255, 255, 255, 0.7);
}

.bg-white {
  background: rgba(255, 255, 255, 0.7);
}

.font-top {
  font-size: 25px;
  font-family: "微软雅黑", serif;
  text-align: left;
}

#card {
  width: 100%;
  margin-top: 100px;
}
</style>
