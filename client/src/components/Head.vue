<template>
  <div>
    <el-row>
      <el-col :span="24">
        <router-link class="nav1 el-icon-location-information" to="/map">网站地图</router-link>
        <span class="nav1">&nbsp;</span>
        <router-link class="nav1 el-icon-help" to="/help">帮助中心</router-link>

        <span class="nav1">&nbsp;</span>
        <router-link v-if="!this.$store.state.nickNameFlag" class="nav1 el-icon-user" to="/regist">注册</router-link>
        <a href="javascript:void(0)" v-if="this.$store.state.nickNameFlag" class="nav1 el-icon-switch-button" @click="logout()">退出</a>
        <span class="nav1">&nbsp;</span>
        <router-link v-if="!this.$store.state.nickNameFlag" class="nav1 el-icon-s-custom" to="/login">登录</router-link>

        <span class="nav1 el-icon-s-custom" v-if="this.$store.state.nickNameFlag">{{ this.$store.state.nickName }}</span>

        <span class="left" style="color:black;margin-left:3px;">{{weather.city}}</span>
        <span class="left" style="color:black;margin-left:3px;">今日{{weather.update_time}}</span>
        <span class="left" style="color:red;margin-left:3px;">{{weather.wea}}</span>
        <span class="left" style="color:red;margin-left:3px;">{{weather.tem}}℃</span>
        <span class="left" style="color:red;margin-left:3px;">{{weather.win}}</span>
        <span class="left" style="color:red;margin-left:3px;">{{weather.win_speed}}</span>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="demo-image">
          <div class="block">

            <el-image style="width: 100%; height: 100%" src="../../static/img/Bg-01.png"></el-image>
          </div>
        </div>

      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-container width="2000px">
          <div class="line"></div>



          <!-- background-color="#545c64" -->
          <el-menu class="el-menu-demo" style="width:100%;" :default-active="this.$route.path" router mode="horizontal"
            @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="/" style="width:10%;">首页</el-menu-item>
            <el-menu-item index="/hierophant" style="width:10%;">导师</el-menu-item>
            <el-menu-item index="/buddhist" style="width:10%;">道场</el-menu-item>
            <el-submenu index="4" style="width:10%;">
              <template slot="title">教言</template>
              <el-menu-item index="4-1">祖师教言摘选</el-menu-item>
              <el-menu-item index="4-2">禅师开示选集</el-menu-item>
              <el-menu-item index="4-3">禅师诗文选集</el-menu-item>
            </el-submenu>
            <el-submenu index="5" style="width:10%;">
              <template slot="title">缁行</template>
              <el-menu-item index="5-1">记事年谱</el-menu-item>
              <el-menu-item index="5-2">云水僧踪</el-menu-item>
            </el-submenu>
            <el-submenu index="6" style="width:10%;">
              <template slot="title">慈宗</template>
              <el-menu-item index="6-1">慈宗诸义</el-menu-item>
              <el-menu-item index="6-2">人生佛教</el-menu-item>
              <el-menu-item index="6-3">太虚全书</el-menu-item>
            </el-submenu>
            <el-submenu index="7" style="width:10%;">
              <template slot="title">影音</template>
              <el-menu-item index="6-1">图片</el-menu-item>
              <el-menu-item index="6-2">视频</el-menu-item>
              <el-menu-item index="6-3">音频</el-menu-item>
            </el-submenu>
            <el-menu-item index="/data" style="width:10%;">数据</el-menu-item>
            <el-menu-item index="/forum" style="width:10%;">论坛</el-menu-item>
            <el-menu-item index="/contact" style="width:10%;">联系</el-menu-item>
          </el-menu>



        </el-container>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Head',
    data() {
      return {
        weather:''

      }
    },
    computed:{

    },
    created(){
    axios({
             method: 'get',
             url:'https://www.tianqiapi.com/free/day?appid=75698768&appsecret=7LyHELsc&city=福州'
        }).then((response) => {
            console.log(response);//查看接口返回的数据
           // this.wea=response.data.wea;//天气
           // this.tem=response.data.tem;//温度
           // this.wea_img=response.data.wea_img;//图标名称
            console.log(response.data)
            this.weather = response.data
            }, function(response) {
            console.log("错误信息：" + response)
        });
        
      this.layout()
    },
    methods: {
      layout(){
        var w = document.documentElement.scrollWidth;
        if(w > 1201){
          window.document.documentElement.style.fontSize = "75px";
        }
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        axios.post('/api/admins/logout').then((result) =>{
          let res = result.data
          this.$store.state.nickName = ''
          this.$store.state.nickNameFlag = false
        })
      },
      checkLogin(){
        axios.post('/api/admins/checkLogin').then((result)=>{
          let res = result.data
          console.log(res)
          this.$store.state.nickName = res.result
        })
      },
    },
    mounted: function() {

      this.checkLogin()

      //可用于设置自适应屏幕，根据获得的可视宽度（兼容性）判断是否显示
      let w = document.documentElement.offsetWidth || document.body.offsetWidth;
      if (w < 1000) {
        this.show = false;
      }

    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .imgbox{
    background:url(../../../../../../Node/01/ip地址和端口号.png)
  }
  .el-row {
    margin-bottom: 0px;


  }

  .nav1 {
    float: right;
  }

  .nav2 {
    margin-top: -3px;
  }

  .el-col {
    border-radius: 4px;
  }


  .bg-purple-dark {
    background: #99a9bf;
  }


  .el-menu-demo {
    /*width:100%;
    height:100%;*/
  }

  .el-menu {
    /*width:100%;*/
  }
</style>
