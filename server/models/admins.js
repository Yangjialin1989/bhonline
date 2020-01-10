var mongoose = require('mongoose')
var Schema = mongoose.Schema
var HeaderImgSchema = new Schema({
	"headerId":Number,
	"content":{
		type: String,
		default:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAD30lEQVR4Xu2a7U8TQRCHBwpYsKWlUmyplGAQSYnESKImmmjiv62JJvJBE1AxJSoEtKVQKe+ttJQWza/JGTxzt7t3s1ea3iVNP9zc3c4zb7uz2/Pyw/ff1MVXjw/A9wA/BPwc0MU5kPwk6FcBvwr4VcCvAl5WgWB/gEbCQQoO9P3z2cNKjWpnDaqdN70cjjdVINDbQ+mxYYpHhig8OGCrYLlap52DCm3vV6h5od85tZfBqUSE0vFh6gv0Klm20bygjeIR5UtlpedUhbUBgNUX7iSEFhcNGKHxaWNXmzdoARAK9reUV7W6FQyExdJaUQsEdgCw/OPZ8f+SnMjSovsIiXdfttmTJDuAh3eTrt3eCgbCYXn9p4iV0n1WABPxMM2kYkoDUBVGYtwsHqs+ZinPBgCu/3TuFlvcW40YofA2u8WWD9gAeGF9AwqnF7AB0Bn7Zm9AVXj/dYclDFgAwP2fz6dZBiT7ktcrOZYwYAEQDV2jhemE7NhZ5JbWi3RUOXP9LhYAXsa/ofG3wgHLNJkFAOb7txNR19ZQeQFXIvQBcPQEuz4Euj4JYtX37N6ESgi7ln3zOU+YFbq9WHIABuHlRIhzUcQGIBm7Tpn0qFuDSD2/mtujnYNfUrIiITYA+NCTTIq9D2BWoFZv0OJqQaSX9H1WAF54Aaf1QYkVAF6YSd+gZCwkbQEVwdLxKa1sllQeEcqyA0BFeDB9k70rhBUgukEcmf8yFXYAeDk3BF3KawkBgy4gzE/FaSQUFLqhnQDcfjW3z25545taPOCyQtgNmkmNKFcH1Hr0/vCv89IOwBg8EiNgxCODlvqgxJWr55QvnWhX3DMPMD6ErlF4aKAVEtgfxOaosU+IGK9U61StN1qKl0/rLN0eGc/R5gFQeCw61FIYP/NusGhwyPaAgRywe3SqDQg7AKwMx2Mh9rkAQORKJyxtMC1lEIpjU0S0/S2yvOg+vALdII5+IEsZhKvPTY62EpyXF9eusasQwNwfVufaBVYFiDyRze3R3nFV9dG/8o4BtKMNZqUlcsNa4dARBEcAdC54HGlB1DpWgxmj6qUM4CoqbyjtxBOUAHix3le1oFletV8gDYD72ItbRa2eR2LEcZpK7VzqE9IAvGx6So3cRkilaSoFoBNc32koSAHwotnp1urm52Wbp0IAnWh9A4ZMQhQC6KTYN3uBTBPVFkA7Tn5wh8Jidsv2bKEtgE52f9kwsAVwlWd9sp4imiLbAsCOb7tWerIKiuREJ8psAby4Pyl6f0fcf/Xxh+U4uwKAXSK0BIC5/6PZ8Y6wsGiQdkfqLAG049iLSBGn9+0A/AEon2Pf6HErPgAAAABJRU5ErkJggg=="
	},
	"lastModifiedDate":String,
	"name":String,
	"size":Number,
	"type":String
})

var pwd_protectionSchema = new Schema({
	'pwd_question1':String,
	'pwd_answer1':String,
	'pwd_question2':String,
	'pwd_answer2':String,
	'pwd_question3':String,
	'pwd_answer3':String,
	
})

var adminSchema = new Schema({
	"userId":String,
	"userName":String,
	"userPwd":String,
	"buyerPhone":Number,
	"buyerEmail":String,
	children:[HeaderImgSchema],
	child:HeaderImgSchema,
	pwd_protection:[pwd_protectionSchema]

})
module.exports = mongoose.model('Admins',adminSchema)
