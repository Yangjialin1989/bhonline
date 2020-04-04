var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Lists = require('../models/lists');

//存储数据
router.post('/lists',function(req,res,next){
    //console.log(req.body)
	const lists = req.body
	const list = new Lists(lists)
		list.save().then((result)=>{
		console.log("存储数据成功!")
		res.json({
			status: 0,
			result:result
		})
	})
})

/*获取数据
router.post('/getlists',function(req,res,next){
	//let param = {goods_attr:"08"},
	let param = {}
	Lists.findOne(param,function(err,doc){
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
*/
router.post('/getlists',function(req,res,next){
	//let param = {goods_attr:"08"},

	let param = {}
	Lists.find(function(err,doc){
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


module.exports = router
