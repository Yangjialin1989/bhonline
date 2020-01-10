

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb:localhost:27017/goods',{ useNewUrlParser:true});
var conn = mongoose.connection;
  
var fs = require('fs');
 
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
  
conn.once('open', function () {
  console.log('open');
  var gfs = Grid(conn.db);
 
  // 写文件
  var writestream = gfs.createWriteStream({
      filename: 'mongo_file.txt'
  });
  fs.createReadStream('./local.txt').pipe(writestream);
 
  writestream.on('close', function (file) {
    console.log(file.filename + ' Written To DB');
  });
 
  var fs_write_stream = fs.createWriteStream('./write.txt');
  
  // 读取文件
  var readstream = gfs.createReadStream({
      filename: 'mongo_file.txt'
  });
  readstream.pipe(fs_write_stream);
  fs_write_stream.on('close', function () {
      console.log('file has been written fully!');
  });
 
  // 根据文件名称
  gfs.remove({filename: 'mongo_file.txt'}, function (err) {
    if (err) return handleError(err);
    console.log('success');
  });
 
  // 根据fs.files._id删除
  gfs.remove({_id : '548d91dce08d1a082a7e6d96'}, function (err) {
    if (err) return handleError(err);
    console.log('success');
  });
 
  // 判断文件是否存在
  var options = {filename : 'mongo_file.txt'}; // 使用_id也可以
  gfs.exist(options, function (err, found) {
    if (err) return handleError(err);
    found ? console.log('File exists') : console.log('File does not exist');
  });
 
  // 获取文件基础信息
  gfs.files.find({ filename: 'mongo_file.txt' }).toArray(function (err, files) {
    if (err) {
      throw (err);
    }
    console.log(files);
  });
});













