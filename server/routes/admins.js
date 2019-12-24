var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Admins = require('../models/admins')
// mongoose.connect('mongodb://localhost:27017/admins',{ useNewUrlParser:true})
// mongoose.connection.on('connected', function() {
// 	console.log('mongodb connected !')
// })
// mongoose.connection.on('error', function() {
// 	console.log('mongodb error !')
// })
// mongoose.connection.on('disconnected', function() {
// 	console.log('mongodb disconnected !')
// })

router.post('/checkName',function(req,res,next){
	let param = {
		userName:req.body.userName
	}
	console.log(param)
	Admins.findOne(param,function(err,doc){
		if(!doc){
			res.json({
				status:100,
				msg:'该用户名可以注册!'
			})
		}
		if(doc){
			res.json({
				status:101,
				msg:'用户名已存在,请更换!'
			})
		}
	})
})

router.post('/login', function(req, res, next) {
	//1.传递参数 userName、userPwd
	let param = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	//2.把用户名和密码，去数据库查询看是否存在
	Admins.findOne(param, function(err, doc) {
		console.log(doc)
		console.log(err)
			if (!doc) {
				console.log('hhh')
				res.json({ 
					status: 1,
					msg: '用户名或密码错误！'
				})
				
			}
			//存去到cookie中
			
			// res.cookie('userId', doc.userId, {
			// 	path: '/',
			// 	maxAge: 1000 * 60 * 60 //过期时间
			// })

			// res.cookie('userName', doc.userName, {
			// 	path: '/',
			// 	maxAge: 1000 * 60 * 60 //过期时间
			// })


			if (doc) {
				
			//存去到cookie中
			
			res.cookie('userId', doc.userId, {
				path: '/',
				maxAge: 1000 * 60 * 60 //过期时间
			})
			
			res.cookie('userName', doc.userName, {
			  	path: '/',
				 maxAge: 1000 * 60 * 60 //过期时间
		    })
			
			
		
				res.json({
					status: 0,
					msg: '',
					result: {
						userName: doc.userName,
						headerImgData:doc.headerImgData
					}
				})
			}
				
			
		
	})
})

//2.每次刷新页面验证登录
router.post('/checkLogin',function(req,res,next){
	if(req.cookies.userId){
		res.json({
			status:'0',
			result:req.cookies.userName
		})
	}else{
		res.json({
			status:1,
			msg:'未登录',
			result:''
		})
	}
})

//3.退出  清除登录数据
router.post('/logout',function(req,res,next){
	//清除cookies
	res.cookie('userId','',{
		path:'/',
		maxAge:-1
	})
	res.json({
		status:0,
		msg:'',
		result:'退出成功'
	})
})
//注册
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







module.exports = router













