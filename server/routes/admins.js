var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Admins = require('../models/admins');

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
//登录
router.post('/login', function(req, res, next) {
	//1.传递参数 userName、userPwd
	let param = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}
	//2.把用户名和密码，去数据库查询看是否存在
	Admins.findOne(param, function(err, doc) {
		//console.log(doc.children[0].content)
		//if(!doc)
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
					res:doc
					// result: {
					// 	userName: doc.userName,
					// 	headerImgData:doc
					// 	//headerImgData:doc.children[0].content
					// }
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
	admin.children.content = 'hhhh'
	admin.save().then((result)=>{
		console.log("存储数据成功!")
		res.json({
			status: 0,
			result:result
		})
	})
	
})
/*登录检测是否有头像,没有提示消息
router.post('/checkHeaderImg',function(req,res,next){
	let admins = req.body
	let admin = new Admins
	//console.log(admins)
	let param = {userName:req.body.userName},
	Admins.findOne(param,function(err,doc){
		if(err) return console.log(err)
		if(doc.children.length = 0){
			console.log('该用户还没有上传头像啊')
		}
	})
})
*/

//头像预加载
router.post('/uploadheaderImg',function(req,res,next){
	let param = {userName:req.body.userName}
	Admins.findOne(param,function(err,doc){
		if(err) return console.log(err);
		
		if(doc){
			res.json({
				status:0,
				msg:'头像上传成功!',
				res:doc
			})
		}
	})
})


// //头像上传,将children子文档并添加到admins文档
router.post('/headerImg',function(req,res,next){
	let admins = req.body;
	console.log(admins)
	let param = {userName:req.body.userName};

	Admins.update(param,{$set:{children:admins}},function(err,doc){
		if(err) return console.log(err);
		if(doc){
			console.log(admins)
					res.json({
						status:0,
						msg:'头像上传成功!',
						res:admins
					})
		}
	})
	let pwd_questions = {pwd_question1:'你的真实姓名是?',
	pwd_answer1:'杨佳霖',
	pwd_question2:"你的法名是?",
	pwd_answer2:"会光",
	pwd_question3:"你的户籍是?",
	pwd_answer3:"辽宁抚顺"};
	Admins.update(param,{$set:{pwd_protection:pwd_questions}},function(err,doc){
		if(err) return console.log(err);
		if(doc){
			console.log(doc);
		}
	})
})
//密码保护设定
router.post('/pwd_protection',function(req,res,next){
	console.log(req.body)
	let pwd_questions = req.body;
	let param = {userName:req.body.userName};
	Admins.update(param,{$set:{pwd_protection:pwd_questions}},function(err,doc){
		if(err) return console.log(err);
		if(doc){
			res.json({
				status:0,
				msg:'密保设定成功!',
				res:doc
			})
		}
	})
})
//
router.post('/save_new_password',function(req,res,next){
	console.log(req.body)
	let param = {userName:req.body.userName};
	let userPwd=req.body.userPwd;
	Admins.update(param,{$set:{userPwd:userPwd}},function(err,doc){
		if(err) return console.log(err);
		if(doc){
			res.json({
				status:0,
				msg:'密保修改成功!',
				res:''
			})
		}
	})
})

//用户名验证
router.post('/check_userName',function(req,res,next){
	let param = req.body;
    Admins.findOne(param,function(err,doc){
		if(err) return console.log(err);
		if(!doc){
			console.log('进来了.')
			res.json({
				status:0,
				msg:'用户名验证失败!',
				res:''
			})
		}
		if(doc){
			res.json({
				status:0,
				msg:'用户名验证成功!',
				res:doc
			})
		}
	})
})



module.exports = router













