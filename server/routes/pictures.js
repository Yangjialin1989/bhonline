var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Pictures = require('../models/pictures')

router.post('/picture',function(req,res,next){
    console.log(req.body)
	 const pictures = req.body
	 const picture = new Pictures(pictures)
	 picture.save().then((result)=>{
	 	res.json({
			status: 0,
	 		result:result
		})
	 })
})



module.exports = router