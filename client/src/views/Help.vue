<template>
  <div>
    <el-row>
      <el-col :span="24" >
        <el-breadcrumb separator-class="el-icon-arrow-right  nav2">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/help'}">帮助中心</el-breadcrumb-item>
        </el-breadcrumb>
        <ul>
          <li>
            <router-link to="/">
              <img class="left nav1" alt="" style="width: 10%; height: 10%" src='../../static/img/brand.png'>
            </router-link>

          </li>
          <li>
            <p class="left nav2">帮助中心</p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class='shadow'></div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="12" offset="4">
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item title="注册" name="1">
            <div>1.注册时，前方有“*”标记，则为必填项目，否则无法注册</div>
            <div>2.注册前，要认真阅读注册协议，后方可注册。</div>
          </el-collapse-item>
          <el-collapse-item title="登录" name="2">
            <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="账户注销" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
            <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
          </el-collapse-item>
          <el-collapse-item title="其他" name="4">
            <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
            <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    
    <Foot></Foot>


  </div>

</template>

<script>
  import Foot from '@/components/Foot'
  export default {
    name: 'Regist',
    data() {
      return {
         dialogFormVisible: false,
         form: {
                   name: ''
                 },
         formLabelWidth: '30%',
        dialogVisible: false,
        ruleForm: {
          checked:false,
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          pass: '',
          checkPass: '',
          buyerPhone: '',
          buyerEmail: ''
        },
        rules: {
          buyerPhone: [
                { validator: checkPhone, trigger: 'blur' }
              ],
              buyerEmail: [
                { validator: checkEmail, trigger: 'blur'  }
              ],
          pass: [{
            validator: validatePass,
            trigger: 'blur'
          }],
          checkPass: [{
            validator: validatePass2,
            trigger: 'blur'
          }],
          name: [{
              required: true,
              message: '请设置用户名',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 8,
              message: '长度在 3 到 8 个字符',
              trigger: 'blur'
            }
          ],
          region: [{
            required: true,
            message: '请选择活动区域',
            trigger: 'change'
          }],
          date1: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          date2: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          type: [{
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }],
          resource: [{
            required: true,
            message: '请选择活动资源',
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: '请填写活动形式',
            trigger: 'blur'
          }]
        }


      }
    },
    methods: {
       handleClose(done) {
              this.$confirm('确认关闭？')
                .then(_ => {
                  done();
                })
                .catch(_ => {});
            },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    components:{
      Foot
    },
    mounted:
      function(){
      		//可用于设置自适应屏幕，根据获得的可视宽度（兼容性）判断是否显示
      		let w = document.documentElement.offsetWidth || document.body.offsetWidth;
      		if(w < 1000){
      			this.show = false;
      		}
      }
  }
</script>

<style scoped>
  .nav1 {
    margin-left: 5%;

  }

  .nav2 {
    margin-left: 3%;
    width: 25%;
  }

  .nav3 {
    margin-top: 3em;
    margin-right: 1%;

  }

  .nav4 {
    margin-top: 3.2em;
    display: block;
    float: right;
  }

  .nav5 {
    height: 40px;
    border: 1px solid red;
  }

  p {
    font-size: 0.5rem
  }
  .row-bg{
    height:1500px;
  }
</style>
