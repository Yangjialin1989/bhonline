<template>
  <div>
    <div class="wrap">


    <div class="contents" >
      <ul class="content1">
        <li class="close1">
          <router-link to="/"><i class="el-icon-close right"></i></router-link>
        </li>
        <li>
          <img class="left" src="../../static/img/brand.png" style="width:40px;height:40px;"alt="">
          <span class="left title">·用户名密码登录</span>
        </li>
        <li>
          <el-input class="nav1" v-model="username" placeholder="手机/邮箱/用户名"></el-input>
        </li>
        <li>
          <el-input class="nav2" v-model="password" show-password placeholder="密码"></el-input>
        </li>
        <li class="left t">
          <el-checkbox class='left' v-model='checked'>
            <p>
              下次自动登录

            </p>
          </el-checkbox>
        </li>
        <li>
           <el-button class="left btn" type="primary">登录</el-button>
        </li>
        <li class="left btn1">
          <a class="left" href="#">忘记密码?</a>
        </li>
        <li class='btn2 left'>
          <p>
            <span class="left btn4">第三方登录&nbsp;&nbsp;|</span>
            <router-link to=""><img class='left img1' style="width:14px;height:14px;" src="../../static/img/wx.png" alt=""></router-link>
            <router-link to=""><img class="left img2" style="width:14px;height:14px;" src="../../static/img/QQ.png" alt=""></router-link>
            <span class="right btn3"><router-link to="/regist">立即注册</router-link></span>
          </p>

        </li>
      </ul>

    </div>


   </div>

  </div>







</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        username:'',
        password:'',
        isShow:True,
        checked:''
      }
    },
    methods:{


      
    }
  }
</script>

<style scoped>
  .contents{
    margin:0 auto;
    border: 1px solid blueviolet;
    width:400px;
    height:500px;
    padding-right: 14px;
    box-shadow:4px 4px 5px #99A9BF;
  }
  .content1{
    margin-left:-24px;
  }
  .close1{
    height:10px;
    margin-bottom: 5px;
  }
  .nav1{
    margin-top:50px;
    margin-bottom: 20px;

  }
  .nav2{
    margin-bottom: 10px;
  }
  .title{
    line-height: 30px;
    font-size:25px;
    margin-top:12px;
  }
  .btn{
    display: block;float:left;
  }
  .t{
    width:100%;
  }
  .btn1{
    width:100%;
    float:left;
    margin-top:3px;
  }
  .btn2{
    width:100%;
    background-color:#B3D8FF;
    margin-top:4px;
  }
  .btn3{
    margin-right: 4px;
  }
  .btn4{
    margin-left:10px;
  }
  .img1{
    margin-right:15px;
    margin-left:10px;
  }

</style>
