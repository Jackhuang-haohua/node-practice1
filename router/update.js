let express = require("express")
let router = express.Router()
var fs = require('fs');
var bodyParser = require('body-parser'); //取得非地址栏数据
var multiparty = require('multiparty'); //文件上传
var studentMethod = require('./../method/student_method.js'); //操作方法
let ejs = require("ejs") //ejs模板引擎

// 首页点击修改时
router.get("/:_id", function (req, res) {
    var _id = req.params._id //获取参数 _id

    studentMethod.findStudentById(_id, function (student) {

        let data = {
            studentList: student
        }
        // console.log(data);

        ejs.renderFile("./views/student_update.ejs", data, (err, data) => {
            if (!err) {
                res.send(data) //data就是上面设置的数据
            }
        })
    })
})

//修改学生信息
router.post("/", function (req, res) {

    var form = new multiparty.Form();
    form.uploadDir = './upload'; //上传图片保存的地址
    var rootUrl = "/upload";
    form.parse(req, function (err, fields, files) {

        var studentName = fields.studentName[0];
        var sex = fields.sex[0];
        var class1 = fields.class[0];
        var from = fields.from[0];
        var age = fields.age[0];
        // 这个id是前端传过来的，用来在护具库里查找
        var _id = fields._id[0];

        if (files.pic && files.pic[0]) { //如果上传了图片

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

            fs.rename(files.pic[0].path, form.uploadDir + "/" + orgFilename, function (err) {
                if (err) throw err;
                // 先删除原来图片
                studentMethod.findStudentById(_id, function (dbStudent) {
                    if (dbStudent.picUrl && dbStudent.picUrl != picUrl) {
                        fs.unlinkSync("." + dbStudent.picUrl); //删除图片
                    }
                    studentMethod.updateStudent(_id, student, function (n) {
                        if (n > 0) {
                            res.json({
                                status: 200,
                                message: '修改成功'
                            });

                        } else {
                            res.json({
                                status: 200,
                                message: '未修改任何数据'
                            });
                        }
                    });
                });
            });
        } else { //没有上传图片情况

            var student = {
                studentName: studentName,
                sex: sex,
                age: age,
                class: class1,
                from: from,
            };
            // console.log(student);

            studentMethod.updateStudent(_id, student, function (n) {
                if (n > 0) {
                    res.json({
                        status: 200,
                        message: '修改成功'
                    });

                } else {
                    res.json({
                        status: 200,
                        message: '未修改任何数据'
                    });
                }
            });
        }
    });
});

module.exports = router;