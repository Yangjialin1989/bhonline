<template>
  <div>
    <Head></Head>
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-carousel :interval="4000" arow="always" :height="height">
          <el-carousel-item v-for="(item,index) in list" :key="index">
            <div class="demo-image" id="imgbg">
              <el-image style="wdith:800px" fit="contain" :src="'/static/img/'+item.image" alt="" :key="'/static/img/' + item.image"></el-image>
            </div>

          </el-carousel-item>
        </el-carousel>




      </el-col>
    </el-row>
    <van-rate v-model="value" allow-half void-icon="star" void-color="#eee" />

    <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="../../static/img/backtop.png"
      alt="">

    <span>{{ num }}</span>
    <span>{{ num2 }}</span>
    <div class='box'></div>
    <button @click='cat()'>获取admins数据</button>
    <img src="+src+" >
    <p>upload</p>

    <img  :src="imgData"/>
    左边第一个
    {{ imgData }}

     <img src='data:image/gif;base64,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' />
    <van-uploader  v-model="fileList" multiple :preview-size="80"  :max-size="1000000000" :max-count="10" :after-read="afterRead" />
    <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import axios from 'axios'
  //1.结构赋值引入vuex
  //1.1 导入
  import {
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    data() {

      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        maxs:1000000,
        imgSrc1:"",
        imgSrc:"data:image/gif;base64,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",
        src:'',
        maxSize: '10000000byte',
        imgData: '',
        fileList: [

        ],
        value: 2.5,
        list: [{
            "image": "image-01.jpg",
            "name": "悲华在线1"
          },



          {
            "image": "image-02.jpg",
            "name": "悲华在线2"
          },
          {
            "image": "image-03.jpg",
            "name": "悲华在线3"
          },
          {
            "image": "image-04.jpg",
            "name": "悲华在线4"
          },
          {
            "image": "image-05.jpg",
            "name": "悲华在线5"
          }

        ],
        height: '',
        tableData: Array(20).fill(item),
        btnFlag: false
      }
    },
    beforeMount: function() {
      if ($(window).width() < 700) {
        this.height = $(window).width() * 2 / 3 + 'px';
      } else {
        this.height = $(window).width() * 7 / 15 + 'px';
      }

    },
    //1.2computed引入
    computed: mapState({
      // //1.2.1箭头函数
      // num:state => state.num,
      // //1.2.2
      // num(state){
      //   return num += 50
      // }
      ...mapState(['num']),
      ...mapGetters({
        num2: 'filterNum'
      })
    }),

    mounted() {
      window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollToTop)
    },
    methods: {
      // 返回布尔值
      beforeRead(file) {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          return false;
        }

        return true;
      },

      // 返回 Promise
      asyncBeforeRead(file) {
        return new Promise((resolve, reject) => {
          if (file.type !== 'image/jpeg') {
            Toast('请上传 jpg 格式图片');
            reject();
          } else {
            resolve();
          }
        });
      },
      afterRead(file) {
        // 此时可以自行将文件上传至服务器

        let myDate = new Date().getTime() + 28800000
        let myDate1 = new Date(myDate)
        let data = {
          "content":file.content,
          "lastModifiedDate": myDate1,
          "name": file.file.name,
          "size": file.file.size,
          "type": file.file.type
        }
	      //axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;'
        axios.post("/api/pictures/picture", data, {headers: {'Content-Type': 'application/json; charset=utf-8'}}).then((result) => {
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data;'
          let res = result.data
          this.imgData = res.result.content
          this.src = res.result.content00000
          console.log(res.result.content)
          if (res.status == 0) {
            console.log('图片上传成功！')

          } else {
            console.log('图片上传失败！')
          }
        })

      },	/*
      console.log(file.content)
      axios({
        headers:{
          'Content-Type':'multipart/form-data'
        },
        method:'post',
        url:'/api/pictures/picture',
        data:data
      }).then((result) => {

          let res = result.data
          this.imgData = res.result.content
          this.src = res.result.content00000
          console.log(res.result.content)
          if (res.status == 0) {
            console.log('图片上传成功！')


          } else {
            console.log('图片上传失败！')
          }
        })

      },

*/

      cat() {
        axios.post('/api/goods/userMsg').then((result) => {
          let res = result.data
          if (res.status == 0) {
            alert('获取成功！')
          } else {
            alert('获取失败！')
          }
        })
      }

      ,
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
  .box{background-image:url(data:image/png;base64,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);}
  .el-aside {
    color: #333;
  }

  .go-top {
    position: fixed;
    bottom: 40px;
    right: 30px;

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

  #imgbg {
    background-color: #fff;
  }
</style>
