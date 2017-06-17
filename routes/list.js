var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var util = require('../common/utils');

//接口首页
router.get('/list', (req, res) => {
	util.getProjectList()
		.then((response) => {
			response = JSON.parse(response);
			if (response.dataList) {
				res.render('project_list', {
					haveList: true,
					dataList: response.dataList,
					page: 'list'
				})
			} else {
				res.render('project_list', {
					haveList: false,
					dataList: [],
					page: 'list'
				})
			}
		})
		.catch((response) => {
			res.render('project_list', {
				haveList: false,
				dataList: [],
				page: 'list'
			})
		})
})

router.post('/list/create', (req, res) => {

	var name = req.body.name;
	var url = req.body.url;
	var desc = req.body.desc;

	util.mkdirSync('./json/' + name)

	util.getProjectList()
		.then(function (response) {
			var temp = JSON.parse(response);
			var list = temp.dataList;
			for(var i = 0; i< list.length; i++){
				if(name == list[i].name) {
					res.status(500).json({msg: '项目重复！'}).end();
					return ;
				}
			}
			temp.dataList.push({
				name: name,
				url: url,
				desc: desc
			});
			res.status(200).json({msg: '创建成功！'}).end();			
			util.writeProjectList(JSON.stringify(temp))
		})
		// res.redirect('/list')
})

router.post('/list/delete', (req, res) => {
	var name = req.body.name;
	// readPromise(PROJECT_LIST)
	util.getProjectList()
		.then(function(response){
			var temp = JSON.parse(response);
			temp.dataList = temp.dataList.filter(function(item){
				return item.name != name;
			});
			util.writeProjectList(JSON.stringify(temp));
			util.deleteFolder('./json/' + name);
		});

	// readPromise(PROJECT_DETAIL)
	util.getProjectDetail()
		.then(function(response){
			var temp = JSON.parse(response);
			temp.dataList = temp.dataList.filter(function(item){
				return item.project != name;
			});
			util.writeProjectDetail(JSON.stringify(temp));
		});

	res.json({
		code: 2000,
		msg: '删除成功！'	
	})
})

router.get('/list/download/:projectName', (req, res) => {
	var projectName = req.params.projectName;
	var pathName = path.resolve(__dirname, '../json/');

	console.log(projectName)
	console.log(pathName)

	var options = {
		root: pathName,
	}

	res.sendFile(projectName, options, function(err){
		console.log(err)
	})

	// res.download(pathName, projectName);
	// res.download('')
})

module.exports = router;