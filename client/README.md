# demo

[TOC]



> 悲华在线官网项目

## Build Setup

## 一	前端设计 client

### 1.导航栏

| 序号 | router      | 栏目 | 英文       |      |
| :--- | ----------- | ---- | ---------- | ---- |
| 1    | /           | 首页 | index      |      |
| 2    | /hierophant | 导师 | hierophant |      |
| 3    | /buddhist   | 道场 | buddhist   |      |
| 4    | /sermon     | 教言 | sermon     |      |
| 5    | /track      | 缁行 | track      |      |
| 6    | /grace      | 慈宗 | grace      |      |
| 7    | /media      | 影音 | media      |      |
| 8    | /live       | 直播 | live       |      |
| 9    | /forum      | 论坛 | forum      |      |
| 10   | /contact    | 联系 | contact    |      |

### 2.模板  src/components

| 序号 | Vue          |            |      |      |
| ---- | ------------ | ---------- | ---- | ---- |
| 1    | Head.vue     | 头部       |      |      |
| 2    | Foot.vue     | 底部       |      |      |
| 3    | NavBread.vue | 面包屑导航 |      |      |
| 4    | Modal.vue    | 模态框     |      |      |
| 5    |              |            |      |      |
| 6    |              |            |      |      |
| 7    |              |            |      |      |
| 8    |              |            |      |      |
| 9    |              |            |      |      |

### 3.视图 src/views 

| 序号 | component      |      |             |      |
| ---- | -------------- | ---- | ----------- | ---- |
| 1    | Index.vue      | 首页 | /           |      |
| 2    | Hierophant.vue | 导师 | /hierophant |      |
| 3    | Buddhist.vue   | 道场 | /buddhist   |      |
| 4    | Sermon.vue     | 教言 | /sermon     |      |
| 5    | Track.vue      | 缁行 | /track      |      |
| 6    | Grace.vue      | 慈宗 | /grace      |      |
| 7    | Media.vue      | 影音 | /media      |      |
| 8    | Live.vue       | 直播 | /live       |      |
| 9    | Forum.vue      | 论坛 | /forum      |      |
| 10   | Contact.vue    | 联系 | /Contact    |      |





## 二	后端设计 server

### 1.数据库 MongoDB



### 2.数据接口 /api



``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# demo

> Vue.js

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
项目结构

    前端：     vue axios
         模块：
              商品列表
              登录
                  第一个阶段使用cookie
                  第二个阶段增加jwt权限验证
              购物车
              结账
                  结账页面
              地址
                  选择地址
              提交订单
                  生成订单号
                  订单信息


    后端：     express
                 middleware passport
    数据库：   mongodb   redis：做缓存session用户信息
    服务器：   linux +
              pm2启动node(node是单线程，pm2可以管理线程，自动重启) +
              web githook (git钩子，当我们把代码提交到github，需要去服务器把代码拉取下来，可以自动监听这个push事件。)
    上线       使用nginx 反向代理
    docker    集装箱容器 把你的环境都集成在一起



1.初始化项目 ；
   Vue
   vue init webpack client
   1.cd client （客户端）
   2.npm run dev
