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


//	let param = { goods_medicines_quality_guarantee_period: 3}
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
//删除
router.post('/DeteleLists',function(req,res,next){
	     let param = req.body;
        console.log(param)
	Lists.remove(param,function(err,doc){
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
//更新
router.post('/UpdateLists',function(req,res,next){
	let param = {_id:req.body._id};
	let data = req.body
	Lists.findOne(param,function(err,doc){
		if(doc){
			Lists.update(param,data).then((result)=>{
				res.json({
					status:700,
					msg:"原数据更新成功！",
					res:doc
				})
			})
		}
	})
})
module.exports = router
