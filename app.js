/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes/index')
  , bodyParser = require('body-parser')
  , partials = require('express-partials')
  , path = require('path')
  , app = express()
  , fs = require('fs')
  , path = require('path')
  , cors = require('cors');

try {
  fs.accessSync(`${process.cwd()}/mock_db/app.sqlite`, fs.F_OK)
  console.log('connecting the mock database')    
} catch (e) {
  fs.mkdirSync('mock_db')
  fs.copyFileSync(path.resolve(__dirname, `./db/app.sqlite`), `${process.cwd()}/mock_db/app.sqlite`, function(err) {
      if (err) {
          console.log('create mock database failed.')
      } else {
          console.log('create mock database successfully.')
      }
  })
}

// Configuration
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/views'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
app.use(cors());
// app.use(express.Router(routes)); //自动解析url

routes(app);

module.exports = app;
// console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
