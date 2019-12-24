var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var FeedBacks = require('../models/feedBacks')

router.post('/feedBack',function(req,res,next){
    //console.log(req.body)
	const feedBacks = req.body
	const feedback = new FeedBacks(feedBacks)
	feedback.save().then((result)=>{
		
		res.json({
			status: 0,
			result:"数据存储成功"
		})
	})
})



module.exports = router