/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes/index')
  , bodyParser = require('body-parser')
  , partials = require('express-partials');

module.exports = app = express();

// Configuration

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
// app.set('views', './views')
app.set('view engine', 'ejs');
app.use(partials());
// app.use(express.Router(routes)); //自动解析url

routes(app);

app.listen(3000);
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
