var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')


var Grid = require("gridfs-stream")
//var gfs = Grid()



var Goods = require('../models/goods')
var Users = require('../models/users')
var Admins = require('../models/admins')
mongoose.connect('mongodb://localhost:27017/goods',{ useNewUrlParser:true})
mongoose.connection.on('connected', function() {
	console.log('mongodb connected !')
})
mongoose.connection.on('error', function() {
	console.log('mongodb error !')
})
mongoose.connection.on('disconnected', function() {
	console.log('mongodb disconnected !')
})

router.post('/userMsg',function(req,res,next){
	// mongoose.connect("mongodb://localhost:27017/admins",{useNewUrlParser:true},function(err){
	// 	if(err){
	// 		console.log("连接失败")
	// 	}else{
	// 		console.log("连接成功")
	// 	}
		
	// })
	const User = mongoose.model("user",{userName:String,userPwd:String,userId:String})
	const user = new User({userName:"张三1",userPwd:'1234561',userId:'11111111'})
	user.save().then((result)=>{
		console.log(result)
	}
	,()=>{
		
	})
})
router.post('/userRegist',function(req,res,next){
    //console.log(req.body)
	const admins = req.body
	const admin = new Admins(admins)
	admin.save().then((result)=>{
		console.log("存储数据成功!")
		res.json({
			status: 0,
			result:result
		})
	})
})



router.get('/list', function(req, res, next) {
	//接口编写,使用req.param('') 挂载参数
	// 1.价格排序接口sort
	let sort = req.param('sort')
	// 2.价格区间接口priceLevel
	let priceLevel = req.param('priceLevel');
	
    let salePrice ={}
	let param = {}
	if (priceLevel != 'all') {
		//表驱动法
		let priceItem = [[0,100],[100,500],[500,1000],[1000,5000]]
		param = {
			salePrice: {
				$gt : priceItem[priceLevel][0],
				$lte: priceItem[priceLevel][1]
			}
		}
	}
    //调试接口param
	console.log(param)
	
	//分页api
	//当前页码
	let currentPage = (parseInt(req.param('page')) > 0) ? parseInt(req.param('page')) : 1
	//每页显示几条数据
	let pagesize = (parseInt(req.param('pagesize')) > 0) ? parseInt(req.param('pagesize')) : 8
	//跳过的数据条数，从skip开始获取新的数据
	let skip = (currentPage - 1)* pagesize
	
	
	
	let goodModel = Goods.find(param).sort({'salePrice': sort}).skip(skip).limit(pagesize);
	goodModel.exec({}, function(err, doc) {
		res.json({
			status: 0,
			result: doc
		})
	})
})

//2.加入购物车
router.post('/addCart',function(req,res,next){
	//res.setHeader({'Content-Type':'text/html;charset=utf-8'})
	//let userId = '100000077'
	let userId = req.cookies.userId
	//商品id ,productId 是通过post传递的
	let productId = req.param('productId')
	
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
			goodDoc.checked = 1
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
		}
		
		
		
		
	})
		
})



















//2.加入购物车
// router.post('/addCart',function(req,res,next){
//     res.setHeader({'Content-Type':'text/html; charset=utf-8'})
// 	//2.1查询用户
// 	let userId = '100000077'
// 	//商品id ，通过res传递参数
// 	let productId = req.body.productId
// 	
// 	Users.findOne({userId:userId},function(err,userDoc){
// 		//2.2 通过商品id去查询数据库，把商品信息查询出来
// 		//var userDoc = JSON.parse(userDoc)
// 		
// 		var cartList = JSON.parse(userDoc.cartList)
// 		let arr = [].slice.call(cartList)
// 
// 		res.json({
// 			//result: arr
// 			//result:aa
// 		})
// 		Goods.findOne({productId:productId},function(err1,goodDoc){
// 			//console.log(arr)
// 			//console.log(goodDoc)
// 			let newGoodsList = arr.concat(goodDoc)
// 			//console.log(newGoodsList)
// 			// return
// 			// res.json({
// 			// 	
// 			// 	result:arr10
// 			// })
// 			
// 			userDoc.save(function(err2,doc2){
// 				if(err2){
// 
// 					console.log('err2')
// 					//doc2.close()
// 					res.setHeader('Content')
// 				 	return res.end({status:1,msg:err2.message})
// 				}else{
// 
// 				 	res.end({status:0,msg:'',result:'加入购物车成功！'})
// 				}
// 			})
// 			
// 		})
// 	})
// })
// 
module.exports = router
