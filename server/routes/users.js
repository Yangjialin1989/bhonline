var express = require('express');
var router = express.Router();

//引入users数据
var Users = require('../models/users')
/* GET users listing. */
var Admins = require('../models/admins')
//1.登录接口
router.post('/login', function(req, res, next) {
	//1.传递参数 userName、userPwd
	let param = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	//2.把用户名和密码，去数据库查询看是否存在
	Admins.findOne(param, function(err, doc) {
			if (err) {
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
						userName: doc.userName
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

//注册





//退出  清除登录数据
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
module.exports = router;
