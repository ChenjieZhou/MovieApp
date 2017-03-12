var express = require('express');
var port = process.env.PORT || 3000; //get enviroment and parameters
var app = express();  // web server

app.set('views','./views'); // root
app.set('view engine', 'jade');
app.listen(port);


console.log('start on port' + port);   // test the server

//index page
app.get('/', function(req, res){
  res.render('index',{
    title: 'Movie App'
  });
});

app.get('/movie/:id', function(req, res){
  res.render('detail',{
    title: 'This is detail'
  });
});

app.get('/admin/movie', function(req, res){
  res.render('admin',{
    title: 'This is admin'
  });
});

app.get('/admin/list', function(req, res){
  res.render('list',{
    title: 'This is list'
  });
});
