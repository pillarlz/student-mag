var express = require("express");
var app = express();
var router = require("./router/router.js");
var session = require('express-session');

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine","ejs");
app.use(express.static("./public"));
app.get("/",router.showIndex);
app.get("/regist",router.showRegist);
app.post("/doregist",router.doRegist);
app.get("/login",router.showLogin);
app.post("/dologin",router.doLogin);
app.get("/mindex",router.showmindex);
app.get("/addstudent",router.showaddstudent);
app.post("/doaddstudent",router.doaddstudent);
app.get("/edit/:sid",router.edit);
app.get("/doedit/:sid",router.doedit);
app.get("/remove/:sid",router.remove);
app.post("/findName",router.findName);

app.listen(3000);