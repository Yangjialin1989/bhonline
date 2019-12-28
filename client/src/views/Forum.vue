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
                  <div>
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
                    <span>
                      <router-link v-if="!this.$store.state.nickNameFlag" to="/login">登录</router-link>
                    </span>
                    <img v-if="noteFlag" class="noteFlag" src="../assets/img/dote.png" width="8" height="8" alt="">
                    <img @mouseover="mouseOverNote" v-if="this.$store.state.nickNameFlag" class="img1" width="15"
                      height="15" src="../assets/img/message.png" alt="消息">
                    <img v-if="this.$store.state.nickNameFlag" @touchmove="gtouchmove()" @touchstart="gtouchstart()"
                      @mouseover="mouseOver" class="img2" width="25" height="25" :src="this.$store.state.headerImgData"
                      alt="">
                    <span class="forumName" v-if="this.$store.state.nickNameFlag">{{ this.$store.state.nickName }}</span>
                  </span>


                  <span>
                    <router-link v-if="!this.$store.state.nickNameFlag" to="/regist">/ 注册</router-link>
                  </span>
                  <!-- <span @click="logout()"  v-if="this.$store.state.nickNameFlag">/ 退出</span> -->
                </el-menu-item>
              </el-menu>

              <van-notice-bar v-if="this.$store.state.nickNameFlag" speed="50" mode="closeable" left-icon="volume-o"
                :text="textNote">
                <marquee width="800%;" behavior="" direction="">{{ this.$store.state.nickName+"," }}{{ textNote }}</marquee>
              </van-notice-bar>

            </div>
            <div class="grid-content " @touchend="gtouchend()" @touchstart="gtouchstart()">
            </div>
            <div class="panelContent">
              <div class="panelNav left">
                <van-sidebar class="sidebars" v-model="activeKey" @change="onChange">
                  <van-sidebar-item title="个人资料" dot />
                  <van-sidebar-item title="我的关注" info="5" />
                  <van-sidebar-item title="我的收藏" info="99+" />
                  <van-sidebar-item title="我的帖子" info="" />
                  <van-sidebar-item title="我的粉丝" info="" />
                  <van-sidebar-item title="我的论坛" info="1" />
                  <van-sidebar-item title="我的下载" info="2" />
                </van-sidebar>
              </div>
              <div class="panelContext1 left">
                <div class="left photoTitle">
                  <img width="80" height="80" :src="this.$store.state.headerImgData">
                  <p><a href="#">修改头像</a></p>

                </div>
                <div class="title0">

                  <span>等级：ROOT</span>
                  <span>关注：10</span>
                  <span>粉丝：1000</span>

                </div>
                <div class="title1"><a href="javascript:;">
                    <h5>个人主页</h5>
                  </a></div>

                <hr class="line2">
                <div class="title2"><a @click="show = true" href="javascript:;">修改资料</a></div>
                <div class="left">

                  <ul class="List1">

                    <li>昵称:&nbsp;&nbsp;&nbsp;阳光</li>
                    <li>法名:&nbsp;&nbsp;&nbsp;会光</li>
                    <li>实名:&nbsp;&nbsp;&nbsp;杨佳霖</li>
                    <li>性别:&nbsp;&nbsp;&nbsp;男</li>
                    <li>地区:&nbsp;&nbsp;&nbsp;辽宁省抚顺市</li>
                    <li>职业:&nbsp;&nbsp;&nbsp;IT</li>
                    <li>简介:&nbsp;&nbsp;&nbsp;今天天气不错</li>
                  </ul>

                </div>
              </div>

            </div>
            <el-menu v-if="menuFlag" default-active="2" id="nav1" class="el-menu-vertical-demo" @open="handleOpen"
              @close="handleClose">

              <el-menu-item index="1">
                <img width="15px;" height="15px;" src="../assets/img/attention.png" alt="">
                <span @click="onChange(1)" slot="title">&nbsp;&nbsp;&nbsp;我的关注</span>
              </el-menu-item>
              <el-menu-item index="2">
                <img width="15px;" height="15px;" src="../assets/img/collection.png" alt="">
                <span slot="title" @click="onChange(2)">&nbsp;&nbsp;&nbsp;我的收藏</span>
              </el-menu-item>
              <el-menu-item index="3">
                <img width="15px;" height="15px;" src="../assets/img/personCenter.png" alt="">
                <span slot="title" @click="onChange(0)">&nbsp;&nbsp;&nbsp;个人中心</span>
              </el-menu-item>
              <el-menu-item index="4">
                <img width="15px;" height="15px;" src="../assets/img/adminSet.png" alt="">
                <span slot="title">&nbsp;&nbsp;&nbsp;账号设置</span>
              </el-menu-item>


              <el-menu-item index="5">
                <img width="15px;" height="15px;" src="../assets/img/invitation.png" alt="">
                <span slot="title" @click="onChange(3)">&nbsp;&nbsp;&nbsp;我的帖子</span>
              </el-menu-item>
              <el-menu-item index="6">
                <img width="15px;" height="15px;" src="../assets/img/invitationSet.png" alt="">
                <span slot="title">&nbsp;&nbsp;&nbsp;管理帖子</span>
              </el-menu-item>
              <div class="line"></div>
              <el-menu-item index="7">
                <img width="15px;" height="15px;" src="../assets/img/help.png" alt="">
                <span slot="title">&nbsp;&nbsp;&nbsp;帮助</span>
              </el-menu-item>
              <el-menu-item index="8">
                <img width="15px;" height="15px;" src="../assets/img/logout.png" alt="">
                <span slot="title" @click="logout()">&nbsp;&nbsp;&nbsp;退出</span>
              </el-menu-item>
            </el-menu>


            <div @mouseleave="mouseLeaveNote">
              <el-menu v-if="menuFlagNote" default-active="2" id="nav2" class="el-menu-vertical-demo" @open="handleOpen"
                @close="handleClose">

                <el-menu-item index="1">

                  <span @click.self="gclick()" slot="title">&nbsp;&nbsp;&nbsp;公告</span>
                </el-menu-item>
                <el-menu-item index="2">

                  <span slot="title">&nbsp;&nbsp;&nbsp;评论</span>
                </el-menu-item>
                <el-menu-item index="3">

                  <span slot="title">&nbsp;&nbsp;&nbsp;关注</span>
                </el-menu-item>
                <el-menu-item index="4">

                  <span slot="title">&nbsp;&nbsp;&nbsp;私信</span>
                </el-menu-item>


                <el-menu-item index="5">

                  <span slot="title">&nbsp;&nbsp;&nbsp;论坛通知</span>
                </el-menu-item>


              </el-menu>



              <van-overlay :show="show" @click="show = false">
                <div class="wrapper" @click.stop>
                  <van-address-edit id="personInformation" :area-list="areaList" show-postal show-delete
                    show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave" @delete="onDelete" @change-detail="onChangeDetail">
                  </van-address-edit>
                </div>
              </van-overlay>











            </div>

          </el-col>
        </el-row>
      </van-sticky>
    </div>
    <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png"
      alt="">

    <Foot></Foot>



  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import afterSaleImage from '@/components/afterSaleImage'
  import axios from 'axios'
 
  export default {
    data() {
      return {
        menuFlag: false,
        menuFlag1: false,
        textNote: "欢迎来到悲华论坛！愿您永具菩提心！",
        style2: "",
        style1: '',
        navSpans: 18,
        navOffsets: 3,
        btnFlag: false,
        fournSearch: '',
        noteFlag: false,
        menuFlagNote: false,
        activeKey: 0,
        nickName: this.$store.state.nickName,
        areaList:[],
        searchResult: [],
        show: false
      }
    },
    beforeCreate() {

    },
    created() {
      this.layout()
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop)

    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      onSave() {
        Toast('save');
      },
      onDelete() {
        Toast('delete');
      },
      onChangeDetail(val) {
        if (val) {
          this.searchResult = [{
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }];
        } else {
          this.searchResult = [];
        }
      },
      onChange(index) {
        console.log({
          type: 'primary',
          message: index
        });
        this.activeKey = index;
      },
      gclick() {
        console.log('hhh')
      },
      gtouchstart() {
        window.console.log('1,anxialalllll')
        this.menuFlag = true;
      },
      gtouchmove() {
        window.console.log('2，按下并且在移动呢')
      },
      gtouchend() {
        window.console.log('3，松开啦啦啦啦啦')
        this.menuFlag = false
      },

      mouseOver() {
        this.menuFlag = true
        this.menuFlagNote = false

      },
      mouseLeave() {

        this.menuFlag = false


      },
      mouseOverNote() {
        this.menuFlagNote = true
        this.menuFlag = false

      },
      mouseLeaveNote() {

        this.menuFlagNote = false


      },
      layout() {
        var w = document.documentElement.scrollWidth;

        if (w < 1200) {

          this.navSpans = 24
          this.navOffsets = 0
        } else {
          this.navSpans = 18
          this.navOffsets = 3
        }
        if (w > 1201) {
          window.document.documentElement.style.fontSize = "75px";
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
      logout() {
        axios.post('/api/admins/logout').then((result) => {
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
      Foot,
      afterSaleImage
    }
  }
</script>

<style scoped>
  #personInformation {
    position: absolute;
    top: 10%;
    left: 20%;

  }

  .title0 {
    margin-top: 100px;
    margin-left: -120%;
    color: #FF5151;
  }

  .title1 {
    margin-top: 10px;

  }

  .title2 {
    margin-left: 90%;
  }

  .line2 {
    margin-top: 10px;
  }

  .List1 {
    margin-left: 120px;
    margin-top: 0px;
    font-size: 18px;

  }

  .List1 li {
    text-align: left;
    line-height: 40px;
    color: #4F4F4F;
  }

  .photoTitle {
    margin-left: 30px;
    margin-top: 50px;
  }

  .left {
    float: left;
  }

  .sidebars {
    width: 100px;
  }

  .panelContext1 {

    width: 78%;
    height: 500px;
  }


  #nav2 {
    width: 100px;
    position: absolute;
    right: 15%;
    top: 11%;
    border: 0px solid red;
  }

  .noteFlag {
    position: absolute;
    right: 72%;
    top: 22px;
  }

  #nav1 {
    width: 180px;
    position: absolute;
    right: 12%;
    top: 11%;
    border: 0px solid red;
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: gainsboro;
  }

  #box {
    position: absolute;
    right: 0.1%;

  }

  .forumName {
    margin-left: 0px;
    margin-bottom: 0px;
  }

  .forumHeader {}

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
