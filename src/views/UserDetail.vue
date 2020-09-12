<template>
    <div>
    <Navigator active-func="UserDetail"/>
    <div style="width: 100%;clear:both ;background-color: #FFFAFA;opacity: 30%;">
    <el-card class="card align-center text-align: center;">
        <el-row :gutter="20" style="margin-top:5%;" >
            <el-col :span="8" offset="2" >
                <div class="info">
                    <div class="info-title" >
                        <i class="el-icon-user-solid"></i>
                        <b style="margin-left: 5%">{{user.username}}</b></div>
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
            <el-col :span="1" offset="4"><i class="el-icon-edit-outline el-icon"></i></el-col>
            <el-col :span="2" >
                <div class="icon-content" style="margin-top: 45px">课程/圈子</div>
                <div class="icon-content" style="margin-top: 7px; font-size: medium" >{{user.circle}}个</div>
            </el-col>
            <el-col :span="1"> <div style="font-size:30px; color: white;margin-top: 45px">|</div></el-col>
            <el-col :span="1"><i class="el-icon-lollipop el-icon"></i></el-col>
            <el-col :span="2">
                <div class="icon-content " style="margin-top: 45px">圈子积分</div>
                <div class="icon-content" style="margin-top: 7px; font-size: medium" >{{user.score}}分</div>
            </el-col>
            <el-col :span="1"> <div style="font-size:30px; color: white;margin-top: 45px">|</div></el-col>
            <el-col :span="1"><i class="el-icon-time el-icon"></i></el-col>
            <el-col :span="2">
                <div class="icon-content"  style="margin-top: 45px" >学习时长</div>
                <div class="icon-content" style="margin-top: 7px; font-size: medium" >{{user.time}}</div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <div class="info-content" style="float: right;margin-right:30%;margin-top: -2%">学习时长将会隔天进行更新</div>
        </el-row>
    </el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tab" style="size: 40px">
        <el-tab-pane label="课程" name="first" >
            <div >
                <el-row gutter="30"  >
                    <el-col :span="5" v-for="o in course" :key="o" >
                        <div style="min-width: 200px">
                        <el-card :body-style="{padding:'2px'}" style="width:100%;height: 120px;text-align: center;margin-bottom: 15%" shadow="hover" class="courseCard">
                            <div class="className" >{{o.name}}</div>
                            <el-tag  class="tag" type="warning">{{o.profession}}</el-tag>
                                <div class="classFrom info-content ">北京航空航天大学-X老师</div>
                                <div class="startime info-content">2020-09-01</div>
                                <div class="studentNum info-content">163人</div>
<!--                                <div class="classIntro">{{ classIntro | filterIntro }}</div>-->
                        </el-card>
                        </div>
                    </el-col>
                </el-row>

<!--&lt;!&ndash;                过渡&ndash;&gt;-->
<!--                <div v-on:mouseleave="show = !show" @mouseover="show= !show" style="margin-top: 100px">-->
<!--                    <el-card shadow="hover">-->
<!--                        鼠标悬浮时显示-->
<!--                    </el-card>-->
<!--                </div>-->
<!--                <transition name="fade">-->
<!--                    <p v-if="show">hello</p>-->
<!--                </transition>-->

            </div>
        </el-tab-pane>
        <el-tab-pane label="帖子" name="second"></el-tab-pane>
            <div>

            </div>
        <el-tab-pane label="消息中心" name="third"></el-tab-pane>
            <div>

            </div>
    </el-tabs>
    </div>
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
                    "username":"烽火",
                    "userId":"BH17373109",
                    "identity":"学生",
                    "school":"北京航空航天大学",
                    "major":"软件工程",
                    "circle":"5",
                    "score": 99,
                    "time": "13时26分"
                },
                boxshow:false,
                activeName: 'first',
                seen:false,
                current:0,
                currentDate: new Date(),
                course:[
                    {
                        name: "软件工程实践",
                        profession:"软件工程"
                    },
                    {
                        name:"数据库",
                        profession: "计算机"
                    },   {
                        name: "软件工程实践",
                        profession:"软件工程"
                    },
                    {
                        name:"数据库",
                        profession: "计算机"
                    } , {
                        name: "软件工程实践",
                        profession:"软件工程"
                    },
                    {
                        name:"数据库",
                        profession: "计算机"
                    }
                ],
                show: true,
                classIntro:
                    "《软件工程实践》是软件工程本科专业的一门专业必修课。它是集软件、硬件、程序语言开发、数据库设计、软件过程管理和交互设计为一体的重要实践课程。",
            }
        },
        filters: {
            filterIntro(value) {
                return value.substring(0, 15) + "...";
            },
        },
        methods:{
            authentication(){
                this.$router.push({ path: "/authentication" });
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            mouseOver(){
                this.active="backgroud-color:black";
                var acps = this.$refs.acp
                acps.style.color = "red"
                this.boxshow=false;
            },
            mouseLeave(){
                this.active="backgroud-color:red";
                this.$refs.acp.style='';
                this.boxshow=true;
            }
        },

    }
</script>

<style scoped >
.card{
    margin-left: 6%;
    margin-right: 6%;
    /*background-image: linear-gradient(to left,rgba(64,158,255,0.6),rgba(135,206,250,0.8));*/
    background-image: linear-gradient(to left,rgba(255,0,0,0.6),rgba(255,165,0,0.5));
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
    font-family: 微软雅黑;
    font-size: 14px;
    color: white;
}
.tab{
    margin-top: 30px;
    margin-left: 90px;
    margin-right: 90px;
}
/deep/ .el-tabs__item.is-active{
    color: #FF7F00;
}
/deep/ .el-tabs__item {
    color: #363636;
    font-size:16px;
    font-weight: 500;
    padding: 0 30px;

}
/deep/.el-tabs__active-bar{
    background-color: #FF7256;
}
.className {
    margin-top: 10%;
    font-size: 15px;
    font-family: 微软雅黑;
    font-weight: bold;
    float: inherit;
}

.classFrom {
    margin-top: 2%;
    clear: both;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    color: #797b80;
}
.studentNum {
    font-size: 13px;
    color: #797b80;
    float: right;
    margin-top: 15%;
}
.startime{
    font-size: 13px;
    color: #797b80;
    float: left;
    margin-top: 15%;
}
.el-col-8{
    width: 20%;
}
.el-card{
    border: 0px white;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.courseCard{
    background-image: linear-gradient(180deg,rgba(255,255,255,0.6),rgba(244,164,96,0));
}
.tag{
    background-color: #FF7256;;
    color: white;
    font-weight: bolder;
    text-align: center;
    float: right;
    padding: 0 5px;
    margin-top: -24%;
}
</style>

