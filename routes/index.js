
module.exports = function(app) {
	app.use('/', require('./list'))
	app.use('/', require('./detail'))
}; 