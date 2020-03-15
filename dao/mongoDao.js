//mongoDao.js    mongodb底层操作封装
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;

var dbUrl = "mongodb://localhost:27017/"; // 数据库url
var dbName = "myDB1"; //库名

//可选的连接选项 options
var dbOption = {
    poolSize: 5, //连接池大小缺省值为5
};

var dbo;

// 链接数据库
(function () {
    MongoClient.connect(dbUrl, dbOption, function (err, client) {
        if (err) {
            throw err;
        }
        dbo = client.db(dbName);
        // console.log("dbo对象：");
        // console.log(dbo);
    });
})();

/**
 * 查询
 * @param collectionName 集合名 表名
 * @param whereClause  条件字句 对象
 * @param callback 回调函数
 */
function find(collectionName, whereClause, callback) {
    dbo.collection(collectionName).find(whereClause).toArray(function (err, list) { // 返回集合中所有数据
        if (err) throw err;

        callback(list); //返回列表数据
    });
}

/**
 * 根据id查询
 * @param collectionName  集合名  表名
 * @param id   ObjectID
 * @param callback  回调函数
 */
function findById(collectionName, id, callback) {
    dbo.collection(collectionName).find({
        '_id': ObjectID(id)
    }).toArray(function (err, list) { // 返回集合中所有数据
        if (err) throw err;

        callback(list[0] || undefined); //返回列表中唯一的一条数据
    });
}

/**
 *查询所有
 * @param collectionName  集合名  表名
 * @param callback  回调函数
 */
function findAll(collectionName, callback) {
    dbo.collection(collectionName).find({}).sort({
        "createtime": -1
    }).toArray(function (err, list) { // 返回集合中所有数据
        if (err) throw err;

        callback(list); //返回列表数据
    });
}

/**
 * 插入一个文档
 * @param collectionName  集合名
 * @param insertObj   插入对象
 * @param callback options可选的回调函数，返回实际受影响的行数 n
 */
function insertOne(collectionName, insertObj, callback) {
    dbo.collection(collectionName).insertOne(insertObj, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            console.log(result.result.n + " 条数据被插入");
            callback(result.result.n); //返回实际受影响的行数 n
        }
    });
}

/**
 *插入多个文档
 * @param collection 集合名
 * @param insertArray  插入对象数组
 * @param callback  可选的回调函数， 可获得mongodb操作底层返回的result对象
 */
function insertMany(collectionName, insertArray, callback) {
    dbo.collection(collectionName).insertMany(insertArray, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            console.log(result.result.n + " 条数据被插入");
            callback(result.result.n); //返回实际受影响的行数 n
        }
    });
}

/**
 *更新一个文档
 * @param collectionName  集合名称
 * @param whereClause 条件字句对象
 * @param updateClause  一个update对象  $set
 * @param callback  可选的回调函数，得到实际被修改的文档的条数
 */
function updateOne(collectionName, whereClause, updateClause, callback) {
    updateClause = _getRidOffNonAttr(updateClause);
    // dbo.collection(collectionName).updateOne(whereClause, updateClause,function(err, result) {
    dbo.collection(collectionName).updateOne(whereClause, {
        $set: updateClause
    }, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            console.log(result.result.nModified + " 条数据被更新");
            callback(result.result.nModified); //n条文档被更新  返回数字
        }
    });
}

/**
 *根据id更新  文档
 * @param collectionName  集合名称
 * @param id  ObjectID
 * @param updateClause   一个update对象  $set
 * @param callback  选的回调函数，得到实际被修改的文档的条数
 */
function updateById(collectionName, id, updateClause, callback) {
    //  dbo.collection(collectionName).updateOne({'_id':ObjectID(id)}, updateClause,function(err, result) {
    dbo.collection(collectionName).updateOne({
        '_id': ObjectID(id)
    }, {
        $set: updateClause
    }, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            console.log(result.result.nModified + " 条数据被更新");
            callback(result.result.nModified); //n条文档被更新  返回数字
        }
    });
}

