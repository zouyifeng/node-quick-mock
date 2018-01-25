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
`node-quick-mock` is a web tool that allows web application developers to rapidly generate API mock data and run API services to enable front-end developers in writing and testing their front-end code, which is based on `Express` and `sqlite`

基于Express的快速mock平台，sqlite数据库，启动后即可实现本地mock接口数据。通过接口url,返回对应接口json数据。通过[npm包](https://www.npmjs.com/package/node-quick-mock)在作为项目依赖，方便多成员协作。


If you are interested, you can give a Star support.[github](https://github.com/zouyifeng/node-quick-mock)

感兴趣的话，可以给个Star支持下。

## start

``` bash
# install dependencies
npm install

# 访问localhost:8084/list
npm start
```

## feature
* 支持保存多个项目的接口数据
* 根据接口名称或url模糊查询接口
* 支持重新编辑以保存接口
* 创建接口后以json文件保存在本地，不同项目的接口数据，放在不同的目录下
* 编辑接口数据实时预览及错误提示


* Support for saving interface data for multiple projects
* According to the interface name or url fuzzy query interface
* Supports re-editing to save the interface
* After creating the interface to save the json file in the local, interface data of different projects, on a different directory
* Edit interface data real-time preview and error message

## Screenshot

### add new project
输入项目名称，项目url（可以理解为，对于区分不同项目的特定字符串），项目描述。

Enter the project name, the project url (which can be understood as a specific string that distinguishes between different projects), the project description.


![新增项目](http://img.zouyifeng.cn/qm2.png)


### project list
项目面板，展示已存在的所有项目。

Project panel, showing all existing projects.


![项目列表](http://img.zouyifeng.cn/qm1.png)


### add API mock data
选择一个项目后，可以查看该项目下的接口信息和为该项目添加接口。

After you select a project, you can view the interface information under the project and add an interface for the project.


![项目添加接口](http://img.zouyifeng.cn/qm3.png)


### edit mock data
输入接口名称和接口URL，将相对应json数据输入左侧，同时右侧预览json数据格式是否合法，下方填入此接口的备注说明。

Enter the name of the interface and the interface URL, the corresponding json data input on the left, while the right preview json data format is legal, fill in the bottom of this interface notes.

![编辑接口](http://img.zouyifeng.cn/qm4.png)


### API list
可以查看项目中有哪些接口，如果接口过多，支持接口的模糊查询。

You can see which interfaces are in the project. If there are too many interfaces, support fuzzy queries for interfaces.


![接口列表](http://img.zouyifeng.cn/qm3.png)


### postman verify it works
利用postman，验证Mock Server可以将数据真实有效的返回

Use postman, verify Mock Server can return the data true and effective

![postman验证接口有效](http://img.zouyifeng.cn/qm5.png)

## License
MIT License


