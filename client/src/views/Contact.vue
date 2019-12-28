<template>
  <div>
    <Head></Head>
    <div class="contents">
      <h1>联系</h1>
    <el-button :plain="true" @click="openVn1">官方微信</el-button>
    <el-button :plain="true" @click="openVn2">官方QQ</el-button>
    <el-button :plain="true" @click="openVn3">官方微博</el-button>
    <el-button :plain="true" @click="openVn4">官方直播</el-button>
    <el-button :plain="true" @click="openVn5">官方美篇</el-button>

    </div>
    
    <increment></increment>
    <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png" alt="">

    <Foot></Foot>

  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import BackTop from '@/components/BackTop'
  import increment from '@/components/increment'
  export default {
    data(){
      return{
        btnFlag:false
      }
    },
    mounted(){
      window.addEventListener('scroll',this.scrollToTop)
    },
    destroyed(){
      window.removeEventListener('scroll',this.scrollToTop)
    },
    methods:{
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


      },
      openVn1() {
              const h = this.$createElement;
                      this.$message({
                        message: h('p', null, [
                          h('p', null, ' 微信:'),
                          h('i', { style: 'color: teal' }, 'wx57199833'),
                          h('p', null, ' 公众号:'),
                          h('i', { style: 'color: teal' }, '悲华网')
                        ])
                      })
      },
      openVn2() {
              const h = this.$createElement;
                      this.$message({
                        message: h('p', null, [
                          h('p', null, ' QQ:'),
                          h('i', { style: 'color: teal' }, '57199833')
                        ])
                      })
      },
      openVn3() {
              const h = this.$createElement;
                      this.$message({
                        message: h('p', null, [
                          h('p', null, ' 微博链接地址:'),
                          h('a', { style: 'color: teal' }, 'blog.sina.com.cn/shilengyan')
                        ])
                      })
      },
      openVn4() {
              const h = this.$createElement;
                      this.$message({
                        message: h('p', null, [
                          h('p', null, ' 映客直播间ID:'),
                          h('i', { style: 'color: teal' }, '177639669')
                        ])
                      })
      },
      openVn5() {
              const h = this.$createElement;
                      this.$message({
                        message: h('p', null, [
                          h('p', null, ' 美篇链接地址:'),
                          h('a', { style: 'color: teal' }, 'https://www.meipian.cn/c/44646633')
                        ])
                      })
      }
    },
    components:{
      Head,
      Foot,
      BackTop,
      increment
    }
  }
</script>

<style scoped>
  .contents{
    height:1000px;padding:30px;
  }
  .go-top{
    position: fixed;bottom:40px;right:30px;

  }
</style>
