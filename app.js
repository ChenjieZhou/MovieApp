var express = require('express'); //load express
var port = process.env.PORT || 3000; //get enviroment and parameters
var app = express();  // web server
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var path = require('path');

app.set('views','./views/pages'); // root
app.set('view engine', 'pug');

app.use(serveStatic('bower_components'));
app.use(bodyParser.urlencoded());
app.listen(port);


console.log('start on port' + port);   // test the server

//index page
// app.get('/', function(req, res){
//   res.render('index',{
//     title: 'Movie App'
//   });
// });
//
// app.get('/', function(req, res){
//   res.render('index',{
//     title: 'Movie App',
//     movies:[{
//       title:'X-Man',
//       _id:1,
//       poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
//     },{
//       title:'X-Man',
//       _id:1,
//       poster:'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
//     }]
//   });
// });
//
// app.get('/movie/:id', function(req, res){
//   res.render('detail',{
//     title: 'This is detail'
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
//   res.render('list',{
//     title: 'This is list'
//   });
// });
//
// app.get('/admin/movie',function(req,res){
// 	res.render('admin',{
// 		title:'imovie 后台录入页',
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


app.get('/',(req,res)=>{
  res.render('index',{
      title:'MOMO 首页',
      movies:[{
        title:'kama萌照',
        _id:1,
        poster:'http://bcs.91.com/rbpiczy/Wallpaper/2014/11/24/28fa8b17435842bd819007d7451b4a38-11.jpg',
      },{
        title:'kama萌照',
        _id:2,
        poster:'http://img5.duitang.com/uploads/item/201408/18/20140818145826_zRvyt.thumb.700_0.jpeg',
      },{
        title:'kama萌照',
        _id:3,
        poster:'http://img5.duitang.com/uploads/item/201408/18/20140818145826_zRvyt.thumb.700_0.jpeg',
      },{
        title:'kama萌照',
        _id:4,
        poster:'http://img5.duitang.com/uploads/item/201408/18/20140818145826_zRvyt.thumb.700_0.jpeg',
      },{
        title:'kama萌照',
        _id:5,
        poster:'http://img5.duitang.com/uploads/item/201408/18/20140818145826_zRvyt.thumb.700_0.jpeg',
      },{
        title:'kama萌照',
        _id:6,
        poster:'http://img5.duitang.com/uploads/item/201408/18/20140818145826_zRvyt.thumb.700_0.jpeg',
      }]
  })
})

app.get('/movie/:id',(req,res)=>{
  res.render('detail',{
      title:'MOMO 详情页',
      movie:{
        doctor:'MOMO',
        country:'China',
        title:'kama一家',
        year:2016,
        poster:'http://bcs.91.com/rbpiczy/Wallpaper/2014/11/24/28fa8b17435842bd819007d7451b4a38-11.jpg',
        language:'中文',
        flash:'',
        summary:'卡卡是个小萌萌，maru也是个小萌萌',
      }
  })
})
app.get('/admin/movie',(req,res)=>{
  res.render('admin',{
      title:'MOMO 后台',
      movie:{
        doctor:'',
        country:'',
        title:'',
        year:'',
        poster:'',
        language:'',
        flash:'',
        summary:'',
      }
  })
})
app.get('/admin/list',(req,res)=>{
  res.render('list',{
      title:'MOMO 列表页',
      movies:{
        doctor:'MOMO',
        country:'China',
        title:'kama一家',
        _id:1,
        year:2016,
        poster:'http://bcs.91.com/rbpiczy/Wallpaper/2014/11/24/28fa8b17435842bd819007d7451b4a38-11.jpg',
        language:'中文',
        flash:'',
        summary:'卡卡是个小萌萌，maru也是个小萌萌',
      }
  })
})
