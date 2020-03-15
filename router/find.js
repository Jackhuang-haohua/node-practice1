let express = require("express")
let router = express.Router()
var fs = require('fs');
var bodyParser = require('body-parser'); //取得非地址栏数据
var multiparty = require('multiparty'); //文件上传
var studentMethod = require('./../method/student_method.js'); //操作方法
let ejs = require("ejs") //ejs模板引擎

// 首页点击查询时
router.get("/", function (req, res) {

    var data = req.query;
    var obj = {}
    if (data.studentName != '') {
        obj.studentName = `${data.studentName}`
    }
    if (data.sex != '') {
        obj.sex = `${data.sex}`
    }
    if (data.age != '') {
        obj.age = `${data.age}`
    }
    if (data.class != '') {
        obj.class = `${data.class}`
    }
    if (data.from != '') {
        obj.from = `${data.from}`
    }

    if (obj.studentName != undefined || obj.sex != undefined || obj.age != undefined || obj.class != undefined || obj.from != undefined) {
        studentMethod.findStudent(obj, function (list) {
            return res.send(list)
        })
    } else {
        return res.send(obj)
    }
})

module.exports = router;