var mongoose = require('mongoose')
var Schema = mongoose.Schema
var feedBacksSchema = new Schema({
	"feedBackQuestion":String,
	"feedBackEmail":String,
	"feedBackTime":Object,
	"feedBackIp":String
})
module.exports = mongoose.model('FeedBacks',feedBacksSchema)