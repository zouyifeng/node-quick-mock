var express = require('express');
var fs = require('fs');
var router = express.Router();
// var readPromise = require('../common/utils').getReadPromise
// var mkdirSync = require('../common/utils').mkdirSync
// var deleteFolder = require('../common/utils').deleteFolder

// import * as util from '../common/utils'
var util = require('../common/utils')

// const PROJECT_LIST = './json/projectList.json'
// const PROJECT_DETAIL = './json/projectDetail.json'

//接口首页
router.get('/list', (req, res) => {

	// readPromise(PROJECT_LIST)

	util.getProjectList()
		.then((response) => {
			response = JSON.parse(response);
			if (response.dataList) {
				res.render('project_list', {
					haveList: true,
					dataList: response.dataList
				})
			} else {
				res.render('project_list', {
					haveList: false,
					dataList: []
				})
			}
		})
		.catch((response) => {
			res.render('project_list', {
				haveList: false,
				dataList: []
			})
		})
})

router.post('/list/create', (req, res) => {

	var name = req.body.name;
	var url = req.body.url;
	var desc = req.body.desc;

	util.mkdirSync('./json/' + name)

	// readPromise(PROJECT_LIST)
	util.getProjectList()
		.then(function (response) {
			var temp = JSON.parse(response);
			temp.dataList.push({
				name: name,
				url: url,
				desc: desc
			});
			util.writeProjectList(JSON.stringify(temp))
		})

	res.redirect('/list')
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
		code: 0
	})
})

//搜索接口
router.get('/search/:keyword', (req, res) => {
	var keyword = req.params.keyword.replace(/\s/g, ""),
		jsonName = './json/ajaxapilist.json';
	var readPromise = new Promise((resolve, reject) => {
		resolve(fs.readFileSync(jsonName))
	});
	readPromise.then((response) => {
		response = JSON.parse(response);
		if (response.dataList) {
			var list = response.dataList,
				new_arr = [];
			for (var i = 0; i < list.length; i++) {
				if (list[i].name.match(keyword) || list[i].url.match(keyword)) {
					new_arr.push(list[i])
				}
			}
			if (new_arr.lefngth) {
				res.render('project', {
					haveList: true,
					list: new_arr
				})
			} else {
				res.render('project', {
					haveList: false,
					list: []
				})
			}
		} else {
			res.render('project', {
				haveList: false,
				list: []
			})
		}
	}).catch((response) => {
		res.render('index', {
			haveList: false,
			list: []
		})
	})
})
//判断是否重复
router.get('/repeat', (req, res) => {
	var apiurl = req.query.apiurl.replace(/\s/g, ""),
		jsonName = './json/ajaxapilist.json',
		readPromise = new Promise((resolve, reject) => {
			resolve(fs.readFileSync(jsonName))
		});
	readPromise.then((response) => {
		response = JSON.parse(response);
		if (response.dataList) {
			var list = response.dataList;
			for (var i = 0; i < list.length; i++) {
				if (list[i].url == apiurl) {
					res.json({
						repeat: true,
						success: true
					});
					return
				}
			}
			res.json({
				repeat: false,
				success: true
			})
		} else {
			res.json({
				repeat: false,
				success: true
			})
		}
	}).catch((response) => {
		res.json({
			repeat: false,
			success: true
		})
	})
})

module.exports = router;