let express = require("express")
let router = express.Router()
var fs = require('fs');
var bodyParser = require('body-parser'); //取得非地址栏数据
var multiparty = require('multiparty'); //文件上传
var studentMethod = require('./../method/student_method.js'); //操作方法
let ejs = require("ejs") //ejs模板引擎

// 首页确认删除时，ajax请求删除delete接口
router.post("/", function (req, res) {

    var _id = req.body._id;

    // 先根据id找到信息，dbStudent即为找到的学生信息
    studentMethod.findStudentById(_id, function (dbStudent) {
        // 根据id删除信息，n表示找到n条信息
        studentMethod.deleteStudentById(_id, function (n) {
            if (n > 0) {
                if (dbStudent.picUrl) { //如果有图片就删了
                    fs.unlinkSync("." + dbStudent.picUrl); //fs.unlink删除
                }
                res.json({
                    status: 200,
                    message: '删除成功'
                });
            } else {
                res.json({
                    status: 400,
                    message: '删除失败'
                })
            }
        })
    })
})

module.exports = router;