<template>
  <div>
    <Head></Head>
	<el-row>
		<el-col :span="24" offset="0">
			<el-tabs class='bg1' type="border-card" tab-position="left" style="height: 100%;" >
			  <el-tab-pane  label="导师介绍">
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
          <div>导师传承</div>
        </el-tab-pane>
			  <el-tab-pane label="导师传承">导师传承</el-tab-pane>
			  <el-tab-pane label="诸佛菩萨">诸佛菩萨</el-tab-pane>
			  <el-tab-pane label="诸宗大德">诸宗大德</el-tab-pane>
			</el-tabs>
		</el-col>
	</el-row>


	<img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png" alt="">


    <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  export default {
    data(){
      return{
        list:'',
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
    methods:{

            handleOpen(key, keyPath) {
              console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
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


			}

    },
    created() {

    },
    components:{
      Head,
      Foot
    }
  }
</script>

<style scoped>
  .bg1{
    background-image:url('../assets/img/bg-02.jpg')
  }
	.go-top {
	  position: fixed;
	  bottom: 40px;
	  right: 30px;

	}
</style>
