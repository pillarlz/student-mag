var formidable = require("formidable");
var manager = require("../models/manager.js");
var student = require("../models/student.js");
var md5 = require("../models/md5.js");

exports.showIndex = function(req,res,next){
    res.render("index");
};
exports.showRegist = function (req,res,next){
    res.render("regist");
};
exports.showLogin = function (req,res,next){
    res.render("login");
};
exports.doRegist = function(req,res,next){
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var username = fields.username;
        var password = fields.password;
        //对密码进行加密
        password = md5(md5(password) + "zhuzi");
        //核对数据库是否有这个人
        manager.find({"username":username},function(err,result){
            if(err){
                res.send("-3");//服务器错误
                return;
            }
            if(result.length !=0){
                res.send("-1");//用户名被占用
                return;
            }

            manager.create({
                "username":username,
                "password":password
            },function(err,result){
                if(err){
                    res.send("-3");//服务器错误
                    return;
                }
                req.session.login = "1";
                res.send("1");
            })
        })
    });
};
exports.doLogin = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var username = fields.username;
        var password = fields.password;
        var jiamihou = md5(md5(password) + "zhuzi");

        manager.find({"username":username},function(err,result){
            if(err){
                res.send("-5");
                return ;
            }
            if(result.length == 0){
                res.send("-1");//用户名不存在
                return;
            }
            //进一步匹配密码
            if(jiamihou==result[0].password){
                req.session.login = "1";
                res.send("1");//登录成功
                return;
            } else {
                res.send("-2");//密码错误
                return;
            }
        })
    })
};
exports.showmindex = function(req,res,next){
    if (req.session.login != "1") {
        res.send("非法闯入，这个页面要求登陆！");
        return;
    }
    student.find({},function(err,result){
        res.render("mindex",{
            "students":result
        });
    })
};
exports.showaddstudent = function(req,res,next){
    res.render("add");
};
exports.doaddstudent = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var sid = fields.sid;
        // var name = fields.name;
        // var sex = fields.sex;
        // var age = fields.age;
        // var phone = fields.phone;
        // var email = fields.email;
        // var other = fields.other;
        student.find({"sid":sid},function(err,result){
            if(result.length !=0){
                res.send("-1");    //用户名被注册
                return;
            }
            if(result.length == 0) {
                student.create(fields, function (err, result) {
                    if (err) {
                        res.send("-3");
                        return;
                    } else {
                        res.send("1");
                        return;
                        // res.redirect('/mindex');
                    }
                });
                return;
            }
        })
    });
    // res.location("/mindex");
};
exports.edit = function(req,res,next){
    //执行修改
    var sid = parseInt(req.params["sid"]);//没加parseInt之前是字符串
    student.findOne({"sid":sid},function(err,result){
        if(err||!result){
            res.send("错误");
            return ;
        }
        res.render("edit",{
            "student" : result
        });
    })
}
exports.doedit = function(req,res,next){
    //显示修改页面
    //要改的学生id
    var sid = parseInt(req.params["sid"]);
    student.update({"sid":sid},req.query,function(){
        // res.send("修改成功");
        // res.send("<script type='text/javascript'>alert('修改成功');history.go(-2);</script>");
        res.send("<script type='text/javascript'>alert('修改成功');window.location.href='/mindex';</script>");
    });
}
exports.remove = function(req,res,next){
    //显示修改页面
    //要改的学生id
    var sid = parseInt(req.params["sid"]);
    student.remove({"sid":sid},function(){
        // res.send("删除成功");
        // res.send("<script type='text/javascript'>alert('删除成功');history.go(-1);</script>");
        res.send("<script type='text/javascript'>alert('删除成功');window.location.href='/mindex';</script>");
    });
}
exports.findName = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var name = fields.searchName;
        student.find({"name":name},function(err,result){
            res.send(result)
            console.log(result)
        })
    })
}