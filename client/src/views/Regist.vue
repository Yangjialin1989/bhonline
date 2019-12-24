<template>
  <div>
    <el-row>
      <el-col :span="24" >
        <el-breadcrumb separator-class="el-icon-arrow-right  nav2">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/regist'}">注册</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/help'}">帮助中心</el-breadcrumb-item>
        </el-breadcrumb>
        <ul>
          <li>
            <router-link to="/">
              <img class="left nav1" alt="" style="width: 10%; height: 10%" src='../../static/img/brand.png'>
            </router-link>

          </li>
          <li>


            <p class="left nav2">注册悲华在线账号</p>
          </li>
          <li>
            <router-link to="/login">
              <el-button class="right nav3" type="info" plain>登录</el-button>
            </router-link>
          </li>
          <li>
            <span class="right nav4">我已注册，现在就</span>
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
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ruleForm.name" @blur="checkName"></el-input>
            <span class="errmessage">{{ nameMsg}}</span>
          </el-form-item>

          <el-form-item label="联系电话:" prop="buyerPhone" required>
                  <el-input v-model="ruleForm.buyerPhone"></el-input>
          </el-form-item>
          <el-form-item label="Email:" prop="buyerEmail" required>
                  <el-input v-model="ruleForm.buyerEmail"></el-input>
          </el-form-item>


          <el-form-item label="密码" prop="pass" required>
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass" required>
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop='checked' required >
            <el-checkbox v-model='ruleForm.checked'  :disabled="isDisabled">
              <span>
                阅读并接受

              </span>
            </el-checkbox>
            <!-- <el-button type="text" @click="dialogFormVisible = true">《注册协议》</el-button> -->
            <el-button type="text" @click="TimerFlag">《注册协议》</el-button>

            <el-dialog title="《注册协议》" :visible.sync="dialogFormVisible">
              <el-form :model="form">
                    <div class='contents'>
                       <h2>悲华在线学习园地论坛管理暂行规定</h2>

                          <h3>第一条　总纲</h3>

                          本论坛是根据中国福州大院山云林院管理委员会授权给大院山住持僧上楞下严释楞严禅师而建立的个人佛学网站里的修学园地，其目的是为各位佛友、诸善友，特别是欲与大慈大爱的弥勒菩萨及其清净教法结下殊胜法缘者，提供一处学习、结识、交流和讨论的空间，以便大家认真学习研讨本传承诸祖师的教言教法，参考借鉴并运用于自己的修学，从而趋向解脱之途。论坛的一切管理细则和执行办法皆建立在此一宗旨上。

                          <h3>第二条　发言规范</h3>

                          本论坛总的原则是宣扬自宗，爱国爱教，普度众生。因此所有在此论坛之发言，必须遵守国家的法律法规以及国家主管部门对宗教组织、活动等的有关规定。本论坛不涉及政治话题，但鼓励宣扬社会主义美好风尚、文化传统和好人好事，坚决打击附佛外道和海内外邪教思想的渗透。在此原则的指导下，所有参加讨论的道友务必遵守以下言论规范：

                          一、涉及导师、上师（此处所称上师乃专门指本站导师及自宗其他传承上师）和高僧大德的教言的发言务必严格核对、校对，然后发帖，尽量注明时间、作者；发现缺、误应及时更改或知会版主。所帖上师教言应仅限于上师所讲的共同部分教法，已经经过上师亲自勘定过的版本为主，不允许在上师未开许的情况下擅自帖出未经上师整理勘定的教言（开许的录音整理应做明确标注），特别是不共密法部分和上师方便遮止的内容更是严格禁止。

                          二、本论坛也欢迎各种内道佛法之其他宗派见解的发言，但皆应如理如法的进行提问和讨论，须知佛教各宗乘各教派互不相违，俱是清净妙法。根据无上密乘根本戒，密宗弟子尚不得诽谤外道，何况内道善法？因此必须以专修自宗、净观他宗、相互赞叹、求同存异、共同促进的平等尊重精神为原则。

                          三、不得发表与三乘根本戒（小乘别解脱戒、大乘菩萨戒和密乘三昧耶戒）相违的言论，不得发表互相攻击、搬弄是非、显现或增上五毒烦恼的发言。请务必以佛法和事实为发言的论证、论据，三思而后言。

                          四、本论坛原则上不允许把那些未经公认的高僧大德定性为“外道”、“邪师”、“邪法”加以公开评论或抨击；也不赞赏凭自己主观认定某某法师、大德为第一、唯一之类的极端言说。但对在本论坛加以宣扬这些来源不清楚的教法者，本论坛管理人员也将加以限制和处理。

                          五、本论坛原则上不鼓励学人在未对自宗教法作一定深入闻思和实修体验的前提下，与他宗弟子或对自他宗的教法多加辩论，因暂时对自他修证无益甚至增上烦恼故。对于不依教证理证的争论将从严处理。

                          六、各人依止上师前应有如法观察之必要及时间。已依止上师弟子者固然对上师具备信心，然其他并非依止上师的网上同修却未必作过适当观察及有如此信心。因此不应强求他人对上师的教言信受奉行。如遇合理善意的提问，版务人员应予以尊重。对于恶意提问者版务人员将本着劝阻――遮止――禁止其发言的过程进行处理。

                          七、本论坛属于纯粹的公益性佛学论坛，并为维持本传承不涉及世间经济利益的传统，原则上不允许出现外来的化缘、募捐、供养的主题或链接，不允许法物流通和各种营销链接。如个别道友确有信心欲作某供养某功德，请私下通过论坛短消息、信箱、QQ等方式自行联系当事人或有关版主进行询问。

                          八、本论坛非常欢迎暂时乃非佛教徒和其他信仰信徒的光顾，但不得发表任何诽谤佛教、攻击其他宗教、不利民族宗教信众团结、破坏国家宗教相关法律法规的言论。

                          九、本论坛并非随意发表任何言论之所在，请谨言慎行。本论坛保留对所有贴子的删、编、改的权利。对于违反本坛管理规则屡劝不改者，本坛有权取消其发言权，并可以技术方式暂时或长期禁止犯规者继续发言。

                          十、本论坛注册名字不允许有不尊重三宝，攻击本站，淫秽低俗的文字，一经发现本论坛将坚决地予以取缔。



                          <h3>第三条 转贴管理</h3>

                          欢迎大家踊跃转载本站和论坛内可以转载的内容！但是为了使转载行为更如法，对提供原文内容的作者及整理者劳动成果表示应有的尊重，以及在他人对转贴的内容有疑问时，有来源可查证，防止恶意篡改，特制定以下规定：

                          一、在本站发布的所有楞严上师及传承上师的译作及教言，在转载至其他网站时务必注明主题出处及原文网址链接，不得修改或删除原文出处，不得将未经勘定和尚在整理阶段的文字和音像随意转载。

                          二、本站发布的独家专题、音像及独家照片，请在转载至其他网站时应标明“转载来源：***网址：http://www.******.com/bbs/”字样。

                          三、凡原帖作者注明在本论坛首发的帖子，在转载至其他论坛时请务必注明原作者及首发网站名称或链接。

                          四、原帖作者注明不得转载的帖子，或者涉及内部探讨和不共教法的帖子，未经原帖作者或版务人员同意的情况下不得转贴至其他论坛。如有违反者，一经查证将按照事态的严重程度，加以严肃处理。

                          五、由其他论坛转贴至本论坛的帖子也同样参照以上规定。


                          <h3>第四条　删改</h3>

                          若有下列情况，本论坛版主有权于任何时候对帖子作出修改或删除，并可根据情况决定是否有必要对删改决定作出解释。

                          一、与佛法无关或具欺诈性无意义的言论。例如：非就佛法探讨的灌水、冒用他人ID、在没有上师或上师未开许妄谈个人境界之时，未证言证、玩弄口头禅、一人多个角色戏耍他人、转贴攻击他人他派教法、对高僧大德妄加评论等。

                          二、涉嫌提倡、鼓吹、随喜违背三乘根本戒的发言。 例如：说部分众生该死不必救度、谤祖谤师谤三乘各宗教法、盗印或公开应保密的密法、违反舍弃上师教言、恶口吵架、歧视女性等。[仅举数例，详见各乘相应戒律] 因本论坛不能负责诠释戒律无误，故如有此类言论被删改，只表明有相关的犯戒嫌疑，并不代表认定被删贴者犯戒。

                          三、涉及个人隐私的资料。

                          四、可能直接或间接引致他人受到不必要伤害的内容。

                          五、为了维护本论坛的清净修学的风气，本论坛杜绝一切涉及政治问题以及对个人点评或争议的讨论发贴，特别是对佛教界的法师、出家僧人以及信仰正信佛教的居士或金刚瑜伽道友进行点评与争议甚至诋毁将一律删帖。



                          <h3>第五条 执行</h3>

                          本章程由各论坛版主负责解释执行。版主可按总纲和实际情况弹性处理。各总版主可根据情况对各板块版主作出的处理决定加以询问和指导。

                          本论坛联系方式：可将内容直接以短信的形式发给本站管理员。

                                                                                                                             论坛管理组

                                                                                                                            2007年4月4日

                                                                                  如果您对以上条款没有异议，则点同意，通过注册。欢迎您的到来！
                    </div>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="ruleConfirm" :disabled="isDisabled1">{{buttonName}}</el-button>
                 <!-- <el-button type="primary" @click=" dialogFormVisible =false;checked=true">确 定</el-button> -->
              </div>
            </el-dialog>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>




    <el-button plain class="btn1"><router-link to='/help'><span id="aa">帮助中心</span></router-link></el-button>
    <Foot></Foot>


  </div>

