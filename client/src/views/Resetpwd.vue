<template>
  <div>
    <Head/>
    <div  class="contents">
      <el-row>

        <el-col :span="20" :offset="2">
          <van-notice-bar
            :text="text"
            left-icon="volume-o"
          />
          <el-steps class="steps" :active="active" finish-status="success">
            <el-step title="填写账号">
            </el-step>
            <el-step title="密保验证"></el-step>
            <el-step title="设置新密码"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>

          <el-col v-if='show1Flag' :span="4" :offset="10">
            <p>请输入您的账号：</p>
            <el-input size="small"
            placeholder="请输入内容"
            v-model="input" @blur="gblur"
            clearable>
            <i
                class="el-icon-edit el-input__icon"
                slot="suffix"></i>
          </el-input>
          </el-col>

          <el-col v-if='show2Flag' :span="4" :offset="10">
            <p>问题1:{{ que1 }}</p>
            <el-input size="small" placeholder="请输入内容" v-model="ans1" @blur="gblur1">
              <i v-if="sFlag1" class="el-icon-success green el-input__icon"  slot="suffix"></i>
              <i v-if="eFlag1" class="el-icon-error red el-input__icon"  slot="suffix"></i>
            </el-input>
            <p>问题2:{{ que2 }}</p>
            <el-input size="small" placeholder="请输入内容" v-model="ans2" @blur="gblur2">
              <i v-if="sFlag2" class="el-icon-success green el-input__icon"  slot="suffix"></i>
              <i v-if="eFlag2" class="el-icon-error red el-input__icon"  slot="suffix"></i>
            </el-input>
            <p>问题3:{{ que3 }}</p>
            <el-input size="small" placeholder="请输入内容" v-model="ans3" @blur="gblur3">
              <i v-if="sFlag3" class="el-icon-success green el-input__icon"  slot="suffix"></i>
              <i v-if="eFlag3" class="el-icon-error red el-input__icon"  slot="suffix"></i>
            </el-input>

          </el-col>

          <el-col v-if='show3Flag' :span="4" :offset="10">
            <p>设置新密码：</p>
            <el-input size="small" placeholder="请输入内容" v-model="new_password" @blur="gblur4">
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
            <i v-if="sFlag4" class="el-icon-success green el-input__icon"  slot="suffix"></i>
            <i v-if="eFlag4" class="el-icon-error red el-input__icon"  slot="suffix"></i>
          </el-input>
          </el-col>

          <el-col v-if='show4Flag' :span="4" :offset="10">
            <p>再次确认密码：</p>
            <el-input size="small"
            placeholder="请输入内容"
            v-model="res_password" @blur="gblur5"
            clearable>
            <i class="el-icon-edit el-input__icon" slot="suffix"></i>
          </el-input>
          </el-col>

          <el-col :span="4" :offset="10">
          <el-button class="btn1" :disabled="disabled" style="margin-top: 30%;" @click="next">{{ btn_msg }}</el-button>
          </el-col>



        </el-col>
      </el-row>
    </div>




    <img v-if="btnFlag" @click="backTop" class="go-top right" style="width:30px;height:30px;" src="/static/img/backtop.png" alt="">
    <Foot/>
  </div>
</template>

