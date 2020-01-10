<template>

      <div class="contain">
        <div class="posting-uploader">
          <h3>上传头像</h3>
          <van-uploader  v-model="fileList" multiple :preview-size="80"  :max-size="1000000000" :max-count="1" :after-read="afterRead" />
        </div>
        <p  class="red">{{ upLoadMsg }}</p>
        <p>{{ upLoadMsg1 }}</p>
      </div>

</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        upLoadMsg:'',
        upLoadMsg1:'',
        fileList: [

        ],

        imgData:this.$store.state.headerImgData
      }
    },
    mounted() {

    },
    watch: {

    },
    methods: {
      getIndex(index){
        console.log(index)
      },
      gclick(index){
        console.log(this.index)
      },
      afterRead(file) {
              // 此时可以自行将文件上传至服务器
              let userName = this.$store.state.nickName
              console.log(userName)
              let myDate = new Date().getTime() + 28800000
              let myDate1 = new Date(myDate)
              let data = {
                "content":file.content,
                "lastModifiedDate": myDate1,
                "name": file.file.name,
                "size": file.file.size,
                "type": file.file.type,
                "userName":userName
              }
              axios.post("/api/admins/headerImg", data, {headers: {'Content-Type': 'application/json; charset=utf-8'}}).then((result) => {
               let res = result.data
                if (res.status == 0) {
                  console.log(res.res)
                  let imgData = res.res.content;
                 this.$store.state.headerimgData = imgData;
                 this.upLoadMsg = res.msg
                 this.upLoadMsg1 = '重新登录，即可更新！'
                }
                if(res.status == 1){
                  this.upLoadMsg = res.msg
                }
                if(res.status == 2){
                  this.upLoadMsg = res.msg
                }




              })



      }
    }
  }
</script>

<style scoped>
  .imgList{
    margin-left:20%;
  }
  .imgItem{
    margin-left:10px;
  }
  .left{
    float:left;
  }

  .red{
    color:springgreen;
  }
  .contain{
    width:500px;height:300px;
    margin-top:150px;margin-left:30%;
    background-color:#ffffff;
  }
</style>
