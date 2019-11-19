var mongoose = require('mongoose')
var Schema = mongoose.Schema
var userSchema = new Schema({
	"userId":String,
	"userName":String,
	"orderList":Array,
	"cartList":Array,
	"cartList":[{
			"productId":String,
			"productName":String,
			"salePrice":Number,
			"productImage":String,
			"productNum":Number,
			"checked":String
	}],
	"addressList":[
		{
			"addressId":String,
			"userName":String,
			"streetName":String,
			"postCode":Number,
			"tel":Number,
			"isDefault":Boolean
		}
	]
})
// var userSchema = new Schema({
// 	"userId":String,
// 	"userName": String,
// 	"orderList": Array,
// 	"cartList":Array,
// 	// "cartList":[
// 	// 	{
// 	// 		"productId"    : Number,
// 	// 		"productName"  : String,
// 	// 		"salePrice"    : Number,
// 	// 		"productImage" : String,
// 	// 		"productUrl"   : String,
// 	// 		"checked"      : String
// 	// 	}
// 	// ],
// 	"productId"    : Number,
// 	"productName"  : String,
// 	"salePrice"    : Number,
// 	"productImage" : String,
// 	"productUrl"   : String,
// 	"checked"      : String,
// 	"addressList":[]
// })
// 
module.exports = mongoose.model('Users',userSchema)
