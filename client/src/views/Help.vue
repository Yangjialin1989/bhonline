<template>
  <div>


    <div class="bg">
      <el-row>
        <el-col :span="24">
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
      <el-row type="flex" class="row-bg " id="row-bg">
        <el-col :span="12" offset="4">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="注册" name="1">
              <div>1.注册时，前方有“*”标记，则为必填项目，否则无法注册</div>
              <div>2.注册前，要认真阅读注册协议，后方可注册。</div>
            </el-collapse-item>
            <el-collapse-item title="登录" name="2">
              <div>1.您可以点击记住密码，将保存7天的cookies；</div>
              <div>2.中文用户名，可能会出现bug，我们尽快完善。</div>
            </el-collapse-item>
            <el-collapse-item title="账户注销" name="3">
              <div>1.开发中；</div>
              <div>2.开发中；</div>
              <div>3.开发中。</div>
            </el-collapse-item>
            <el-collapse-item title="其他" name="4">
              <div>1.帮助中心有意见反馈，您宝贵的意见是我们网站最大的支持；</div>
              <div>2.在线客服，您可以添加其微信，进行详细沟通。</div>
            </el-collapse-item>
          </el-collapse>
        </el-col>
      </el-row>
      <img @click="show" class='contact' style="widht:40px;height:40px;" src="../../static/img/contact.png" alt="">
      <div class='box md-show'>
        <div @click="show2()"   class='box1 left'>
          <img class="left img1" src="../../static/img/server.png" style="width:30px;height:30px;" alt=""><span class="left t1">微信客服</span>
        </div>


        <div @click="show1()"  class="box2 left">
          <img class='left img2' src="../../static/img/feedback.png" style="width:30px;height:30px;" alt="">
          <span class="left t2">意见反馈</span>
        </div>


      </div>
    </div>
    <Modal></Modal>
    <Foot></Foot>


  </div>

</template>

<script>
  import Foot from '@/components/Foot'
  import Modal from '@/components/Modal'
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
          checked: false,
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
          buyerPhone: [{
            validator: checkPhone,
            trigger: 'blur'
          }],
          buyerEmail: [{
            validator: checkEmail,
            trigger: 'blur'
          }],
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
      show1() {
        $('#box').show()
        $('.bg').addClass('black_over')
        $('.row-bg').addClass('black_over')
      },
      show2() {
        $('#box1').show()
        $('.bg').addClass('black_over')
        $('.row-bg').addClass('black_over')
      },
      show() {
        $(".box").toggle()
      },
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
    components: {
      Foot,
      Modal
    },
    mounted: function() {
      //可用于设置自适应屏幕，根据获得的可视宽度（兼容性）判断是否显示
      let w = document.documentElement.offsetWidth || document.body.offsetWidth;
      if (w < 1000) {
        this.show = false;
      }
    }
  }
</script>

<style scoped>
  .black_over {
    background-color: gainsboro;
    opacity: 0.7;

  }

  .md-show {
    display: none;
  }

  .box {
    width: 300px;
    height: 150px;

    box-shadow: 0 0 5px #F8F8F8;
    position: fixed;
    bottom: 170px;
    right: 85px;
  }

  .box1,
  .box2 {
    font-size: 20px;
    font-weight: 400;
    height: 75px;
    width: 300px;

  }

  .img1,
  .img2 {
    margin: 10px 10px 0 10px;
  }

  .t1,
  .t2 {
    line-height: 75px;
    margin-left: 20px;
    font-color: #000000;
    font-weight: 600;
  }

  .box2:hover {
    background: #F8F8F8;

  }

  .box1:hover {
    background: #F8F8F8;
  }

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

  .row-bg {
    height: 1500px;
  }

  .contact {
    position: fixed;
    bottom: 260px;
    right: 1px;
  }
</style>
