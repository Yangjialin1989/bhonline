<template>
  <div>
    <div class="wrap">


      <div class="contents">
        <ul class="content1">
          <li class="close1">
            <router-link to="/"><i class="el-icon-close right"></i></router-link>
          </li>


             <li>
          <img class="left" src="../../static/img/brand.png" style="width:40px;height:40px;">
          <span class="left title">·用户名密码登录</span>
        </li>
        <li>
          <el-input id="input1" required="required" name="userName" class="nav1" v-model="userName"  @input="change($event)"  @blur="nameRequired" placeholder="手机/邮箱/用户名"></el-input>


             <span class="errmessage msg1">{{ usermsg }}</span>
        </li>
        <li>
          <el-input class="nav2" required="required" v-model="userPwd"  @input="change($event)" @blur="auditingPassword" show-password placeholder="密码"></el-input>
          <span class="errmessage msg2">{{ pwdmsg }}</span>
        </li>
        <li class="left t">
          <el-checkbox class='left' v-model='checked'>
            <p>
             记住密码

            </p>
          </el-checkbox>
        </li>
        <!-- <li>
          <div class="error-wrap">
          	<span class="error error-show" v-if="errFlag">用户名或密码错误</span>
          </div>
        </li> -->
        <li>
           <el-button class="left btn" type="primary"  @click='login()'>登录</el-button>
           <span v-if="errFlag" class="errmessage msg3" v-text="errMessage"></span>
        </li>


          <li class="left btn1">
            <a class="left" href="#">忘记密码?</a>
          </li>
          <li class='btn2 left'>
            <p>
              <span class="left btn4">第三方登录&nbsp;&nbsp;|</span>
              <router-link to=""><img class='left img1' style="width:14px;height:14px;" src="../../static/img/wx.png"
                  alt=""></router-link>
              <router-link to=""><img class="left img2" style="width:14px;height:14px;" src="../../static/img/QQ.png"
                  alt=""></router-link>
              <span class="right btn3">
                <router-link to="/regist">立即注册</router-link>
              </span>
            </p>

          </li>
        </ul>

      </div>


    </div>

  </div>







</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Login',
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        checked:'',
        ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules: {
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          age: [{
            validator: checkAge,
            trigger: 'blur'
          }]
        },
        errMessage: '',
        userName: '',
        userPwd: '',
        isShow: false,
        usermsg: '',
        pwdmsg: '',
        errFlag:true
      }
    },
    mounted: function() {
      //记住密码
      this.getCookie()
    },
    computed: {

    },
    methods: {

      login() {
        //判断复选框是否被勾选 勾选则调用配置cookie方法
        if (this.checked == true) {
          console.log("checked == true")
          this.setCookie(this.userName, this.userPwd, 7)
        } else {
          console.log("清空Cookies")
          //清空Cookies
          this.clearCookie()
        }

        // axios.post('/api/admins/checkHeaderImg',{
        //   userName:this.userName
        // }).then((result)=>{
        //   let res = result.data

        // })


        axios.post('/api/admins/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then((result) => {

          let res = result.data
          //console.log(res.res.children)
          if(res.msg){
            this.errFlag = true
            this.errMessage = "用户名或密码错误!"

          }else{

           // this.$store.state.nickName = res.result.nickName
            this.$store.state.nickNameFlag = true
            if(res.res.children.length == 0){
              this.$store.state.headerImgData = res.res.children[0]
            }else{
              this.$store.state.headerImgData = res.res.children[0].content
            }
           //
            this.$router.push('/forum')

          }







        })
      },
      //设置Cookie
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        var a = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();

        var b =  "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        //window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
       window.document.cookie = unescape(a);

       // window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
       window.document.cookie = unescape(b)
        console.log(this.$store.state.nickName)
      },
      //读取cookie
      getCookie: function() {
        if (document.cookie.length > 0) {

          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割


            //判断查找相对应的值
            if (arr2[0] == 'userName') {
             this.userName =arr2[1]; //保存到保存数据的地方
               // this.userName = unescape(arr2[1])

            } else if (arr2[0] == 'userPwd') {
              this.userPwd = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      },
      checkLogin() {
        axios.post('/api/admins/checkLogin').then((result) => {
          let res = result.data
          this.$store.state.nickName = res.result
        })
      },
      change(e) {
        this.$forceUpdate()
      },
      nameRequired:function(){
        if(this.userName ==''){
          this.usermsg="用户名不能为空!"
        }else{
          this.usermsg=""
        }
      },
      auditingPassword:function(){

        if(this.userPwd ==''){
          this.pwdmsg="密码不能为空!"
        }else{
          this.pwdmsg = ""
        }
      },



    }
  }
</script>

<style scoped>
  .msg2{
    margin-right:22px;
  }
  .msg3{
    margin-right:60px;
  }
  .errmessage{
    color:red;
    font-size:20px;
    background-color:yellow;

  }
  .contents {
    margin: 0 auto;
    border: 1px solid blueviolet;
    width: 450px;
    height: 550px;
    padding-right: 14px;
    padding-left: 30px;
    box-shadow: 4px 4px 5px #99A9BF;
  }

  .content1 {
    margin-left: -24px;
  }

  .close1 {
    height: 10px;
    margin-bottom: 5px;
  }

  .nav1 {
    margin-top: 50px;
    margin-bottom: 20px;

  }

  .nav2 {
    margin-bottom: 10px;
  }

  .title {
    line-height: 30px;
    font-size: 25px;
    margin-top: 12px;
  }

  .btn {
    display: block;
    float: left;
  }

  .t {
    width: 100%;
  }

  .btn1 {
    width: 100%;
    float: left;
    margin-top: 3px;
  }

  .btn2 {
    width: 100%;
    background-color: #B3D8FF;
    margin-top: 4px;
  }

  .btn3 {
    margin-right: 4px;
  }

  .btn4 {
    margin-left: 10px;
  }

  .img1 {
    margin-right: 15px;
    margin-left: 10px;
  }
</style>
