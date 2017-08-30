var mongoose = require("mongoose");
var db = require("./db.js");
//创建了一个管理员结构。
var managerSchema = new mongoose.Schema({
    username : {type : String},
    password : {type : String}
});
//管理员模型
var managerModel = db.model('manager', managerSchema);
//向外暴露
module.exports = managerModel;