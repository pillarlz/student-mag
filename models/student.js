var mongoose = require("mongoose");
var db = require("./db.js");
//创建了一个学生结构。
var studentSchema = new mongoose.Schema({
    "sid":Number,
    "name":String,
    "sex":String,
    "age":Number,
    "phone":String,
    "email":String,
    "other":String
});
studentSchema.index({"sid":1});
//学生模型
var studentModel = db.model('student', studentSchema);
//向外暴露
module.exports = studentModel;

