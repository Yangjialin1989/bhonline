var mongoose = require('mongoose')
var Schema = mongoose.Schema
var picturesSchema = new Schema({
	"content":String,
		"lastModifiedDate":String,
		"name":String,
		"size":String,
		"type":String
})
module.exports = mongoose.model('Pictures',picturesSchema)