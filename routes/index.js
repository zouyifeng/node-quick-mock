/*
 * GET home page.
 */
var express = require('express')
var app = express();
var list = require('../controllers/list')
var detail = require('../controllers/detail')

app.use('/project', list)
app.use('/detail', detail)
app.use(function(req, res, next){
	res.send('找不到页面，oops~')
})

module.exports = app ; 