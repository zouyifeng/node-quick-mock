/*
 * GET home page.
 */

let fs = require('fs')

let saveName = (name, url, idDel) => {
	//存储文件名和url到ajaxapilist文件
	let jsonName = './public/jsonfile/ajaxapilist.json',
		readPromise = new Promise((resolve, reject) => {
			let ret = fs.readFileSync(jsonName);
			ret ? resolve(ret) : reject();
			// resolve(fs.readFileSync(jsonName))
		});

	let _writePromise = new Promise((resolve, reject) => {
		readPromise.then((response) => {
			let list = JSON.parse(response).dataList,
				new_arr = idDel ? [] : [{
					"name": name,
					"url": url
				}]; //如果是删除则不需要这个新的数据
			//合并json
			if (list) {
				for (let i = 0; i < list.length; i++) {
					//比较url，url不能重复
					if (url != list[i].url) {
						new_arr.push(list[i])
						continue;
					}
				}
			}
			resolve(fs.writeFileSync(jsonName, JSON.stringify({
				"warn": "存放所有的关系表，建议不要手动修改",
				"dataList": new_arr
			})))
		}).catch((response) => {
			resolve(fs.writeFileSync(jsonName, JSON.stringify({
				"warn": "存放所有的关系表，建议不要手动修改",
				"dataList": [{
					"name": name,
					"url": url
				}]
			})))
		})
	})

}

module.exports = app => {
	//接口首页
	app.get('/', (req, res) => {
		let jsonName = './public/jsonfile/ajaxapilist.json';
		let readPromise = new Promise((resolve, reject) => {
			let ret = fs.readFileSync(jsonName);
			ret ? resolve(ret) : reject(ret);

			// resolve(fs.readFileSync(jsonName))
		});

		readPromise
			.then((response) => {
				response = JSON.parse(response);
				if (response.dataList) {
					res.render('index', {
						haveList: true,
						list: response.dataList
					})
				} else {
					res.render('index', {
						haveList: false,
						list: []
					})
				}
			})
			.catch((response) => {
				res.render('index', {
					haveList: false,
					list: []
				})
			})
	})
	//获取一个数据文件
	app.get('/getjson/:jsonUrl', (req, res) => {
		//文件名称
		console.log(jsonUrl)
		let jsonUrl = req.params.jsonUrl,
			jsonName = './public/jsonfile/' + jsonUrl + '.json';
		let readPromise = new Promise((resolve, reject) => {
			resolve(fs.readFileSync(jsonName))
		});
		readPromise.then((response) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
			res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
			res.json(JSON.parse(JSON.parse(response).detail))
		}).catch((response) => {
			res.render('noresult')
		})
	})

	app.post('/getjson/:jsonUrl', function (req, res) {
		console.log(req.params.jsonUrl)
		let jsonUrl = req.params.jsonUrl,
			jsonName = './public/jsonfile/' + jsonUrl + '.json';
		let readPromise = new Promise((resolve, reject) => {
			resolve(fs.readFileSync(jsonName))
		});
		readPromise.then((response) => {
			res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
			res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
			res.json(JSON.parse(JSON.parse(response).detail))
		}).catch((response) => {
			res.render('noresult')
		})
	})
	//创建接口页面
	app.get('/create', (req, res) => {
		res.render('create', {
			isEdit: false
		})
	})
	//存储json
	app.post('/save', (req, res) => {
		//文件名称 是url 英文。便于调用 ；fileName只是描述内容
		let fileName = req.body.name.replace(/\s/g, ""),
			jsonUrl = req.body.url.replace(/\s/g, ""),
			jsonString = req.body.data,
			jsonName = './public/jsonfile/' + jsonUrl + '.json';
		if (fileName && jsonUrl) {
			let readPromise = new Promise((resolve, reject) => {
				resolve(fs.writeFileSync(jsonName, jsonString))
			});
			//把新的关系表保存到ajaxapilist
			saveName(fileName, jsonUrl)
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
	app.get('/edit/:jsonUrl', (req, res) => {
		//文件名称其实就是url最后的参数
		let jsonUrl = req.params.jsonUrl,
			jsonName = './public/jsonfile/' + jsonUrl + '.json';
		if (!jsonUrl) {
			res.redirect('/')
		} else {
			let readPromise = new Promise((resolve, reject) => {
				resolve(fs.readFileSync(jsonName))
			});
			readPromise.then((response) => {
				res.render('create', {
					isEdit: true,
					stringValueJson: JSON.parse(response)
				})
			}).catch((response) => {
				res.render('noresult')
			})
		}
	})
	//搜索接口
	app.get('/search/:keyword', (req, res) => {
		let keyword = req.params.keyword.replace(/\s/g, ""),
			jsonName = './public/jsonfile/ajaxapilist.json';
		let readPromise = new Promise((resolve, reject) => {
			resolve(fs.readFileSync(jsonName))
		});
		readPromise.then((response) => {
			response = JSON.parse(response);
			if (response.dataList) {
				let list = response.dataList,
					new_arr = [];
				for (let i = 0; i < list.length; i++) {
					if (list[i].name.match(keyword) || list[i].url.match(keyword)) {
						new_arr.push(list[i])
					}
				}
				if (new_arr.length) {
					res.render('index', {
						haveList: true,
						list: new_arr
					})
				} else {
					res.render('index', {
						haveList: false,
						list: []
					})
				}
			} else {
				res.render('index', {
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
	app.get('/repeat', (req, res) => {
		let apiurl = req.query.apiurl.replace(/\s/g, ""),
			jsonName = './public/jsonfile/ajaxapilist.json',
			readPromise = new Promise((resolve, reject) => {
				resolve(fs.readFileSync(jsonName))
			});
		readPromise.then((response) => {
			response = JSON.parse(response);
			if (response.dataList) {
				let list = response.dataList;
				for (let i = 0; i < list.length; i++) {
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
	//删除接口
	app.post("/delete", (req, res) => {
		let jsonUrl = req.body.url.replace(/\s/g, ""),
			jsonName = './public/jsonfile/' + jsonUrl + '.json',
			del = new Promise((resolve, reject) => {
				resolve(fs.unlinkSync(jsonName))
			});
		saveName(jsonName, jsonUrl, true)
		del.then((response) => {
			console.log('ok')
			res.json({
				code: 0,
				success: true
			})
		}).catch((e) => {
			console.log(e)
			res.json({
				code: 1,
				success: false,
				info: e
			})
		})
	})
}