</template>

<script>
  import Foot from '@/components/Foot'
  import axios from 'axios'
  export default {
    name: 'Regist',
    data() {
      var checkPhone = (rule, value, callback) => {
          const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
          if (!value) {
            return callback(new Error('电话号码不能为空'))
          }
          setTimeout(() => {
            // Number.isInteger是es6验证数字是否为整数的方法,但是我实际用的时候输入的数字总是识别成字符串
            // 所以我就在前面加了一个+实现隐式转换

            if (!Number.isInteger(+value)) {
              callback(new Error('请输入数字值'))
            } else {
              if (phoneReg.test(value)) {
                callback()
              } else {
                callback(new Error('电话号码格式不正确'))
              }
            }
          }, 100)
        }
        var checkEmail = (rule, value, callback) => {
          const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
          if (!value) {
            return callback(new Error('邮箱不能为空'))
          }
          setTimeout(() => {
            if (mailReg.test(value)) {
              callback()
            } else {
              callback(new Error('请输入正确的邮箱格式'))
            }
          }, 100)
        }
      var validatePass = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else {
                if (this.ruleForm.checkPass !== '') {
                  this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
              }
            };
            var validatePass2 = (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
              } else {
                callback();
              }
            };
      return {
        nameMsg:'',
        buttonName: "请阅读",
        time: 10,
        isDisabled: true,
        isDisabled1: false,
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
          checked:[{
            required:true,
            trigger:'blur'
          }],
          name: [{
              required: true,
              message: '请设置用户名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 8,
              message: '长度在2 到 8 个字符',
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
      //注册用户，检查用户名时候存在于数据库
      checkName(){
        axios.post('/api/admins/checkName', {
          userName: this.ruleForm.name
        }).then((result) => {
          let res = result.data
          console.log(res.msg)
          this.nameMsg = res.msg


        })
      },
      TimerFlag(){
        this.dialogFormVisible = true
        let me = this;
        me.isDisabled1 = true;
        let interval = window.setInterval(function() {
        	me.buttonName = '（' + me.time + '秒）后解禁';
        	--me.time;
        	if(me.time < 0) {
        		me.buttonName = "已阅读";
        		me.time = 10;
        		me.isDisabled1 = false;
        		window.clearInterval(interval);
        	}
        }, 1000);
      },
      ruleConfirm(){

        this.dialogFormVisible =false;
        this.isDisabled = false;
        this.ruleForm.checked=true
      }
      ,
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
            var flag = this.ruleForm.checked
            if(flag){

            let data = {
              'userId':10000,
              'userName':this.ruleForm.name,
              'buyerPhone':this.ruleForm.buyerPhone,
              'buyerEmail':this.ruleForm.buyerEmail,
              'userPwd':this.ruleForm.pass
            }
            axios.post('/api/admins/userRegist',data).then((result)=>{
              let res = result.data
              if(res.status ==0 ){
                console.log('注册成功！')
                this.open()
              }else{
                console.log('注册失败！')
              }
            })
            }else{
              this.rec()
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      rec(){
        var mymessage=confirm("请先仔细阅读《注册协议》。");
          	if(mymessage==true)
          	{
          		this.TimerFlag()
          	}
          	else if(mymessage==false)
          	{
          		 this.$router.push('/regist')

        }
      },
      open() {
              this.$alert('恭喜您注册成功！', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'info',
                    //message: `action: ${ action }`
                    message:''
                  });
                }
              });
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
  .errmessage{
    color:red;
    backgrond:yellow;
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
  .btn1{
   font-size:20px;
    margin:0 atuo;
    line-height: 24px;
    width:20xp;
    position: fixed;bottom: 50%;right: 1px;
  }
  #aa{
    writing-mode: vertical-lr;
  }
</style>
