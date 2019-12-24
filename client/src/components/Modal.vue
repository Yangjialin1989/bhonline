<template>
  <div>
    <el-card class="box-card box1" id="box" shadow="hover">
      <div slot="header" class="clearfix" >
        <span style="float : left ; margin-left:10px;font-weight: 500;font-size:18px;">意见反馈</span>
        <el-button @click="close" style="float: right; padding: 3px 0" type="text">关闭</el-button>
      </div>
      <div class="ct1">
        <el-form class="left f1" ref="form" :model="form" label-width="100px">
          <el-form-item label="问题描述:" required>
            <el-input type="textarea"  rows="5" cols="5" v-model="form.question"  placeholder="请输入遇到问题的账号名及描述" @blur="questionRequired"></el-input>
            <span class="errmessage">{{ questionMsg}}</span>
          </el-form-item>

          <el-form-item label="相关图片:">
            <el-upload
            class="upload-demo picture"
            drag
            action="https://jsonplaceholder.typicode.com/posts"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">单张图片大小不超过2M，最多3张</div>
          </el-upload>
          </el-form-item>
          <el-form-item label="联系方式:" required>
            <el-input type="text" v-model="form.email"  placeholder="请输入邮箱,我们会尽快将处理"  @blur="feedBackRequired"></el-input>
            <span class="errmessage">{{ feedBackMsg}}</span>
          </el-form-item>
            <el-button type="primary" @click="onSubmit">提交反馈</el-button>
            <el-button @click="close">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="box-card box1" id="box1" >
      <div slot="header" class="clearfix">
        <span style="float : left ; margin-left:10px;font-weight: 500;font-size:18px;">在线客服</span>
        <el-button @click="close1" style="float: right; padding: 3px 0" type="text">关闭</el-button>
      </div>
      <div class="text item">
        请添加微信：*********   ；欢迎您宝贵的建议！
      </div>
    </el-card>

  </div>
</template>

<script>
  import * as sysTool from '../assets/js/systemTool'
  import axios from 'axios'
  export default {

    data() {
      return {
        feedBackMsg:'',
        questionMsg:'',
        ip:'1.1.1.1',
        area:'北京市',
        brower:'chrome',
        os:'windows7',
        form: {
          question: '',
          email:''
        }
      }
    },
    mounted(){
      this.getIp()
    },
    methods: {
      getIp(){
        let cip = returnCitySN['cip']
        let cname = returnCitySN['cname']
        this.ip = cip
        this.cname = cname
        this.area = sessionStorage.getItem('area')
        this.brower = sysTool.GetCurrentBrowser()
        this.os = sysTool.GetOs()
        console.log(this.ip + this.area + this.brower + this.os )

      },
      onSubmit() {

        if(this.form.question&&this.form.email){
          let myDate = new Date().getTime()+28800000
          let myDate1 = new Date(myDate)
         let data = {
          feedBackQuestion:this.form.question,
          feedBackEmail:this.form.email,
          feedBackIp:this.ip+this.cname,
          feedBackTime:myDate1

        }
        axios.post('/api/feedBacks/feedBack',data).then((result)=>{
          let res = result.data
          if(res.status ==0 ){
            console.log('反馈成功！')
          }else{
            console.log('反馈失败！')
          }
        })
        }else{
          alert('请填写完整，在提交！')
          if(this.form.question == ''){
             this.questionMsg="问题描述不能为空!"
          }
          if(this.form.email == ''){
             this.feedBackMsg="联系不能为空!"
          }
        }





      },
      close(){
        $('#box').hide();
        $('.bg').removeClass('black_over')
        $('.row-bg').removeClass('black_over')
      },
      close1(){
        $('#box1').hide();
        $('.bg').removeClass('black_over')
        $('.row-bg').removeClass('black_over')
      },
      questionRequired:function(){
        if(this.form.question ==''){
          this.questionMsg="问题描述不能为空!"
        }else{
          this.questionMsg=""
        }
      },
      feedBackRequired:function(){
        if(this.form.email ==''){
          this.feedBackMsg="联系不能为空!"
        }else{
          this.feedBackMsg=""
        }
      }
    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  #box,#box1{
    width:670px;
  }
  .pictuer{
    padding-right:20px;
  }
  .box1{
    position:fixed;top:20%;left:8%;
    display:none;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .errmessage{
    color:red;
    font-size:20px;
    background-color:yellow;

  }
</style>
