<template>
    <el-card class="All">
        <Navigator active-func="class"/>
        <el-card style="margin-top: 100px">
            <el-button @click="get_message_list()">好友消息</el-button>
            <el-dialog
                    :visible.sync="dialogVisible"
                    id="dialog"
                    title="好友消息"
                    width="30%">
                        <el-card id="big_card">
                            <el-col :key="index" v-for="(message,index) in messageList">
                                <el-card id="message_card">
                                    <div v-if="message.sender_id !== speakersId.user1Id" style="color: #ff7256;float: left;margin-right: 20px; font-size: 15px">{{message.name}}</div>
                                    <div v-if="message.sender_id === speakersId.user1Id" style="color: #409EFF;float: left;margin-right: 35px; font-size: 15px">{{message.name}}</div>
                                    <div style="color: #909399">{{message.send_time}}</div><br>
                                    {{message.content}}
                                </el-card>
                            </el-col>
                        </el-card>
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入消息内容"
                        v-model="text.textarea"
                        style="margin-top: 30px">
                </el-input>
                <el-button type="primary" style="margin-top: 10px; margin-left: 500px" @click="send_message">
                    发送
                </el-button>
                <br>
            </el-dialog>

        </el-card>
        <Footer/>
    </el-card>
</template>

<script>
    import Navigator from "@/components/Navigator";
    import Footer from "@/components/Footer";
    import * as noticeAPI from "@/APIs/notice.js";
    import moment from "moment";

    export default {
        name: "private_message",
        components: {
            Navigator,
            Footer,
        },
        data() {
            return {
                dialogVisible: false,
                speakersId: {
                    user1Id: 20,//this.$store.state.userId,
                    user2Id: 19,
                },
                text:{
                    senderId: "",
                    receiverId: "",
                    textarea: "",
                    time: "",
                },
                messageList: []
            };
        },
        created() {
        },

        methods: {
            async get_message_list() {
                const list = await noticeAPI.getPrivateMessages(this.speakersId);
                this.messageList = list.data;
                this.messageList.reverse();
                console.log(this.messageList);
                for(var num = 0;num<this.messageList.length;num++){
                    if(this.messageList[num].sender_id === this.speakersId.user1Id)
                    {
                        this.messageList[num].name = "您";
                    }
                    else
                    {
                        this.messageList[num].name = "对方";
                    }
                }
                this.dialogVisible = true;
            },

            async send_message()
            {
                this.text.senderId = this.speakersId.user1Id;
                this.text.receiverId = this.speakersId.user2Id;
                this.text.time = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                const res = await noticeAPI.sendPrivateMessages(this.text);
                if(res.data.msg === "success")
                {
                    this.get_message_list();
                    this.text.textarea="";
                }
                else{
                    //this.$message.error('消息发送失败');
                }
            }
        }
    }
</script>

<style scoped>
    .All {
        text-align: left;
    }

    #big_card {
        height: 350px;
        overflow: scroll;
        overflow-x: hidden;
    }

    #message_card {
        height: 100px;
        margin-bottom: 10px;
    }
</style>
