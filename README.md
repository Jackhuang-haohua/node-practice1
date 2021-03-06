# 使用node.js制作的，简易学生管理系统，包含增删改查功能
![image](https://github.com/Jackhuang-haohua/node-practice1/blob/master/readmeImg/list.png)

## 项目介绍

**功能：**
- 添加信息
- 删除信息
- 修改信息
- 多条件匹配，查询信息

**项目结构：**
- dao：mongodb依赖，以及封装的操作数据库的方法
- lib：需要引用的js和css文件
- method：使用mongodb依赖方法封装的，操作表格学生信息表格的方法
- node_modules：插件
- router：路由
- upload：上传照片的存储位置
- views：用来渲染的ejs文件
- app.js：出口文件
- 注readmeImg为无关文件，是这个readme的图片

![image](https://github.com/Jackhuang-haohua/node-practice1/blob/master/readmeImg/jiegou.png)

**所用技术栈：**
- bootstrap、jquery
- node依赖：MongoDB(mongo依赖)、ejs(后端渲染)、silly-datetime(获取时间)、multiparty(文件上传)、fs模块

**使用方法：**
- 需要mongoDB
- clone本仓库，在(vscode)编辑器打开
- 打开命令行，输入 `nodemon app.js`
- 在网页打开 http://localhost:3000/student_list 即可
