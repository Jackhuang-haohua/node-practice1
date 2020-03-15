var fs = require('fs');
var express = require('express'); //服务器
var session = require("express-session"); //身份验证
var bodyParser = require('body-parser'); //取得非地址栏数据
var multiparty = require('multiparty'); //文件上传
var studentMethod = require('./method/student_method.js'); //操作方法
let ejs = require("ejs") //ejs模板引擎

// 配置服务器
var app = express()
app.listen(3000, function () {
    console.log("正在监听3000");
})

// 静态资源托管，__dirname会自动找到根目录
app.use("/lib", express.static(__dirname + "/lib")); //要引入的js和css文件
app.use("/upload", express.static(__dirname + "/upload")); //上传的图片

// ejs模板文件，生产html页面
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

// 配置bodyParser中间件
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get("/", (req, res, next) => {
    res.send("进入3000端口")
})

// 首页
app.use("/student_list", require("./router/list.js"))

// 添加页
app.use("/student_add", require("./router/add.js"))

// 删除页
app.use("/student_delete", require("./router/delete.js"))

// 修改页
app.use("/student_update", require("./router/update.js"))

// 查询页
app.use("/student_find", require("./router/find.js"))