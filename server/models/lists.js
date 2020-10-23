var mongoose = require('mongoose')
var Schema = mongoose.Schema
var listSchema = new Schema({
	'goods_attr':String,
	'goods_type':String,
	'goods_position':String,
	'goods_sn':String,
	'goods_name':String,
	'goods_number':String,
	'goods_price':String,
	'goods_keywords':String,
	'goods_desc':String,
	'goods_img':String,
	'goods_is_real':String,
	'goods_add_time':String,
	'goods_is_delete':String,
	'goods_is_new':String,
	'goods_is_hot':String,
	'goods_admin':Array,
	'goods_people':String,
	'goods_medicines_producer':String,
	'goods_medicines_use':String,
	'goods_medicines_attr':String,
	'goods_medicines_norms':String,
	'goods_medicines_data_of_manufacture':String,
	'goods_medicines_quality_guarantee_period':String,
	'goods_medicines_limit':String,
	'tag':String
})
module.exports = mongoose.model('Lists',listSchema)
