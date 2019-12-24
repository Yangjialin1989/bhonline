<template>
  <div>
    <Head></Head>

	<el-row>
		<el-col :span="4">

		    <el-menu
		      default-active="2"
		      class="el-menu-vertical-demo"
		      @open="handleOpen"
		      @close="handleClose"
		      background-color="#FFFAF0"
		      text-color="#000"
		      active-text-color="#ffd04b">
		     <el-menu-item index="/hierophant/part1">
           <span slot="title">导师介绍</span>
         </el-menu-item>
		     <el-menu-item index="/hierophant/part2">
           <span slot="title">导师传承</span>
         </el-menu-item>
		     <el-menu-item index="/hierophant/part3">诸佛菩萨</el-menu-item>
		     <el-submenu index="/hierophant/part4">
		       <template slot="title">诸宗大德</template>
		       <el-menu-item index="/hierophant/part4/part41">慈宗大德</el-menu-item>
		       <el-menu-item index="/hierophant/part4/part42">禅宗大德</el-menu-item>
		       <el-menu-item index="/hierophant/part4/part43">密宗大德</el-menu-item>
		     </el-submenu>

		    </el-menu>
		  </el-col>


	</el-row>

    <Part1></Part1>
    <Part2></Part2>
    <Part3></Part3>
    <Part4></Part4>
	
	<img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png" alt="">
	
	
    <Foot></Foot>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import Part1 from '@/views/hierophant/Part1'
  import Part2 from '@/views/hierophant/Part2'
  import Part3 from '@/views/hierophant/Part3'
  import Part4 from '@/views/hierophant/Part4'
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
      Part1,
      Part2,
      Part3,
      Part4,
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
</style>
