<template>
  <div>
    <Head></Head>
    <div class="bg">
      <el-row :gutter="24">
        <el-col :span="navSpans" :offset="navOffsets">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item><img width="35" height="35" src="../assets/img/brand.png" alt=""></el-menu-item>
            <el-menu-item index="1" @click="showDataIndex">数据首页</el-menu-item>
            <el-menu-item index="2" @click="showSearch">列表</el-menu-item>
            <el-menu-item index="3">排行榜</el-menu-item>
            <el-menu-item index="3">地图</el-menu-item>
            <el-menu-item>
              <div>
                <el-input v-if="show2" placeholder="搜你所想" v-model="search" class="input-search">

                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </div>
            </el-menu-item>
            <el-menu-item>
              <el-button :show="show3" type="danger" @click="addGoods()">登记</el-button>
            </el-menu-item>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
      <!-- 数据首页 -->
      <el-row :gutter="24">
        <el-col :span="navSpans" :offset="navOffsets" v-if="show1">
          <van-notice-bar mode="closeable" left-icon="volume-o" :text="textNote">
            <marquee width="220%;" behavior="" direction="">{{ textNote }}</marquee>
          </van-notice-bar>

          <el-image style="width:80%; height: 80%" :src="url"></el-image>

        </el-col>
      </el-row>
    </div>
    <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png"
      alt="">
    <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  export default {
    data() {
      return {
        btnFlag:false,
        navSpans: '20',
        navOffsets: '2',
        activeIndex: '1',
        show1:true,
        show2:false,
        textNote:"欢迎来到荆溪大院山云林禅寺！欢迎回家！请点击上方红色按钮入场登记！",
        url:"/static/img/dataBg.jpg"
      }
    },
    mounted() {
      window.addEventListener('scroll', this.scrollToTop);
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
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
      showSearch(){
        this.show2 = true;
        this.show1 = false;
      },
      showDataIndex(){
        this.show2 = false;
        this.show1 = true;
      }
    },
    components: {
      Head,
      Foot
    }
  }
</script>

<style scoped>
  .go-top {
    position: fixed;
    bottom: 40px;
    right: 30px;

  }

  .bg {
    height: 3000px;
  }
</style>
