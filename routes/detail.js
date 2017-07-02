var fs = require('fs')
var express = require('express')
var router = express.Router()
var util = require('../common/utils')

var saveName = (project, name, url, idDel) => {
    var _writePromise = new Promise((resolve, reject) => {
        util.getProjectDetail()
            .then((response) => {
                var list = JSON.parse(response).dataList,
                    new_arr = idDel ? [] : [{
                        "name": name,
                        "url": url,
                        "project": project
                    }]; 
                if (list) {
                    for (var i = 0; i < list.length; i++) {
                        //比较url，url不能重复
                        if (url != list[i].url) {
                            new_arr.push(list[i])
                            continue;
                        }
                    }
                }
                resolve(util.writeProjectDetail(JSON.stringify({
                    "dataList": new_arr
                })))
            }).catch((response) => {
                resolve(util.writeProjectDetail(JSON.stringify({
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

    var projectName = req.params.projectName
    util.getProjectDetail()
        .then((response) => {
            var response = JSON.parse(response).dataList;
            var ret = response.filter((item, index) => {
                return item.project === projectName;
            })

            res.render('project_detail', {
                haveList: true,
                list: ret,
                project: projectName,
                page: 'list'
            })

        })
})

//存储json
router.post('/detail/save', (req, res) => {
    var fileName = req.body.name.replace(/\s/g, ""),
        jsonUrl = req.body.url.replace(/\s/g, ""),
        project = req.body.project.replace(/\s/g, ""),
        jsonString = req.body.data,
        jsonName = './json/' + jsonUrl + '.json';

    var tempArr = jsonUrl.split('/')
    tempArr.pop();

    util.mkdirSync('./json/' + tempArr.join('/'));

    if (fileName && jsonUrl) {
        var readPromise = new Promise((resolve, reject) => {
            resolve(fs.writeFileSync(jsonName, jsonString));
        });
        saveName(project, fileName, jsonUrl)
            res.json({
                success: true,
                message: "保存成功"
            })
    } else {
        res.json({
            success: false,
            message: "名称或url不能为空"
        })
    }
})

//编辑接口页面
router.get('/detail/edit/*', (req, res) => {
    var jsonName = './json/' + req.params[0] + '.json';
    var projectName = req.params[0].split('/')[0];

    if (!req.params[0]) {
        res.redirect('/')
    } else {
        util.getReadPromise(jsonName)
            .then((response) => {
                res.render('create', {
                    isEdit: true,
                    stringValueJson: JSON.parse(response),
                    project: projectName
                })
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
           msg : '删除成功！'
        })
    }).catch((e) => {
        res.status(500).json({
            msg: '删除出错！'
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

// 查询
router.post('/detail/search', (req, res) => {
    var url = req.body.url;
    var projectName = req.body.project;
    // res.redirect('/list');
    // res.status(404).end()
    util.getProjectDetail()
        .then((response)=>{
            var temp = JSON.parse(response).dataList;
            var ret = temp.filter((item, index) => {
                return item.url.indexOf(url) != -1 && item;
            })
            res.json({
                haveList: true,
                list: ret
            })
        })
})

//获取一个数据文件
router.all('/api/*', (req, res) => {
    //文件名称
    var jsonName = './json/' + req.params[0] + '.json';

    util.getReadPromise(jsonName)
        .then((response) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DEvarE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.json(JSON.parse(JSON.parse(response).detail))
        }).catch((response) => {
            res.status(404);
        })
})

module.exports = router;