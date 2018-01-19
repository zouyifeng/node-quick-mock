var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
var util = require('../common/utils');

var project = require('../models/projects')
var api = require('../models/apis')

//接口首页
router.get('/list', (req, res) => {
	project.selectAllProject().then(list => {
		if (list.length > 0) {
			res.render('project_list', {
				haveList: true,
				dataList: list,
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

	project.addProject(req.body).then(function () {
		res.status(200).json({msg: '创建成功！'}).end()
	})
})

router.post('/list/delete', (req, res) => {
	var id = req.body.id;

	api.deleteProjectApis(id)
	project.deleteProject(id)

	res.json({
		code: 2000,
		msg: '删除成功！'	
	})
})

router.get('/list/download/:projectName', (req, res) => {
	var projectName = req.params.projectName;
	var pathName = path.resolve(__dirname, '../json/');

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