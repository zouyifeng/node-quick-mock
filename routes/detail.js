var fs = require('fs')
var express = require('express')
var router = express.Router()
// var readPromise = require('../common/utils').getReadPromise
// var mkdirSync = require('../common/utils').mkdirSync

// import * as util from '../common/utils'

var util = require('../common/utils')


// const PROJECT_LIST = './json/projectList.json'
// const PROJECT_DETAIL = './json/projectDetail.json'


var saveName = (project, name, url, idDel) => {
    //存储文件名和url到ajaxapilist文件
    var _writePromise = new Promise((resolve, reject) => {
        // readPromise(PROJECT_DETAIL)
        util.getProjectDetail()
            .then((response) => {
                var list = JSON.parse(response).dataList,
                    new_arr = idDel ? [] : [{
                        "name": name,
                        "url": url,
                        "project": project
                    }]; //如果是删除则不需要这个新的数据
                //合并json
                if (list) {
                    for (var i = 0; i < list.length; i++) {
                        //比较url，url不能重复
                        if (url != list[i].url) {
                            new_arr.push(list[i])
                            continue;
                        }
                    }
                }
                resolve(fs.writeFileSync(PROJECT_DETAIL, JSON.stringify({
                    "dataList": new_arr
                })))
            }).catch((response) => {
                resolve(fs.writeFileSync(PROJECT_DETAIL, JSON.stringify({
                    "dataList": [{
                        "name": name,
                        "project": project,
                        "url": url
                    }]
                })))
            })
    })
}

router.get('/detail/:projectName', (req, res) => {

    // console.log(req.params.projectName)    
    var projectName = req.params.projectName
    // readPromise(PROJECT_DETAIL)
    util.getProjectDetail()
        .then((response) => {
            var response = JSON.parse(response).dataList;
            var ret = response.filter((item, index) => {
                return item.project === projectName;
            })

            res.render('project_detail', {
                haveList: true,
                list: ret,
                project: projectName
            })
        })
})

//存储json
router.post('/detail/save', (req, res) => {
    //文件名称 是url 英文。便于调用 ；fileName只是描述内容
    var fileName = req.body.name.replace(/\s/g, ""),
        jsonUrl = req.body.url.replace(/\s/g, ""),
        project = req.body.project.replace(/\s/g, ""),
        jsonString = req.body.data,
        jsonName = './json/' + jsonUrl + '.json';

    var tempArr = jsonUrl.split('/')
    tempArr.pop();

    mkdirSync('./json/' + tempArr.join('/'));

    if (fileName && jsonUrl) {
        var readPromise = new Promise((resolve, reject) => {
            resolve(fs.writeFileSync(jsonName, jsonString));
        });
        //把新的关系表保存到ajaxapilist
        saveName(project, fileName, jsonUrl)
        readPromise.then((response) => {
            res.json({
                success: true,
                message: "保存成功"
            })
        }).catch((response) => {
            res.json({
                success: false,
                message: response
            })
        })
    } else {
        //后台加一道拦截，防止没有文件名和url
        res.json({
            success: false,
            message: "名称或url不能为空"
        })
    }

})

//编辑接口页面
router.get('/detail/edit/*', (req, res) => {
    //文件名称其实就是url最后的参数
    var jsonName = './json/' + req.params[0] + '.json';

    var projectName = req.params[0].split('/')[0];


    if (!req.params[0]) {
        res.redirect('/')
    } else {
        readPromise(jsonName)
            .then((response) => {
                res.render('create', {
                    isEdit: true,
                    stringValueJson: JSON.parse(response),
                    project: projectName
                })
            }).catch((response) => {
                res.render('noresult')
            })
    }
})

//删除接口
router.post("/detail/delete", (req, res) => {
    var jsonUrl = req.body.url.replace(/\s/g, ""),
        jsonName = './json/' + jsonUrl + '.json',
        del = new Promise((resolve, reject) => {
            resolve(fs.unlinkSync(jsonName))
        });

    saveName('', jsonName, jsonUrl, true);

    del.then((response) => {
        res.json({
            code: 0,
            success: true
        })
    }).catch((e) => {
        res.json({
            code: 1,
            success: false,
            info: e
        })
    })
})

//创建接口页面
router.get('/detail/:projectName/create', (req, res) => {
    var projectName = req.params.projectName
    res.render('create', {
        isEdit: false,
        project: projectName
    })
})

//获取一个数据文件
router.get('/api/*', (req, res) => {
    //文件名称
    var jsonName = './json/' + req.params[0] + '.json';

    readPromise(jsonName)
        .then((response) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DEvarE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.json(JSON.parse(JSON.parse(response).detail))
        }).catch((response) => {
            res.status(404);
            res.json({
                msg: 'no_result'
            });
        })
})

module.exports = router;