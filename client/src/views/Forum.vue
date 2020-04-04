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
                <el-menu-item index="1" @click='showLeft()'>论坛首页</el-menu-item>
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

              <van-notice-bar v-if="this.$store.state.nickNameFlag" mode="closeable" left-icon="volume-o" :text="textNote">
                <marquee width="800%;" behavior="" direction="">{{ this.$store.state.nickName+"," }}{{ textNote }}</marquee>
              </van-notice-bar>

            </div>
            <div class="grid-content " @touchend="gtouchend()" @touchstart="gtouchstart()">
            </div>

            <div>
              论坛首页
              论坛首页
            </div>

            <!-- 侧边标签页 -->

            <el-tabs  style="height: 200px;"  tabPosition='left'>
               <el-tab-pane label="个人资料">个人资料</el-tab-pane>
               <el-tab-pane label="我的关注">我的关注</el-tab-pane>
               <el-tab-pane label="我的收藏">我的收藏</el-tab-pane>
               <el-tab-pane label="我的帖子">我的帖子</el-tab-pane>
               <el-tab-pane label="我的粉丝">我的粉丝</el-tab-pane>
               <el-tab-pane label="我的论坛">我的论坛</el-tab-pane>
               <el-tab-pane label="我的下载">我的下载</el-tab-pane>
            </el-tabs>


            <div v-if="showLeftFlag" class="panelContent">
              <div class="panelNav left">
                <van-sidebar class="sidebars" v-model="activeKey" @change="onChange">
                  <van-sidebar-item title="个人资料" dot @click="show0Flag()" />
                  <van-sidebar-item title="我的关注" info="5" @click="show1Flag()" />
                  <van-sidebar-item title="我的收藏" info="99+" @click="show2Flag()" />
                  <van-sidebar-item title="我的帖子" info="" @click="show3Flag()" />
                  <van-sidebar-item title="我的粉丝" info="" />
                  <van-sidebar-item title="我的论坛" info="1" />
                  <van-sidebar-item title="我的下载" info="2" />
                </van-sidebar>
              </div>



              <div v-if="showFlag0" class="panelContext1 left">
                <div class="left photoTitle">
                  <img width="80" height="80" :src="this.$store.state.headerImgData">
                  <p><a @click="showUpLoad = true" href="javascript:;">修改头像</a></p>

                </div>
                <div class="title0">
                  <span>等级：ROOT1</span>
                  <span>&nbsp;</span>
                  <span>关注：101</span>
                  <span>&nbsp;</span>
                  <span>粉丝：10010</span>
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

              <div v-if="showFlag1" class="panelContext1 left">
                我的关注
              </div>

              <div v-if="showFlag2" class="panelContext1 left">
                我的收藏
              </div>

              <div v-if="showFlag3" class="panelContext1 left">
                我的帖子
              </div>

              <div  class="panelContext1 left admin_set">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="基本信息" name="first">
                    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
                      修改基本信息，为确保您的信息安全，最好设定完密码保护。
                    </van-notice-bar>

                    <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />


                    <el-table :data="tableData1.filter(data => !search || data.data.toLowerCase().includes(search.toLowerCase()))"
                      class="tb-edit" highlight-current-row @row-click="handleCurrentChange" style="width: 100%;height:400px;overflow: scroll;">
                      <el-table-column label="分类" width="180" prop="data">

                      </el-table-column>
                      <el-table-column label="数据" width="180">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.content" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
                          <span v-text="scope.row.content"></span>
                        </template>
                      </el-table-column>

                      <el-table-column label="操作" align="right">
                        <template slot="header" slot-scope="scope">
                          <el-input id="search1" v-model="search" size="mini" placeholder="输入关键字搜索" />
                        </template>
                        <template slot-scope="scope">
                          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                        </template>
                      </el-table-column>

                    </el-table>







                  </el-tab-pane>
                  <el-tab-pane label="配置管理" name="second">开发中...</el-tab-pane>
                  <el-tab-pane label="角色管理" name="third">开发中...</el-tab-pane>
                  <el-tab-pane label="密码保护" name="fourth">
                    <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
                      问题输入框会自动加载一些默认问题目录，可供您参考，选中后若错误提示，可以再次尝试。
                    </van-notice-bar>

                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item label="问题1" prop="que1">
                        <el-autocomplete v-model="ruleForm.que1" placeholder="请输入内容" style="width:100%;" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
                      </el-form-item>
                      <el-form-item label="答案1" prop="ans1">
                        <el-input v-model="ruleForm.ans1" placeholder="请输入内容"></el-input>
                      </el-form-item>
                      <el-form-item label="问题2" prop="que2">
                        <el-autocomplete v-model="ruleForm.que2" placeholder="请输入内容" style="width:100%;" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>
                      </el-form-item>
                      <el-form-item label="答案2" prop="ans2">
                        <el-input v-model="ruleForm.ans2" placeholder="请输入内容"></el-input>
                      </el-form-item>
                      <el-form-item label="问题3" prop="que3">
                        <el-autocomplete v-model="ruleForm.que3" placeholder="请输入内容" style="width:100%;" :fetch-suggestions="querySearchAsync" @select="handleSelect"></el-autocomplete>

                      </el-form-item>
                      <el-form-item label="答案3" prop="ans3">
                        <el-input v-model="ruleForm.ans3" placeholder="请输入内容"></el-input>
                      </el-form-item>

                      <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                      </el-form-item>
                    </el-form>





                  </el-tab-pane>
                </el-tabs>
              </div>


            </div>
            <div @mouseleave="menuLeave" @mouseover="menuOver">
              <el-menu v-if="menuFlag" default-active="2" id="nav1" class="el-menu-vertical-demo">

                <el-menu-item index="1">
                  <img width="15px;" height="15px;" src="../assets/img/attention.png" alt="">
                  <!-- <span @click="onChange(1)" slot="title">&nbsp;&nbsp;&nbsp;我的关注</span> -->
                  <span @click="show1Flag()" slot="title">&nbsp;&nbsp;&nbsp;我的关注</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <img width="15px;" height="15px;" src="../assets/img/collection.png" alt="">
                  <span slot="title" @click="show2Flag()">&nbsp;&nbsp;&nbsp;我的收藏</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <img width="15px;" height="15px;" src="../assets/img/personCenter.png" alt="">
                  <span slot="title" @click="show0Flag()">&nbsp;&nbsp;&nbsp;个人中心</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <img width="15px;" height="15px;" src="../assets/img/adminSet.png" alt="">
                  <span slot="title" @click="show_adminSet()">&nbsp;&nbsp;&nbsp;账号设置</span>
                </el-menu-item>


                <el-menu-item index="5">
                  <img width="15px;" height="15px;" src="../assets/img/invitation.png" alt="">
                  <span slot="title" @click="show3Flag()">&nbsp;&nbsp;&nbsp;我的帖子</span>
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
            </div>

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
                  <!-- <van-address-edit id="personInformation" :area-list="areaList" show-postal show-delete
                    show-set-default show-search-result :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']"
                    @save="onSave" @delete="onDelete" @change-detail="onChangeDetail">
                  </van-address-edit> -->
                </div>
              </van-overlay>

              <!-- 上传图片 -->
              <van-overlay :show="showUpLoad" @click="showUpLoad = false">
                <div class="wrapper" @click.stop>
                  <afterSaleImage></afterSaleImage>
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
        restaurants: [],
                state: '',
                timeout:  null,
        ruleForm: {
          que1: '',
          que2: '',
          que3: '',
          ans1: '',
          ans2: '',
          ans3: '',
        },
         rules: {
                  que1:
                  [
                    { required: true, message: '请输入问题1', trigger: 'blur' },
                    { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
                  ],
                  que2:
                  [
                    { required: true, message: '请输入问题2', trigger: 'blur' },
                    { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
                  ],
                  que3:
                  [
                    { required: true, message: '请输入问题3', trigger: 'blur' },
                    { min: 5, max: 25, message: '长度在 5 到 25 个字符', trigger: 'blur' }
                  ],
                  ans1:
                  [
                    { required: true, message: '请输入答案1', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                  ],
                  ans2:
                  [
                    { required: true, message: '请输入答案2', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                  ],
                  ans3:
                  [
                    { required: true, message: '请输入答案3', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                  ],

         },


        showEdit: [0, 1, 2, 3, 4, 5],
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        tableData1: [{
            data: '法名',
            content: '会光'
          },
          {
            data: '姓名',
            content: '杨佳霖'
          },
          {
            data: '性别',
            content: '男'
          },
          {
            data: '年龄',
            content: '31'
          },
          {
            data: '籍贯',
            content: '王小虎'
          },
          {
            data: '皈依年份',
            content: '2014'
          },
          {
            data: '生日',
            content: '1989.11.03'
          },
          {
            data: 'email',
            content: '729850713@qq.com'
          },
          {
            data: 'tel',
            content: '13696812048'
          },
          {
            data: '爱好',
            content: '佛学，篮球，足球'
          },



        ],
        search: '',
        contents: '',
        showLeftFlag:false,
        showFlag0: false,
        showFlag1: false,
        showFlag2: false,
        showFlag3: false,
        showFlag4: false,
        showFlag5: false,
        showFlag6: false,
        activeIndex: '',
        speed: '50',
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
        areaList: [],
        searchResult: [],
        show: false,
        showUpLoad: false,


      }
    },
    beforeCreate() {

    },
    created() {
      this.layout();

    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop);
      this.restaurants = this.loadAll();

    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      showLeft(){
        this.showLeftFlag = true;
      },
      loadAll() {
              return [
                { "value": "哪一年皈依佛教的?" },
                { "value": "您的出生地是?" },
                { "value": "您高中班主任的名字是?" },
                { "value": "您小学班主任的名字是?" },
                { "value": "您的学号(或工号)是?" },
                { "value": "您的生日是?" },
                { "value": "您父亲的生日是?" },
                { "value": "您母亲的生日是?" },
                { "value": "我最爱吃的水果是?" },
                { "value": "我最喜欢的电影?" },
                { "value": "诸法之精要为何?" },
                { "value": "中国有多少人口?" },
              ];
            },
            querySearchAsync(queryString, cb) {
              var restaurants = this.restaurants;
              var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

              clearTimeout(this.timeout);
              this.timeout = setTimeout(() => {
                cb(results);
              }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
              return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
              };
            },
            handleSelect(item) {
              console.log(item);
            }
        ,
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              'userName':this.$store.state.nickName,
              'pwd_question1':this.ruleForm.que1,
              'pwd_answer1':this.ruleForm.ans1,
              'pwd_question2':this.ruleForm.que2,
              'pwd_answer2':this.ruleForm.ans2,
              'pwd_question3':this.ruleForm.que3,
              'pwd_answer3':this.ruleForm.ans3,
            };
            axios.post('/api/admins/pwd_protection',data).then((result)=>{
              let res = result.data
              if(res.status ==0 ){
                console.log('密保设定成功！')
                this.open()
                this.$router.push('/forum')
              }else{
                console.log('密保设定失败！')
              }
            })
            console.log(this.ruleForm)
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleCurrentChange(row, event, column) {
        //console.log(row, event, column, event.currentTarget)

      },
      handleEdit(index, row) {
        //console.log(index, row);
        console.log(typeof row)
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      show0Flag() {
        this.activeKey = 0;
        this.showFlag0 = true;

        this.showFlag1 = false;
        this.showFlag2 = false;
        this.showFlag3 = false;
        this.showFlag4 = false;
      },
      show1Flag() {
        this.activeKey = 1;
        this.showFlag1 = true;

        this.showFlag0 = false;
        this.showFlag2 = false;
        this.showFlag3 = false;
        this.showFlag4 = false;

      },
      show2Flag() {
        this.activeKey = 2;
        this.showFlag2 = true;

        this.showFlag0 = false;
        this.showFlag1 = false;
        this.showFlag3 = false;
        this.showFlag4 = false;

      },
      show3Flag() {
        this.activeKey = 3;
        this.showFlag3 = true;

        this.showFlag0 = false;
        this.showFlag1 = false;
        this.showFlag2 = false;
        this.showFlag4 = false;
      },
      show_adminSet() {
        this.showFlag4 = true;
        this.showFlag0 = false;
        this.showFlag1 = false;
        this.showFlag2 = false;
        this.showFlag3 = false;
        this.activeKey = 9;
      },
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
      menuLeave() {
        this.menuFlag = false;

      },
      menuOver() {

      },
      mouseOver() {
        this.menuFlag = true
        this.menuFlagNote = false
        //console.log('进来了主菜单')

      },
      mouseLeave() {
        //  console.log('离开了主菜单')
        this.menuFlag = false


      },
      mouseOverNote() {
        this.menuFlagNote = true
        this.menuFlag = false
        // console.log('离开了分菜单')


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

      },
      logout() {
        axios.post('/api/admins/logout').then((result) => {
          let res = result.data
          this.$store.state.nickName = ''
          this.$store.state.nickNameFlag = false
          this.menuFlag = false

        })
      },
      handleSelect(key, keyPath) {
        //console.log(key, keyPath);
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
  .tb-edit .el-input {
    display: none
  }

  .tb-edit .current-row .el-input {
    display: block
  }

  .tb-edit .current-row .el-input+span {
    display: none
  }

  #search1 {
    display: block;
  }


  .admin_set {
    margin-left: 0.5%;
  }

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
    top: 15%;
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
    right: 15%;
    top: 15%;
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
