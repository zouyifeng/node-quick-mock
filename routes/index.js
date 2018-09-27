
module.exports = function(app) {
	app.use('/', require('./list'));
	app.use('/', require('./detail'));
	app.use(function(req, res, next) {
		var err = new Error('Not Found')
		err.status = 404;
		next(err);
	});
	app.use(function(err, req, res, next){
		// res.status(404).send('页面不存在，正在为您跳转到首页~')
		res.header("access-control-allow-credentials", true);
		res.header("Access-Control-Allow-Origin", "http://localhost:8888");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		res.redirect('/list');
	})
}; 