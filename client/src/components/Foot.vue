<template>
  <div class="nav">
    <i class="el-icon-phone-outline"><router-link to="/contact">联系我们</router-link></i>
    <i class="el-icon-s-check"><router-link to="/contact">版权申明</router-link></i>
    <i class="el-icon-s-order"><router-link to="/contact">网站公告</router-link></i>
    <i class="el-icon-user"><router-link to="/contact">网站管理</router-link></i>
    <div class="shadow"></div>
    <p>Copyright www.beihua.org All Rights Reserved 悲华在线</p>
    <p>技术：三宝弟子 美工：皈依弟子 信箱：57199833@qq.com</p>
    <p>闽ICP备16026213</p>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      activeIndex :'1'
    }
  },
  methods:{
    handleSelect(key,keyPath){
      console.log(key,keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-col {
      border-radius: 4px;
    }
    .bg-purple-dark {
      background: #99a9bf;
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
    p {
      color:grey;
    }

    .nav{
      margin-top:15px;
      max-height: 100px;
    }
</style>
