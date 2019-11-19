<template>
  <div>
    <Head></Head>
    <el-row>
      <el-col>
        <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in 9" :key="item">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
      </el-col>
    </el-row>


  <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="../../static/img/backtop.png" alt="">


  <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  export default {
    data() {

      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        list:[],
        tableData: Array(20).fill(item),
        btnFlag:false
      }
    },
    mounted(){
      window.addEventListener('scroll',this.scrollToTop)


    },
    destroyed(){
      window.removeEventListener('scroll',this.scrollToTop)
    },
    methods: {
      backTop(){
        const that = this
        let timer = setInterval(()=>{
          let ispeed = Math.floor(-that.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
          if(that.scrollTop === 0){
            clearInterval(timer)
          }
        },16)
       // document.documentElement.scrollTop = document.body.scrollTop = 0
      },
      scrollToTop(){
        const that = this
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        that.scrollTop = scrollTop
        if(that.scrollTop > 60){
          that.btnFlag = true
        }else{
          that.btnFlag = false
        }


      }
    },
    components: {
      Head,
      Foot
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 5%;
  }

  .el-aside {
    color: #333;
  }
  .go-top{
    position: fixed;bottom:40px;right:30px;

  }
  .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
</style>
