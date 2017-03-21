var express = require('express'); //load express
var port = process.env.PORT || 3000; //get enviroment and parameters
var app = express();  // web server
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose  = require('mongoose');
var Movie = require('./models/movie');
var _ = require('underscore');

mongoose.connect('mongodb://localhost/data')

app.set('views','./views/pages'); // root
app.set('view engine', 'pug');

app.use(serveStatic('bower_components'));
app.use(bodyParser.urlencoded());
app.listen(port);


console.log('start on port' + port);   // test the server

//index page
app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if (err) {
			console.log(err)
		}

		res.render('index',{
			title:'imovie 首页',
			movies:movies
		})
	})
})

//detail page
app.get('/movie/:id',function(req,res){
	var id = req.params.id

	Movie.findById(id, function(err,movie){
		if (err) {
			console.log(err)
		}
		res.render('detail',{
			title:'imovie' + movie.title,
			movie:movie
		})
	})

})

//admin page
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'imovie 后台录入页',
		movie:{
			title: '',
			doctor: '',
			country: '',
			year: '',
			language: '',
			summary: '',
			poster: '',
			flash: ''
		}
	})
})
//admin update movie
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id

	if (id) {
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'imovie 后台更新页',
				movie:movie
			})
		})
	}
})
//admin post movie
// admin post movie
app.post('/admin/movie/new', function(req, res) {
  var id = req.body.movie._id
  var movieObj = req.body.movie
  var _movie

  if (id !== 'undefined') {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err)
      }

      _movie = _.extend(movie, movieObj)
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err)
        }

        res.redirect('/movie/' + movie._id)
      })
    })
  }
  else {
    _movie = new Movie({
      doctor: movieObj.doctor,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    })

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }

      res.redirect('/movie/' + movie._id)
    })
  }
})

//list page
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err,movies){
		if (err) {
			console.log(err)
		}

		res.render('list',{
			title:'imovie 列表页',
			movies:movies
		})
	})
})

//list delete movie
app.delete('/admin/list',function(req,res){
	var id = req.query.id

	if (id) {
		Movie.remove({_id:id},function(err,movie){
			if (err) {
			console.log(err)
			}

			else{
				res.json({success:1})
			}
		})
	};
})
// app.get('/', function(req, res){
//   Movie.fetch(function(err, moives){
//     if(err) {
//       console.log(err);
//     };
//
//     res.render('index',{
//       title: 'Movie App',
//       movies: movies
//     });
//   })
//
//
//
//
// });
//
// // app.get('/', function(req, res){
// //
// //
// // });
//
// app.get('/movie/:id', function(req, res){
//   var id = req.params.id;
//
//   Movie.findById(id, function(err, movie){
//     res.render('index',{
//       title: 'Movie App Detail' + movie.title,
//       movie: movie
//     });
//   });
// });
//
// // app.get('/admin/movie', function(req, res){
// //   res.render('admin',{
// //     title: 'This is admin'
// //   });
// // });
//
// app.get('/admin/list', function(req, res){
//   Movie.fetch(function(err, moives){
//     if(err) {
//       console.log(err);
//     };
//
//     res.render('list',{
//       title: 'Movie list Page',
//       movies: movies
//     });
//   })
// });
//
//
// app.get('/admin/update/:id', function(req,res) {
//   var id = req.params.id;
//   if (id) {
//     Movie.findById(id, function(err, movie){
//       res.render('admin', {
//         title:'update page',
//         movie: movie
//       })
//     })
//   }
// })
//
//
// app.get('/admin/movie',function(req,res){
// 	res.render('admin',{
// 		title:'Input Page',
// 		movie:{
// 			title: '',
// 			doctor: '',
// 			country: '',
// 			year: '',
// 			language: '',
// 			summary: '',
// 			poster: '',
// 			flash: ''
// 		}
// 	});
// });
//
//
// app.post('/admin/movie/new', function(res,req) {
//   var id = req.body.movie._id;
//   var movieObj = req.body.movie;
//   var _movie;
//
//   if (id !== 'undefined') {
//     Movie.findById(id, function(err, movie){
//       if(err) {
//         console.log(err);
//       }
//       _movie = _.extend(movie, movieObj)
//       _movie.save(function(err, movie){
//         if(err) {
//           console.log(err);
//         }
//         res.redirect('/movie/' + movie._id);
//       })
//     })
//   } else {
//     _movie = new Movie({
//       doctor: movieObj.doctor,
//       title: movieObj.title,
//       country: movieObj.country,
//       language: movieObj.language,
//       year: movieObj.year,
//       poster: movieObj.poster,
//       summary: movieObj.summary,
//       falsh: movieObj.falsh,
//     });
//     _movie.save(function(err, movie){
//       if(err) {
//         console.log(err);
//       }
//       res.redirect('/movie/' + movie._id);
//     })
//   }
// });

// app.get("/movie/:id", function(req, res) {
//     res.render("detail", {
//         title: 'IMOOC 详情页面',
//         movie: {
//             doctor: '肖成布莱尔',
//             country: "中国大陆",
//             title: "机械战警",
//             year: 2014,
//             poster: 'http://p5.7k7kimg.cn/m/201703/0109/107-1F3010932360-L.jpg',
//             language: '汉语',
//             flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUY/v.swf',
//             summary: '添加一些描述而已我这么做不过分吧！添加一些描述而已我这么做不过分吧！添加一些描述而已我这么做不过分吧！添加一些描述而已我这么做不过分吧！添加一些描述而已我这么做不过分吧！'
//         }
//     })
// })

//
// app.get('/',(req,res)=>{
//   res.render('index',{
//       title:'MOMO 首页',
//       movies:[{
//         title:'kama萌照',
//         _id:1,
//         poster:'http://placehold.it/350x150',
//       },{
//         title:'kama萌照',
//         _id:2,
//         poster:'http://placehold.it/350x150',
//       },{
//         title:'kama萌照',
//         _id:3,
//         poster:'http://placehold.it/350x150',
//       },{
//         title:'kama萌照',
//         _id:4,
//         poster:'http://placehold.it/350x150',
//       },{
//         title:'kama萌照',
//         _id:5,
//         poster:'http://placehold.it/350x150',
//       },{
//         title:'kama萌照',
//         _id:6,
//         poster:'http://placehold.it/350x150',
//       }]
//   })
// })
//
// app.get('/movie/:id',(req,res)=>{
//   res.render('detail',{
//       title:'MOMO 详情页',
//       movie:{
//         doctor:'MOMO',
//         country:'China',
//         title:'kama一家',
//         year:2016,
//         poster:'http://placehold.it/350x150',
//         language:'中文',
//         flash:'',
//         summary:'卡卡是个小萌萌，maru也是个小萌萌',
//       }
//   })
// })
// app.get('/admin/movie',(req,res)=>{
//   res.render('admin',{
//       title:'MOMO 后台',
//       movie:{
//         doctor:'',
//         country:'',
//         title:'',
//         year:'',
//         poster:'',
//         language:'',
//         flash:'',
//         summary:'',
//       }
//   })
// })
// app.get('/admin/list',(req,res)=>{
//   res.render('list',{
//       title:'MOMO 列表页',
//       movies:{
//         doctor:'MOMO',
//         country:'China',
//         title:'kama一家',
//         _id:1,
//         year:2016,
//         poster:'http://placehold.it/350x150',
//         language:'中文',
//         flash:'',
//         summary:'卡卡是个小萌萌，maru也是个小萌萌',
//       }
//   })
// })
