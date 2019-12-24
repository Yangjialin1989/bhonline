var mongoose = require('mongoose')
var Schema = mongoose.Schema
var adminSchema = new Schema({
	"userId":String,
	"userName":String,
	"userPwd":String,
	"buyerPhone":Number,
	"buyerEmail":String,
	"headerImgData":String
})
module.exports = mongoose.model('Admins',adminSchema)
