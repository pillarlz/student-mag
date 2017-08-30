//引包
var mongoose = require('mongoose');
//创建数据库连接
var db = mongoose.createConnection('mongodb://127.0.0.1:27017/studentmag');
//监听open事件
db.once("open",function(callback){
    console.log("数据库成功连接");
});
//向外暴露这个
module.exports= db;