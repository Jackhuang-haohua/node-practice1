let express = require("express")
let router = express.Router()
var fs = require('fs');
var bodyParser = require('body-parser'); //取得非地址栏数据
var multiparty = require('multiparty'); //文件上传
var studentMethod = require('./../method/student_method.js'); //操作方法
let ejs = require("ejs") //ejs模板引擎

//首页点击添加时
router.get("/", function (req, res) {
    res.render("student_add.ejs");
});

//添加学生信息
router.post("/", function (req, res) {

    //文件上传组件
    var form = new multiparty.Form()
    form.uploadDir = './upload' //上传图片保存的文件
    var rootUrl = "/upload" //图片根目录
    form.parse(req, function (err, fields, files) {

        var studentName = fields.studentName[0]
        var sex = fields.sex[0]
        var class1 = fields.class[0]
        var from = fields.from[0]
        var age = fields.age[0]

        if (files.pic && files.pic[0]) { //如果上传了图片 则

            var orgFilename = files.pic[0].originalFilename;
            var picUrl = rootUrl + "/" + orgFilename;
            var student = {
                studentName: studentName,
                sex: sex,
                age: age,
                class: class1,
                from: from,
                picUrl: picUrl,
            };

            // 图片上传后，原名为乱码(files.pic[0].path)，需要重命名
            fs.rename(files.pic[0].path, form.uploadDir + "/" + orgFilename, function (err) {
                if (err) throw err;
                // 使用MongoDB方法添加信息
                studentMethod.addStudent(student, function (n) {
                    if (n > 0) {
                        res.json({
                            status: 200,
                            message: '添加图书成功'
                        })
                    } else {
                        res.json({
                            status: 400,
                            message: '添加图书失败'
                        })
                    }
                })
            })

        } else { //没有上传图片
            var student = {
                studentName: studentName,
                sex: sex,
                age: age,
                class: class1,
                from: from,
            };
            studentMethod.addStudent(student, function (n) {
                if (n > 0) {
                    res.json({
                        status: 200,
                        message: '添加图书成功'
                    })
                } else {
                    res.json({
                        status: 400,
                        message: '添加图书失败'
                    })
                }
            })
        }
    })
})

module.exports = router;