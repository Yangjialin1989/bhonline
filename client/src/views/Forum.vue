<template>
  <div>
    <Head></Head>

    <div class="bg">
      <van-sticky>
        <el-row :gutter="20">
          <el-col :span="navSpans" :offset="navOffsets">
            <div class="grid-content bg-purple">

              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item><img width="35" height="35" src="../assets/img/brand.png" alt=""></el-menu-item>
                <el-menu-item index="1">论坛首页</el-menu-item>
                <el-menu-item index="2">达人</el-menu-item>
                <el-menu-item index="3">排行榜</el-menu-item>
                <el-menu-item index="4">地图</el-menu-item>






                <el-menu-item>
                  <div >
                    <el-input placeholder="搜你所想" v-model="fournSearch" class="input-search">

                      <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                  </div>
                </el-menu-item>
                <el-menu-item>
                  <el-button :style="style2" type="danger">发帖</el-button>
                </el-menu-item>




                <el-menu-item id="box">

                  <span class="forumHeader" :style="style1">
                    <span><router-link  v-if="!this.$store.state.nickNameFlag" to="/login">登录</router-link></span>

                   <img v-if="this.$store.state.nickNameFlag"  class="img1" width="15" height="15" src="../assets/img/message.png" alt="">
                   <img v-if="this.$store.state.nickNameFlag" @mouseover="mouseOver" class="img2" width="25" height="25" :src="this.$store.state.headerImgData" alt="">
                   <span class="forumName"  v-if="this.$store.state.nickNameFlag">{{ this.$store.state.nickName }}</span>
                  </span>


                  <span><router-link  v-if="!this.$store.state.nickNameFlag" to="/regist">/ 注册</router-link></span>
                  <!-- <span @click="logout()"  v-if="this.$store.state.nickNameFlag">/ 退出</span> -->
                </el-menu-item>








              </el-menu>

              <van-notice-bar  v-if="this.$store.state.nickNameFlag" speed="50" mode="closeable" left-icon="volume-o" :text="textNote">
                <marquee width="800%;" behavior="" direction="">{{ this.$store.state.nickName+"," }}{{ textNote }}</marquee>
              </van-notice-bar>

            </div>
            <div class="grid-content bg-purple">
              content
              <div @mouseleave="mouseLeave">
              <el-menu v-if="menuFlag"
                    default-active="2" id="nav1"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose">

                    <el-menu-item index="1">
                      <img width="15px;"  height="15px;" src="../assets/img/attention.png" alt="">
                      <span slot="title">&nbsp;&nbsp;&nbsp;我的关注</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                      <img width="15px;"  height="15px;" src="../assets/img/collection.png" alt="">
                      <span slot="title">&nbsp;&nbsp;&nbsp;我的收藏</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                      <img width="15px;"  height="15px;" src="../assets/img/personCenter.png" alt="">
                      <span slot="title">&nbsp;&nbsp;&nbsp;个人中心</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                      <img width="15px;"  height="15px;" src="../assets/img/adminSet.png" alt="">
                      <span slot="title">&nbsp;&nbsp;&nbsp;账号设置</span>
                    </el-menu-item>


                    <el-menu-item index="5">
                      <img width="15px;"  height="15px;" src="../assets/img/invitation.png" alt="">
                      <span slot="title">&nbsp;&nbsp;&nbsp;我的帖子</span>
                    </el-menu-item>
                    <el-menu-item index="6">
                      <img width="15px;"  height="15px;" src="../assets/img/invitationSet.png" alt="">
                      <span slot="title">&nbsp;&nbsp;&nbsp;管理帖子</span>
                    </el-menu-item>
                    <div class="line"></div>
                    <el-menu-item index="7">
                      <img width="15px;"  height="15px;" src="../assets/img/help.png" alt="">
                      <span slot="title">&nbsp;&nbsp;&nbsp;帮助</span>
                    </el-menu-item>
                    <el-menu-item index="8">
                       <img width="15px;"  height="15px;" src="../assets/img/logout.png" alt="">
                      <span slot="title" @click="logout()">&nbsp;&nbsp;&nbsp;退出</span>
                    </el-menu-item>
                  </el-menu>
                  </div>


            </div>

          </el-col>
        </el-row>





      </van-sticky>



      <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png"
        alt="">

    </div>

    <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import axios from 'axios'
  export default {
    data() {
      return {
        menuFlag:false,
        menuFlag1:false,
        textNote:"欢迎来到悲华论坛！愿您永具菩提心！",
        style2:"",
        style1:'',
        navSpans:18,
        navOffsets:3,
        btnFlag: false,
        fournSearch: '',
      }
    },
    beforeCreate(){

    },
    created(){
      this.layout()
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop)
      console.log(document.document.Element.clientWidth)

    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      mouseOver(){
        this.menuFlag = true

      },
      mouseLeave(){

               this.menuFlag = false


      },
      layout(){
        var w = document.documentElement.scrollWidth;
        console.log(w)
        if(w < 1200){

          this.navSpans = 24
          this.navOffsets = 0
        }else{
          this.navSpans = 18
          this.navOffsets = 3
        }
        // if( w = 414 ){
        //   this.style1 = "margin-left:0px;"


        // }
        // if( w = 768){
        //   this.style1 = "margin-left:0px;"
        //   this.style2 = "margin-left:-20px;"
        // }
        // if( 769< w < 1025){
        //   this.style1 = "margin-left:100px;"
        // }
        // if( 1026 < w < 1130){
        //   this.style1 = "margin-left:250px;"
        //   console.log('hhh')
        // }
        // if( 1131 < w < 1200){
        //   this.style1 = "margin-left:250px;"
        // }
        // if( 1201 < w < 1250){
        //   this.style1 = "margin-left:1000px;"
        // }
        // if(1251 < w < 1300){
        //   this.style1 = "margin-left:110px;"
        // }
        // if( 1301 < w ){
        //   this.style1 = "margin-left:120px;"
        // }
      },
      logout(){
        axios.post('/api/admins/logout').then((result) =>{
          let res = result.data
          this.$store.state.nickName = ''
          this.$store.state.nickNameFlag = false
        })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      backTop() {
        const that = this
        let timer = setInterval(() => {
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if (that.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
        // document.documentElement.scrollTop = document.body.scrollTop = 0
      },
      scrollToTop() {
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if (that.scrollTop > 60) {
          that.btnFlag = true
        } else {
          that.btnFlag = false
        }
      },
    },
    components: {
      Head,
      Foot
    }
  }
</script>

<style scoped>
  #nav1{
    width:170px;
    position:absolute;right:13%;top:45%;
    boder:1px solid red;
  }
  .line{
    width:100%;height:1px;background-color: gainsboro;
  }
  #box{
    position:absolute;right:0.1%;

  }
  .forumName{
    margin-left:0px;
    margin-bottom: 0px;
  }
  .forumHeader{

  }
  .bg {
    height: 3000px;
  }

  .go-top {
    position: fixed;
    bottom: 40px;
    right: 30px;

  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .input-search {
    margin-top: 0px;
  }

</style>
