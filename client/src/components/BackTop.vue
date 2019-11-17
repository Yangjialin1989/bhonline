<template>
  <div>
  <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="../../static/img/backtop.png" alt="">
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
    }
  }
</script>

<style scoped>

  .go-top{
    position: fixed;bottom:40px;right:30px;

  }
</style>
