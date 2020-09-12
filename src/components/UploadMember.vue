<template>
  <div>
    <el-col :span="20" :offset="2">
      <div style="font-size: 15px;">请参照excel样例完成学生导入表格并上传</div>
      <el-link
        type="primary"
        style="font-size: 10px"
        href="https://pic-jym.oss-cn-beijing.aliyuncs.com/img/image-20200908153510984.png"
      >此处下载excel样例</el-link>
      <br />
      <div style="margin-top: 10px; font-size: 20px">表格上传</div>
      <el-upload
        class="uploadStu"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList"
        accept=".xls, .xlsx"
        style="margin-top: 10px;margin-bottom:10px"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将excel拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传.xls或.xlsx格式文件</div>
      </el-upload>
      <el-button type="primary" @click="uploadMem">进行导入</el-button>
    </el-col>
  </div>
</template>

<script>
export default {
  name: "UploadMember",
  data() {
    return {
      dialogVisible: false,
      fileList: [],
    };
  },
  created() {},

  methods: {
    beforeUpload(file) {
      const isXLS = file.name.split(".")[1] === "xls";
      const isXLSX = file.name.split(".")[1] === "xlsx";
      if (!isXLSX && !isXLS) {
        this.$message.error("上传表格只能是 XLS 或 XLSX 格式！");
      }
      return isXLSX && isXLS;
    },
    handleExceed() {
      this.$message.warning(`每次仅允许上传一个excel文件`);
    },
    uploadMem() {
      this.$message.success("导入成功");
      setTimeout("location.reload()", 2000);
    },
  },
};
</script>

<style scoped>
.All {
  text-align: left;
}

#card {
  width: 100%;
  margin-top: 100px;
}
</style>