/**
 *更新多个文档
 * @param collectionName  集合名称
 * @param whereClause 条件字句对象
 * @param updateClause update对象  {$set: { "url" : "https://www.runoob.com" }};
 * @param callback  可选的回调函数，得到实际被修改的文档的条数
 */
function updateMany(collectionName, whereClause, updateClause, callback) {
    updateClause = _getRidOffNonAttr(updateClause);
    //     dbo.collection(collectionName).updateMany(whereClause, updateClause,function(err, result) {
    dbo.collection(collectionName).updateMany(whereClause, {
        $set: updateClause
    }, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            console.log(result.result.nModified + " 条数据被更新");
            callback(result.result.nModified); //n条文档被更新  返回数字
        }
    });
}

/**
 *删除匹配条件的第一条文档
 * @param collectionName
 * @param whereClause
 * @param callback
 */
function deleteOne(collectionName, whereClause, callback) {
    dbo.collection(collectionName).deleteOne(whereClause, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            console.log(result.result.n + " 条数据被删除");
            callback(result.result.n); //n条文档被删除  返回实际被删除的文档数量
        }
    });
}

/**
 * 根据id删除 一条文档
 * @param collectionName
 * @param id
 * @param callback
 */
function deleteById(collectionName, id, callback) {
    dbo.collection(collectionName).deleteOne({
        '_id': ObjectID(id)
    }, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            console.log(result.result.n + " 条数据被删除");
            callback(result.result.n); //n条文档被删除  返回实际被删除的文档数量
        }
    });
}

/**
 * 删除匹配条件的所有文档
 * @param collectionName
 * @param whereClause
 * @param callback
 */
function deleteMany(collectionName, whereClause, callback) {
    dbo.collection(collectionName).deleteMany(whereClause, function (err, result) {
        if (err) {
            throw err;
        }
        if (callback) {
            console.log(result.result.n + " 条数据被删除");
            callback(result.result.n); //n条文档被删除  返回实际被删除的文档数量
            //   console.log(result.result.n + " 条文档被删除");//
        }
    });
}


//测试demo
// var express = require("express")
// var app = express()
// app.listen(3000, function () {
//     console.log("正在监听3000");
// })
// app.get("/", (req, res, next) => {
//     // findAll('t_student', function (list) {
//     //     console.log(list);
//     // });

//     find("t_student", {
//         sex: /男/,
//         age: /22/
//     }, function (list) {
//         console.log('查询到数据list如下');
//         console.log(list);
//     });
//     res.end()
// })

// ok
// find("t_student", {
//     bookName: /测试/
// }, function (list) {
//     console.log('查询到数据list如下');
//     console.log(list);
// });


// ok
// findById("t_student", '5e6ca465482c5712b0d1dd8c', function (data) {
//     console.log('查询到数据如下');
//     console.log(data);
// });


//ok
// findAll('t_student', function (list) {
//     console.log(list);
// });

//ok
// insertOne('t_student',
//     {
//     studentName: '黄浩华',
//     sex: '男',
//     age: '22',
//     from: '广东',
//     class: 'GZ-1906',
//     createtime: '2018-02-22 20:10:10'
//     },function (n) {
//         console.log(n+" 条文档被插入");
//     });

//ok
// db.student.update({"name":"小明"},{$set:{"age":16}});
// updateById('t_student','5a90383caca822266c00edc4',{$set:{description:'22222'}},function (n) {
//
//     console.log(n+"条数据被更新");
// });

//ok
// deleteById('t_student','5a90383caca822266c00edc4',function (n) {
//     console.log(n+" 条文档被删除");
// });



module.exports = {
    find,
    findAll,
    findById,
    insertOne,
    insertMany,

    updateById,
    updateOne,
    updateMany,

    deleteById,
    deleteMany,
    deleteOne,

    ObjectID,
};