# node-quick-mock
基于Express的快速mock平台，sqlite数据库，启动后即可实现本地mock接口数据。通过接口url,返回对应接口json数据。通过[npm包](https://www.npmjs.com/package/node-quick-mock)在作为项目依赖，方便多成员协作。

感兴趣的话，可以给个Star支持下。

## 启动

``` bash
# install dependencies
npm install

# 访问localhost:8084/list
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
输入项目名称，项目url（可以理解为，对于区分不同项目的特定字符串），项目描述。

![新增项目](http://img.zouyifeng.cn/qm2.png)


### 项目列表
项目面板，展示已存在的所有项目。

![项目列表](http://img.zouyifeng.cn/qm1.png)


### 项目添加接口
选择一个项目后，可以查看该项目下的接口信息和为该项目添加接口。

![项目添加接口](http://img.zouyifeng.cn/qm3.png)


### 编辑接口
输入接口名称和接口URL，将相对应json数据输入左侧，同时右侧预览json数据格式是否合法，下方填入此接口的备注说明。

![编辑接口](http://img.zouyifeng.cn/qm4.png)


### 接口列表
可以查看项目中有哪些接口，如果接口过多，支持接口的模糊查询。

![接口列表](http://img.zouyifeng.cn/qm3.png)


### postman验证接口有效
利用postman，验证Mock Server可以将数据真实有效的返回

![postman验证接口有效](http://img.zouyifeng.cn/qm5.png)