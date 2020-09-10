<template>
    <div>
    <Navigator active-func="UserDetail"/>
    <el-card class="card">
        <el-row :gutter="20">
            <el-col :span="3" :offset="1">
                <div class="block">
                    <el-avatar :size="80" class="image" :src="circleUrl">
                    </el-avatar>
                </div>
            </el-col>
            <el-col :span="8" >
                <div class="info">
                    <div class="info-title" >{{user.userId}}</div>
                    <div class="info-content">
                        {{user.identity}}
                        <b style="margin-left: 5px; margin-right:5px">|</b>
                        {{user.school}}
                    </div>
                    <div class="info-content" style="margin-top: 10px">{{user.major}}</div>
                </div>
                <template v-if="user.identity==='学生'">
                    <el-button class="button" @click="authentication">教师认证</el-button>
                </template>
            </el-col>
            <el-col :span="1">
               <i class="el-icon-edit-outline el-icon"></i>
            </el-col>
            <el-col :span="3">
                <div class="icon-content">主题/回复</div>
            </el-col>
            <el-col :span="1">
                <i class="el-icon-lollipop el-icon"></i>
            </el-col>
            <el-col :span="3">
                <div class="icon-content">获赞数量</div>
            </el-col>
            <el-col :span="1">
                <i class="el-icon-time el-icon"></i>
            </el-col>
            <el-col :span="3">
                <div class="icon-content">学习时长</div>
            </el-col>
        </el-row>
    </el-card>
    </div>
</template>

<script>
    import Navigator from "../components/Navigator";
    export default {
        name: "UserDetail",
        components: {Navigator},
        data(){
            return{
                circleUrl:require("@/assets/useravatar.jpg"),
                user:{
                    "userId":"BH17373109",
                    "identity":"学生",
                    "school":"北京航空航天大学",
                    "major":"软件工程",
                }
            }
        },
        methods:{
            authentication(){
                this.$router.push({ path: "/authentication" });
            }
        }
    }
</script>

<style scoped >
.card{
    height:200px;
    width: 100%;
    /*background-image: linear-gradient(to left,rgba(64,158,255,0.6),rgba(135,206,250,0.8));*/
    background-image: linear-gradient(to left,rgba(255,0,0,0.6),rgba(255,165,0,0.5));
}
.image{
    margin-top: 20px;
}
.info{
    margin-top: 20px;

}
.info-title{
    font-size: 20px;
    font-family: 微软雅黑;
    font-weight:bold;
    color: white;
}
.info-content{
    margin-top: 8px;
    font-size: 13px;
    font-family: 微软雅黑;
    color: white;
}
.button{
    margin-top:20px;
    margin-left: -3px;
    width: 60px;
    padding:5px;
    background-color: #FFDEAD;
    color: #FF7256;
    -webkit-border-radius: 15px;
    border-radius: 10px;
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;
    font-weight: 900;
    font-size:70%
}
.el-icon{
    margin-top: 50px;
    color: white;
    font-size: xx-large;

}
.icon-content{
    margin-top:45px;
    margin-left: 10px;
    font-family: 微软雅黑;
    font-size: 14px;
    color: white;
}
</style>