<template>
    <el-card class="All">
        <Navigator active-func="class"/>
        <el-card id="card">
            <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                <div style="margin-top: 2px; font-size: 15px;">
                    请参照excel样例完成学生导入表格并上传
                </div>
                <el-link type="primary" style="font-size: 10px"
                         href="https://pic-jym.oss-cn-beijing.aliyuncs.com/img/image-20200908153510984.png">此处下载excel样例
                </el-link>
                <br>
                <div style="margin-top: 10px; font-size: 20px">表格上传</div>
                <el-upload
                        class="uploadStu"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-remove="handleRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :before-upload="beforeUpload"
                        :file-list="fileList"
                        accept=".xls, .xlsx"
                        style="margin-top: 10px">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将excel拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传.xls或.xlsx格式文件</div>
                </el-upload>
                <el-button slot="reference">导入学生</el-button>
            </el-popover>

            <br><br>
            <el-button @click="dialogVisible = true">导入学生</el-button>

            <el-dialog
                    title="导入学生"
                    :visible.sync="dialogVisible"
                    width="30%">
                <el-col :span="20" :offset="2">
                    <div style="font-size: 15px;">
                        请参照excel样例完成学生导入表格并上传
                    </div>
                    <el-link type="primary" style="font-size: 10px"
                             href="https://pic-jym.oss-cn-beijing.aliyuncs.com/img/image-20200908153510984.png">此处下载excel样例
                    </el-link>
                    <br>
                    <div style="margin-top: 10px; font-size: 20px">表格上传</div>
                    <el-upload
                            class="uploadStu"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-remove="handleRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :before-upload="beforeUpload"
                            :file-list="fileList"
                            accept=".xls, .xlsx"
                            style="margin-top: 10px">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将excel拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传.xls或.xlsx格式文件</div>
                    </el-upload>
                </el-col>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
            </el-dialog>

        </el-card>

        <Footer/>
    </el-card>
</template>

<script>
    import Navigator from "@/components/Navigator";
    import Footer from "@/components/Footer";

    export default {
        name: "upload_student",
        components: {
            Navigator,
            Footer,
        },
        data() {
            return {
                dialogVisible: false,
                fileList: [],
            };
        },
        created() {

        },

        methods: {
            beforeUpload(file) {
                const isXLS = file.name.split('.')[1] === 'xls';
                const isXLSX = file.name.split('.')[1] === 'xlsx';
                if (!isXLSX && !isXLS) {
                    this.$message.error('上传表格只能是 XLS 或 XLSX 格式！');
                }
                return isXLSX && isXLS;
            },
            handleExceed() {
                this.$message.warning(`每次仅允许上传一个excel文件`);
            },
        }
    }
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
