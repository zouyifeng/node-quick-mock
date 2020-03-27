# node-quick-mock
[![NPM version][npm-image]][npm-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![npm license][license-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/node-quick-mock.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-quick-mock
[node-image]: https://img.shields.io/badge/node.js-%3E=_8.7.0-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/node-quick-mock.svg?style=flat-square
[download-url]: https://npmjs.org/package/node-quick-mock
[license-image]: https://img.shields.io/npm/l/node-quick-mock.svg

基于Express的快速mock平台，sqlite数据库，启动后即可实现本地mock接口数据。通过接口url,返回对应接口json数据。通过[npm包](https://www.npmjs.com/package/node-quick-mock)在作为项目依赖，方便多成员协作。


# start

``` bash
# install dependencies
npm install

# 访问localhost:8084/list
npm start
```

# feature
* 支持保存多个项目的接口数据
* 根据接口名称或url模糊查询接口
* 支持重新编辑以保存接口
* 创建接口后以json文件保存在本地，不同项目的接口数据，放在不同的目录下
* 编辑接口数据实时预览及错误提示


# Screenshot

### add new project
输入项目名称，项目url（可以理解为，对于区分不同项目的特定字符串），项目描述。

![新增项目](https://img-1253403808.cos.ap-chengdu.myqcloud.com/github/node-quick-mock-project-add.png)


### project list
项目面板，展示已存在的所有项目。


![项目列表](https://img-1253403808.cos.ap-chengdu.myqcloud.com/github/project-list.png)


### add API mock data
选择一个项目后，可以查看该项目下的接口信息和为该项目添加接口。

![项目添加接口](https://img-1253403808.cos.ap-chengdu.myqcloud.com/github/node-quick-mock-project-deatil.png)


### edit mock data
输入接口名称和接口URL，将相对应json数据输入左侧，同时右侧预览json数据格式是否合法，下方填入此接口的备注说明。

![编辑接口](https://img-1253403808.cos.ap-chengdu.myqcloud.com/github/屏幕快照%202020-03-27%2016.55.33.png)


### API list
可以查看项目中有哪些接口，如果接口过多，支持接口的模糊查询。


![接口列表](https://img-1253403808.cos.ap-chengdu.myqcloud.com/github/屏幕快照%202020-03-27%2016.56.20.png)


### postman verify it works
利用postman，验证Mock Server可以将数据真实有效的返回


![postman验证接口有效](https://img-1253403808.cos.ap-chengdu.myqcloud.com/github/屏幕快照%202020-03-27%2016.58.33.png)

# License
MIT License


