var express = require('express');
var fs = require('fs');
var router = express.Router();
var readPromise = require('../common/utils').getReadPromise
var mkdirSync = require('../common/utils').mkdirSync

const PROJECT_LIST = './common/jsonfile/projectList.json'
const PROJECT_DETAIL = './common/jsonfile/projectDetail.json'

//接口首页
router.get('/list', (req, res) => {

	readPromise(PROJECT_LIST)
		.then((response) => {
			response = JSON.parse(response);
			if (response.projectList) {
				res.render('project_list', {
					haveList: true,
					projectList: response.projectList
				})
			} else {
				res.render('project_list', {
					haveList: false,
					projectList: []
				})
			}
		})
		.catch((response) => {
			res.render('project_list', {
				haveList: false,
				projectList: []
			})
		})
})

router.post('/list/create', (req, res) => {

	var name = req.body.name;
	var url = req.body.url;

	mkdirSync('./public/jsonfile/' + name)

	readPromise(PROJECT_LIST)
		.then(function (response) {
			var temp = JSON.parse(response);
			temp.projectList.push({
				name: name,
				url: url
			});
			fs.writeFileSync(PROJECT_LIST, JSON.stringify(temp))
		})

	res.redirect('/list')
})

//搜索接口
router.get('/search/:keyword', (req, res) => {
	var keyword = req.params.keyword.replace(/\s/g, ""),
		jsonName = './public/jsonfile/ajaxapilist.json';
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
		jsonName = './public/jsonfile/ajaxapilist.json',
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