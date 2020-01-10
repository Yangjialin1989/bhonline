var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//中间件
var bodyParser = require('body-parser');


//添加新的数据模型.第三步 加载到app.js
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var goodsRouter = require('./routes/goods');
var adminsRouter = require('./routes/admins')
var feedBacksRouter = require('./routes/feedBacks')
var picturesRouter = require('./routes/pictures')








var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(bodyParser({limit: "5000kb"}));
//app.use(express.json({limit:'5000kb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//访问拦截 每次访问都走这个逻辑
// app.use(function(req,res,next){
// 	if(req.cookies.userId){
// 		next()
// 	}else{
// 		//indexOf('/goods/list') > -1 判断字符串里面时候包含/goods/list 
// 		console.log(req.originalUrl)
// 		if(req.originalUrl == '/users/login' || req.path == '/goods/list'){
// 			next()
// 		}else{
// 			res.json({
// 				status:'1',
// 				msg:'当前用户未登录',
// 				result:''
// 			})
// 		}
// 	}
// })

//添加新的数据模型.第四步 挂载到app.js
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goods',goodsRouter)
app.use('/admins',adminsRouter)
app.use('/feedBacks',feedBacksRouter)
app.use('/pictures',picturesRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
