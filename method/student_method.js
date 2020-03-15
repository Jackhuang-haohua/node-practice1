// 引入mongodb方法
var mongoDao = require('../dao/mongoDao.js');

// 获取时间的插件
var sd = require('silly-datetime');

// mongodb数据库中，表的名称
var collectionName = "t_student";

// findAllStudent()执行后，得到findAll()的值，
// 这个返回值实际上是mongoDao.js中findAll方法得到的值
function findAllStudent(callback) {
    mongoDao.findAll(collectionName, function (StudentList) {
        callback(StudentList);
    });
}

// 根据id查询
function findStudentById(id, callback) {
    mongoDao.findById(collectionName, id, function (Student) {
        callback(Student);
    });
}

// 增
function addStudent(Student, callback) {
    // 时间
    Student.createtime = sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    mongoDao.insertOne(collectionName, Student, function (n) {
        if (callback) {
            callback(n);
        }
    });
}

// 改
function updateStudent(id, Student, callback) {
    mongoDao.updateById(collectionName, id, Student, function (n) {
        callback(n);
    });
}

// 删
function deleteStudentById(id, callback) {
    mongoDao.deleteById(collectionName, id, function (n) {
        callback(n);
    });
}

// 查询
function findStudent(obj, callback) {
    mongoDao.find(collectionName, obj, function (Student) {
        callback(Student);
    });
}

//测试demo
// var express = require("express")
// var app = express()
// app.listen(3000, function () {
//     console.log("正在监听3000");
// })
// app.get("/", (req, res, next) => {
//     console.log("进入3000端口");
//     findStudent({
//         sex: /男/,
//         age: /22/
//     }, function (list) {
//         console.log(list);

//     });
//     res.end()
// })

module.exports = {
    findAllStudent,
    findStudentById,
    addStudent,
    updateStudent,
    deleteStudentById,
    findStudent,
};