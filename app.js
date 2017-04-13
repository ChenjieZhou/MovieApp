var express = require('express'); //load express
var port = process.env.PORT || 3000; //get enviroment and parameters
var app = express();  // web server
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var path = require('path');

var session = require('express-session');

var mongoose  = require('mongoose');

var logger = require('morgan');

var MongoStore = require('connect-mongo')(session);

var dbUrl = 'mongodb://localhost/movieapp'

mongoose.connect('mongodb://localhost/movieapp');

app.set('views','./app/views/pages'); // root
app.set('view engine', 'pug');

app.locals.moment = require('moment');
app.use(serveStatic('public'));
app.use(bodyParser.urlencoded());
app.listen(port);

app.use(session({

  secret: 'foo',

   store: new MongoStore({
     url: dbUrl,
     collection: 'session'
   })
}));


if ('development' === app.get('env')) {
  app.set('showStackError', true);
  app.use(logger(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug', true);
}


require('./config/routes')(app);



console.log('start on port' + port);   // test the server