<script>
  import Head from '@/components/Head'
  import Foot from '@/components/Foot'
  import axios from 'axios'
  export default {
    data(){
      return {
        input: '',
        btnFlag:false,
        active: 0,
        disabled:true,
        show1Flag:true,
        show2Flag:false,
        show3Flag:false,
        show4Flag:false,
        btn_msg:'确定',
        ans1:'',
        ans2:'',
        ans3:'',
        que1:'',
        que2:'',
        que3:'',
        answers1:'',
        answers2:'',
        answers3:'',
        sFlag1:false,
        eFlag1:false,
        sFlag2:false,
        eFlag2:false,
        sFlag3:false,
        eFlag3:false,
        sFlag4:false,
        eFlag4:false,
        text:'欢迎来到安全中心,照着下面的步骤一次进行,将完成密码重置;如有不明白的地方,可进入帮助中心,添加人工客服微信或留言与我们联系!',
        new_password:'',
        res_password:''


      }
    },methods:{
      gblur5(){
        if(this.res_password == this.new_password){
          this.disabled = false;
          this.$message({
            message:'点击确认无误，即可完成操作。',
            type:'success'
          });
        }
      },
      gblur1(){
        if(this.ans1 == this.answers1){
          this.$message({
            message:'问题1，通过验证，加油。',
            type:'success'
          });
          this.sFlag1 = true;
          this.eFlag1 = false;
          if(this.sFlag1 && this.sFlag2 && this.sFlag3){
            this.$message({
              message:'密保验证通过，您可以点击下一步，设定新密码。',
              type:'success'
            });
            this.disabled = false;
          }

        }else{
          this.$message({
            message:'问题1，通过失败，请重新输入。',
            type:'warning'
          });
          this.eFlag1 = true;
          this.sFlag1 = false;
          this.disabled = true;
        }
      },
      gblur2(){
        if(this.ans2 == this.answers2){
          this.$message({
            message:'问题2，通过验证，加油。',
            type:'success'
          });
          this.sFlag2 = true;
          this.eFlag2 = false;
          if(this.sFlag1 && this.sFlag2 && this.sFlag3){
            this.$message({
              message:'密保验证通过，您可以点击下一步，设定新密码。',
              type:'success'
            });
            this.disabled = false;
          }
        }else{
          this.$message({
            message:'问题2，通过失败，请重新输入。',
            type:'warning'
          });
          this.eFlag2 = true;
          this.sFlag2 = false;
          this.disabled = true;
        }
      },
      gblur3(){
        if(this.ans3 == this.answers3){
          this.$message({
            message:'问题3，通过验证，加油。',
            type:'success'
          });
          this.sFlag3 = true;
          this.eFlag3 = false;
          if(this.sFlag1 && this.sFlag2 && this.sFlag3){
            this.$message({
              message:'密保验证通过，您可以点击下一步，设定新密码。',
              type:'success'
            });
            this.disabled = false;
            }else{
              this.disabled = true;
            }
        }else{
          this.$message({
            message:'问题3，通过失败，请重新输入。',
            type:'warning'
          });
          this.eFlag3 = true;
          this.sFlag3 = false;
          this.disabled = true;
        }
      },
      gblur4(){
        const passReg = /^[A-Za-z0-9]{6,12}$/;
        if (!this.new_password) {
          this.$message({
            message:'新密码不能为空，格式必须是只有字母或者数字组成，且在6-12位。',
            type:'warning'
          });
          this.sFlag4 = false;
          this.eFlag4 = true;
          this.disabled = true;
        }
        if(this.new_password){
          setTimeout(() => {
            if (passReg.test(this.new_password)) {
              this.sFlag4 = true;
              this.eFlag4 = false;
              this.disabled = false;
              this.$message({
                message:'新密码符合要求，可点击下一步，继续完成。',
                type:'success'
              });

            } else {
              this.eFlag4 = true;
              this.sFlag4 = false;
              this.disabled = true;
              this.$message({
                message:'只允许字母或数字构成，且在6-12位之间。',
                type:'warning'
              })
            }
          }, 100)
        }

      },
      gblur(){
        if(this.input == ''){
          this.$message({
            message:'内容不能为空，否则无法验证。',
            type:'warning'
          });
          this.disabled = true;
        }else{
          axios.post('/api/admins/check_userName', {
              userName: this.input
          }).then((result)=>{
              let res = result.data
              if(res.res){
                this.$message({
                  message:'用户验证成功，可以点击确定继续操作。',
                  type:'success'
                });

                if(res.res.pwd_protection.length == 0){
                  setTimeout(()=>{
                    this.$message({
                      message:'但由于您没有设置密码保护，因此无法通过密保修改，请点击帮助中心，联系客服操作。',
                      type:'warning'
                    });
                  },500)


                }
                if(res.res.pwd_protection.length == 1){

                this.disabled = false;
                this.que1 = res.res.pwd_protection[0].pwd_question1;
                this.que2 = res.res.pwd_protection[0].pwd_question2;
                this.que3 = res.res.pwd_protection[0].pwd_question3;
                this.answers1 = res.res.pwd_protection[0].pwd_answer1;
                this.answers2 = res.res.pwd_protection[0].pwd_answer2;
                this.answers3 = res.res.pwd_protection[0].pwd_answer3;

                }

              }else{
                this.$message({
                  message:'用户验证失败，请重新输入用户名',
                  type:'warning'
                });

              }

          })
        }

      },
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
      next() {
               if(this.active == 0){
                 this.show2Flag = true;
                 this.show1Flag = false;
                 this.disabled = true;
                 this.btn_msg = '下一步'
               }
               if(this.active == 1){
                 this.disabled = true;
                 this.show3Flag = true;
                 this.show2Flag = false;
                 this.btn_msg = '下一步'
                 console.log('1111')
               }
               if(this.active == 2){
                 this.show4Flag = true;
                 this.show3Flag = false;
                 this.disabled = true;
                 this.btn_msg = '确认无误';
               }
               if(this.active == 3){
                 this.$message({
                   message:'恭喜您密码修改成功，愿您永具菩提心。',
                   type:'success',
                 });
                 this.disabled = true;
                 this.btn_msg = '密码重置完成'
                 axios.post('/api/admins/save_new_password',{
                   userName : this.input,
                   userPwd : this.new_password
                 }).then((result)=>{
                   let res = result.data
                   if(res.status == 0){
                     this.$message({
                       message:'恭喜您，密码设定成功',
                       type:'success'
                     });
                     //this.$router.push({name:'Login',params:{userName:res.msg }});
                     this.$router.push('/login')

               }})
              }
              if (this.active++ > 3){
                this.active = 0;
              }




      }
    },
    mounted(){
      window.addEventListener('scroll',this.scrollToTop)
    },
    destroyed(){
      window.removeEventListener('scroll',this.scrollToTop)
    },
    components: {
      Head,
      Foot
    }
  }
</script>

<style scoped>
  .green{color:lightgreen;}
  .red{color:red;}
  .steps{
    padding:30px;
  }
  .contents{
    height:1000px;
  }
  .go-top{
    position: fixed;bottom:40px;right:30px;

  }
</style>
