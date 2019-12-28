module.exports = {
	plugins:{
		autoprefixer:{
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
          rootValue: 75,//根元素字体大小
          propList: ['*']
    }

	},
}
