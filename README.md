# QuickMock
基于Express的快速mock平台，无需配置数据库，启动后即可实现本地mock接口数据。通过接口url,返回对应接口json数据。

感兴趣的话，可以给个Star支持下，[点我](https://github.com/zouyifeng/QuickMock)~

## 启动

``` bash
# install dependencies
npm install

# 访问localhost:3000/list
npm start
```

## 功能
* 支持保存多个项目的接口数据
* 根据接口名称或url模糊查询接口
* 支持重新编辑以保存接口
* 创建接口后以json文件保存在本地，不同项目的接口数据，放在不同的目录下
* 编辑接口数据实时预览及错误提示


## 预览

### 新增项目
![新增项目](http://7xo8y0.com1.z0.glb.clouddn.com/quickmock1.png)


### 项目列表
![项目列表](http://7xo8y0.com1.z0.glb.clouddn.com/quickmock2.png)


### 项目添加接口
![项目添加接口](http://7xo8y0.com1.z0.glb.clouddn.com/quickmock3.png)


### 编辑接口
![编辑接口](http://7xo8y0.com1.z0.glb.clouddn.com/quickmock4.png)


### 编辑接口完成
![编辑接口完成](http://7xo8y0.com1.z0.glb.clouddn.com/quickmock5.png)


### 接口列表
![接口列表](http://7xo8y0.com1.z0.glb.clouddn.com/quickmock6.png)


### postman验证接口有效
![postman验证接口有效](http://7xo8y0.com1.z0.glb.clouddn.com/quickmock7.png)