2.静态文件拉取下来
   1.在src下创建views视图文件，下面创建商品列表模板 GoodsList
   2.组件可以修改名称：  “改后的名字在前”：改完的名字
   3.开放数据node
   ```
   var express = require('express')
   var app = express()
   //设置跨域
   app.all('*',function(req,res,next){
     res.header('Access-Control-Allow-Origin','*')
     res.header('Access-Control-Allow-Headers','X-Requested-With')
     res.header('Access-Control-Allow-Methods','PUT,POST,GET,DELETE,OPTIONS')
     res.header('X-Powered-By','3.2.1')
     res.header('Content-type','application/json;charset=utf-8')
     next()
   })
   var questions={
     "status":"0",
     "result":[
       {
         "productId":"10001",
         "productName":"小米6",
         "productPrice":"2499",
         "productImg":"mi6.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       },
       {
         "productId":"10002",
         "productName":"小米笔记本",
         "productPrice":"3999",
         "productImg":"note.jpg"
       }
     ]}
   app.get('/goods',function(req,res){
     res.status(200),
     res.json(questions)
   })
   var server = app.listen(3000,function(){
     console.log('server is success')
   })
```
   5.懒加载图片：使用 vue插件 vue-lazyload
    5.1 下载插件         npm i vue-lazyload -D
    5.2 main.js 引入插件 import VueLazyLoad from 'vue-lazyload'
    5.3 挂载到Vue        Vue.use(VueLazyLoad,{ loading:'/static/img/ok-2.png'})
    5.4 模板修改         <img :src="'/static/img/'+item.productImage" alt="">
                        <img v-lazy="'/static/img/'+item.productImage" alt="">

   6.利用vue做本地数据接口
    6.1 client目录下创建mock临时数据文件夹
    6.2 配置build文件夹下的 webpack.dev.conf.js

        //第一步
        const express = require('express')
        const app = express()//请求server
        var appData = require('../mock/data.json')//加载本地数据文件
        var seller = appData.seller//获取对应的本地数据
        var goods = appData.goods
        var ratings = appData.ratings
        var apiRoutes = express.Router()
        app.use('/api', apiRoutes)//通过路由请求数据

        devServer: {
        app.get('/api/ratings', (req, res) => {
          res.json({
            errno: 0,
            data: ratings
          })
        })

   7.使用express-generator生成项目
    7.1 npm i express-generator -g
    7.2 express server 本地生成server文件夹 在demo下
    7.3 cd server/
    7.4 npm i
    7.5 npm start

   8.express链接数据库并查询商品
    8.1 在server目录下，routes 目录下，创建goods.js
        ``` var express = require('express')
        var router = express.Router()
        var mongoose = require('mongoose')
        var Goods = require('../models/goods')
        mongoose.connect('mongodb://localhost:27017/goods')
        mongoose.connection.on('connected',function(){
        	console.log('mongodb connected !')
        })
        mongoose.connection.on('error',function(){
        	console.log('mongodb error !')
        })
        mongoose.connection.on('disconnected',function(){
        	console.log('mongodb disconnected !')
        })

        router.get('/list',function(req,res,next){
        	Goods.find({},function(err,doc){
        		res.json({status:0,result:doc})
        	})
        })

        module.exports = router ```
     8.2在server 下创建models 数据模型 goods.js
       var mongoose =require('mongoose')
       var Schema = mongoose.Schema
       var productSchema = new Schema({
       	"productId"    : Number,
       	"productName"  : String,
       	"salePrice"    : Number,
       	"productImage" : String
       })
       module.exports = mongoose.model('Goods',productSchema)
     8.3 导出数据模型Goods，再在路由模型中加载该模块
       var Goods = require('../models/goods')
     8.4 配置路由
       server下面的app.js
       app.use('/goods',goodsRouter)
     8.5 启动服务器 npm start  localhost:3000/goods/list

    9 前端与后端交互 json xml

     9.1 解决跨域 Access to XMLHttpRequest at 'localhost:3000/goods/list' from origin 'http://localhost:8081' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https.
         client -- config -- index.js
         '/goods/**':{
             target:'http://localhost:3000'

         client -- src -- views --GoodList.vue
         methods: {
           getGoodsList() {//http://localhost:8081/api/good
             axios.get('/goods/list')
               .then(res => {

                 res = res.data.result
                 console.log(res)
                 this.list = res


               })
           }
         }

      10. 实现商品价格排序
       10.1  前端  点击触发一个事件，访问一个接口；  后端  通过前端传过来的参数，写业务逻辑，返回前端需要的数据，渲染页面
       10.2  业务逻辑：sort({})
       10.3  GoodsList.vue
             传递参数 get('/goods/list',{params:{sort:1}})
             axios.get('/goods/list',{params:{ sort:1}})
             .then(res => {
      11. 按照商品价格区间筛选商品
       11.1 接口： 参数  范围   前端  （点击价格，数据重新排序）
            all 所有            $gt 大于                   db.col.find({'likes': {$gt:100}})
            0： 0-100           $lt 小于
            1： 100-500
            2： 500-1000
       11.2 表驱动法

  ```
   let priceItem = [[0,100],[100,500],[500,1000],[1000,5000]]
          param = {
          	salePrice: {
          		$gt : priceItem[priceLevel][0],
          		$lte: priceItem[priceLevel][1]
          	}
          }
   ```
       11.3 价格区间，前端分类
        路由传参 ： axios.get('/goods/list',{params:{sort:sort,priceLevel:this.priceChecked}})
        定义点击事件，通过事件传递priceLevel @click="setPriceFilter(index)"
        setPriceFilter(index){
          this.priceChecked = index
          this.getGoodsList()
        }
        点击的选项，选中 ： :class="{'cur':priceChecked == index}"
        默认all            :class="{'cur':priceChecked == 'all'}"
       11.4 分页，溢出部分分页显示
        前端：检测用户滚动到商品边缘，请求下一页的api
        后端：api接口，需要两个参数 page(第几页) prepage(一页显示几条)：
       11.5  实现infiniteScroll 瀑布流 vue-infinite-scroll
             11.5.1
             client -- src -- main.js 加载该模块 ， vue实例引用
             import infiniteScroll from 'vue-infinite-scroll'
             Vue.use(infiniteScroll)
             11.5.2
             src -- views -- GoodsList.vue
      12.  加入购物车api
       12.1  接收商品 goods_id, user_id
       12.2  查询用户
       12.3  通过商品id去数据库查询，把商品的信息查询出来，此时查询商品时候已经存在于用户购物车里面，如果存在则商品数量加一，然后存储到用户里面
             将MongoDB数据库中的集合id变成字符串类型，否则报错：no catch the _id 。。。。。。。
       12.4  在GoodsList.Vue 中，添加点击事件
              <a href="javascript:;" class='btn btn--m' @click='addCart(item.productId)'>加入购物车</a>
             addCart:function(productId){
               axios.post('/goods/addCart',{
                 productId:productId
               }).then((result)=>{
                 let res = result.data
                 if(res.status == 1){
                   alert('加入购物车失败！')
                 }else{
                   alert('加入购物车成功！')
                 }
               })
             }
          Users.findOne({userId:userId},function(err,userDoc){
          	//逻辑处理
          	//1.定义goodItem为空
          	let goodItem = ''

          	//2.遍历forEach userDoc中是否有与传递的商品id重复
          	userDoc.cartList.forEach(function(item){
          		//2.1有重复表示已经存在
          		if(item.productId == productId){
          			//2.2此时表示在购物车列表里存在这个商品
          			goodItem = item
          			//2.3此时商品数量加一
          			item.productNum++
          		}
          	})

          	//2.4根据goodItem时候为空判断，
          	//2.4.1如果不是第一次加入购物车
          	if(goodItem){
          		userDoc.save(function(err3,doc3){
          			if(err3){
          				res.json({status:'1',msg:err3.message})
          			}else{
          				res.json({status:'0',msg:'',result:'商品数量添加成功！'})
          			}
          		})
          	}else{//2.4.2商品第一次加入购物车
          		Goods.findOne({'productId':productId},function(err1,goodDoc){
          		//添加商品数量字段到goodDoc
          		goodDoc.productNum=1
          		userDoc.cartList.push(goodDoc)

          		userDoc.save(function(err2,doc2){
          			console.log(doc2.productId)
          			if(err2){
          				res.json({status:1,msg:err2.message})
          			}else{
          				res.json({status:0,msg:'',result:"加入购物车成功！"})
          			}
          		})
          	})
         15.用户登录功能
            15.1 前端：点击登录，把用户参数传递给后端
            15.2 后端：匹配，返回前端 登录成功，登录失败（失败信息）
               后端接受两个参数：1.用户名；2.密码

               业务逻辑：
                 先把用户名去数据库查询，如果有
                         去验证密码
                             正确  验证验证码
                             错误  返回提示
                                       如果没有   返回用户不存在
               如果都验证成功，需要记录一下用户的登录状态
                          session  存在服务端，比较安全，占用服务器空间
                          redis    数据库 告诉缓存、基于内存 可持久key -value  数据库
                          memcache 数据缓存，
                          cookie   存在本地，不安全
                          （MD5加密）

            15.3 ui  modal.html 放到Head.vue中
            15.4  路由出现错误：POST http://localhost:8081/users/login 404 (Not Found)
                  需要配置proxy代理：
                  '/users/**':{
                    target:'http://localhost:3000'
                  }
            15.5  登录按钮 ，nickName存在就不显示，不存在就显示  v-if="!nickName">登录</a>

            15.6  刷新页面，检测是否已经登录

                  0.server端编写检测接口

                  1.client端 在对应的vue模块中挂载生命周期挂载函数

                      mounted:function(){
                        this.checkLogin()
                      }
                  2.client端 在 编写函数 ，添加路由接口
                     checkLogin(){
                       axios.post('/users/checkLogin').then((result)=>{
                         let res = result.data
                         this.nickName = res.result
                       })
                     }
            15.7 退出按钮，  清除cookies
            15.8 配置本地代理
                  1.  client.config  创建自定义api配置文件
                      //定义常量
                      const isProdMode = Object.is(process.env.NODE_ENV,'production')

                      module.exports = {
                        //基础url
                        //每次请求使用axios，
                        baseUrl:isProdMode ? 'http://api.vnshop.cn/api/' : 'api'
                      }
                  2.  client.src   创建api文件夹 创建index.js
                  3.  client.src  main.js 配置 自动添加api前缀 this.$http.get('users/login')
                      //test 10.16
                      import apiConfig from '../config/api.config'
                      import Axios from 'axios'
                      import VueAxios from 'vue-axios'

                      //test 10.16
                      Vue.use(VueAxios,Axios)
                      Axios.defaults.baseURL = apiConfig.baseUrl

                  4.  配置代理
            15.9 登录拦截
                  0.在server.app.js 中
                  app.use(function(req,res,next){

                  })
                  1.封装vue组件 Modal
                     :class="{'md-show':mdShow}"
                     <script>
                       export default {
                         //父子组件传递参数
                         props:['mdShow']
                       }
                     </script>
                  2.GoodsList组件引入传递参数
                    2.1data中定义变量mdShow:false
                    2.2组件传递参数 <Modal :mdShow='mdShow'/>
            15.10 路由传参
                  1.配置路由client.src.router index
                   path:'/user/:userId?/:xiaorong?',//?代表可写，也可以不写
                  2.使用传参
                   let id = this.$route.params.userId;
            15.11 购物车页面
                  1. client.src.views  创建Cart.vue
                  2. client.src.router index.js 配置
                    {
                     path:'/cart',//?代表可写，也可以不写
                     component:Cart
                    }
                  3.引入各个模块，使用完善页面
                  4.面包屑导航，添加新的内容
                  <NavBread><span>购物车列表</span></NavBread>
                  5.商品数量加减
                  6.实时计算商品价格和
                  Vue. 计算属性computed
                       totalPrice(){
                         let money = 0

                         this.cartList.forEach((item)=>{
                           if(item.checked == '1'){
                             money += item.salePrice * item.productNum
                           }
                         })
                         return money
                       }
                  7.全选与反选
                  8.结账
                     checkOut 判断是否有内容结账，有跳转
                  9.设置默认地址 后端状态代码设计：
                    报名  10
                    预审  15
                    审核  20
                    正常  30
                    迟到  40
                    爽约  50
            16.确认地址
                  1.设置地址
                    <li v-for="(item,index) in addressList" :key="index" :class="{'check':checkIndex == index}" @click="checkIndex = index;selectedAddrId = item.addressId">
                    点击哪个，哪个就被选中，且通过下面传递给路由器
                  2.设置下一步路由，并传递上面的参数
                     <roter-link class="btn btn--m btn--red" :to="{path:'orderConfirm',query:{'addressId':selectedAddrId}}">下一步</roter-link>

                     获取地址：  this.$route.query.addressId

            17.生成订单号
                  前

                  后
                    接受参数、

            18.时间格式化，需要加载公共库，放置在server下创建 util util.js  Module.exports = {}
               直接引入模块即可使用




      ************16  上线***********************************************************************************************
        ubuntu
        centos
        mongodb
        node.js
        vue.js
        docker

        vuex 所有的组件数据都可以调用

        1.购买服务器
         搬瓦工  推荐1g以上内存
         京东云：     杨佳霖1989  ,,,...yjl210423
         开发者云：   729850713@qq.com  yjl558030


        nginx
        php fpm
        mysql
        mongodb
        nodejs

        pm2

        gitlab.com

        bbs 论坛

        wordpress

        hexo

        连接服务器软件： Xshell 6  、 PuTTY

        [ root@host   ~   ] #            $
        用户名 主机名 目录  以管理者身份 以普通用户身份

        pwd  查看当前用户在哪底下

        ubuntu 系统
        一、配置zsh环境
         1.先安装 zsh
          apt-get install-y zsh


         2.再安装ohmyz.sh
          sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

         3. apt-get update  更新库

        二、安装项目的运行环境

         1.安装nginx 是一个web服务器 （apache也是一个web服务器）

         2.安装mysql

         3.安装lnmp          lnmp.org/install.html,
                             有一条语句 选中 MySQL(Default)

         4.安装mongoDB

         4.安装node运行环境

         export NVM_DIR="/root/.nvm"
         [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"  # This loads nvm

        三、
        克隆git 项目
        git clone https://github.com/Yangjialin1989/repor-01
        生产环境运行项目



        ERROR in static/js/vendor.49ba12cac04145a8a8f9.js from UglifyJs
        Unexpected token punc «:», expected punc «,» [./node_modules/_debug@2.6.9@debug/src/browser.js:158,8][static/js/vendor.49ba12cac04145a8a8f9.js:7328,56]

        Module build failed: Error: Couldn't find preset "es2015" relative to directory "/root/vue/repor-01/Vue/demo/client"
                                                  预先布置        相关的       目录

        TypeError: requestShortener.shorten is not a function

        npm install uglifyjs-wepack-plugin@0.4.6 -D



                  `function load() {
                    var r;
                    try {
                      r = exports.storage.debug;
                    } catch(e) {}

                    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
                    // if (!r && typeof process !== 'undefined' && 'env' in process) {
                    //   r = process.env.DEBUG;

                    // }

                    return r;
                  }`


         四、上线的时候，
          1. 先npm run build --report
          2. 绑定域名，相当于每次访问网站，都会访问demo1/client/dist/index.html
             2.1 登录阿里云，
             2.2 打开控制台
             2.3 域名与网站
             2.4 点击解析
             2.5 添加解析
                 域名：misssu.cn
                 域名解析为：   www 二级域名   添加@ 就是不带www就可以访问
                 记录类型   主机记录   解析线路（运营商）   记录值
                  A          @            默认           69.171.78.112
             2.6 网络访问域名 出现 nginx ，怎么让其出现vue的东西 vim index.html 因为默认访问的是index.html
                 怎么修改成访问disk/index.html

                 -~ lnmp vhost add
                    添加虚拟主机

                 ------------------------------------------------------
                 | Manager for LNMP,Written by Licess                 |
                 |----------------------------------------------------|
                 |               https://lnmp.org                     |
                 +----------------------------------------------------+
                  Please enter domain(example:www.lnmp.org):misssu.cn
                  添加域名
                  Your domain:misssu.cn

                  Enter more domain name(example:lnmp.org *.lnmp.org):
                  您还需要添加其他域名吗

                  Default directory: /home/root/misssu.cn: /home/root/vnshop/client/dist
                  默认网站根目录

                  Allow Rewrite rule ? (y/n) y
                  时候运行改变静态规则

                  Please enter the rewrite of programme,
                  wordpress,discuz,typecho,sablog,typecho rewrite was exist.
                  (Default rewrite: other):
                  You choose rewrite: other

                  Allor access log?(y/n) y
                  Enter access log filename(Default:misssu.cn.log):
                  You access log filename:misssu.cn.log

                  Create database and MySQL user with same name (y/n)
                  Add SSL Certificate (y/n)

                  Press any key to start create virtul host...
                  按任意键，创建虚拟主机

                  ================================================================
                  Virtualhost information:
                  Your domain: misssu.cn
                  Home Directory: /home/root/vnshop/client/dist
                  Rewrite: other
                  Enable log: yes
                  Create database: no
                  Create ftp account: no
                  =================================================================

                  再次访问就可以看到vnshop内容了

          3. nginx 反向代理
             vim  /usr/local/nginx/config/vhost/misssu.config

             server
                  {
                    listen 80;
                    #listen [::]:80;
                    server_name misssu.cn www.misssu.cn;可以在这里添加域名,然后阿里云再解析一下
                    index index.html index.htm index.php default.html default.html default.php;
                    root  /home/root/vnshop/client/dist;路径

                    include other.conf;
                    #error_page  404   /404.html;

                    #Deny access to PHP files in specific directory
                    //deny access 拒绝访问；不让进入
                    //specific  特殊的，特定的；
                    #location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ {deny all; }

                    include enable-php.conf;;

                    location ~ .*\.(git|jpg|jpeg|png|bmp|swf)$
                    {
                      expires   30d
                     // (因到期而) 失效，终止; 到期; 届满; 逝世; 去世; 故去;

                    }
                  }

                xshell指令： tail 查看日志

           4.数据库改成远程的
             修改前：
             mongoose.connect('mongodb://localhost:27017/goods',{ useNewUrlParser:true})
             修改后：
             mongoose.connect('mongodb://192.168.31.77:27017/goods',{ useNewUrlParser:true})









vuex  vue的状态管理模式
          状态：驱动应用的数据源


         commit       提交
         mutation     变异、转变

     1.安装 npm 包
     2.src下创建store文件夹，vuex的内容放在里面
     3.store创建index.js
        3.1
        //2.挂载
        Vue.use(Vuex)

        //3.创建vuex实例
        let store = new Vuex.Store({
          //状态
          state:{
            num:100
          },
          //变化
          mutations:{
            //里面可以定义很多函数,当触发这个函数就会改变state状态。
            addIncrement(state){
              //接收一个state作为参数，
              state.num += 5
            },
            minIncrement(state,payload){
              //接收一个state作为参数，
              state.num -= payload.n
            }
          }

        })

        //4.导出store
        export default store


     4.主入口文件 main.js导入并挂载到vue实例上

     5.模板中如何使用
         5.1 添加实时计算属性,将vuex的实例this.$store中的数据挂载到其中
         computed:{
           num: this.$store.state.num
         }

         5.2 添加事件，将vuex的实例this.$store 中的mutations:{addIncrement(state){ this.state += 5} }中的函数调用,使用commit指令,可以传递参数
         
         methods:{
           addHandle(){
             this.$store.commit("addIncrement")
           }
         }
         
         methods:{
           addHandle(){
             this.$store.commit("addIncrement",{name:'payload',age:18,n:5})
           }
         }
       
       
      第二种使用方法  结构赋值
      
      import {mapState} from 'vuex'
       
      
       
       
         
         
``

3.协助工具  git  teambition pubu




4.后端还没有给api接口，使用mock模拟数据
