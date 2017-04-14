var Movie = require('../models/movie');
var Comment = require('../models/comment');
var _ = require('underscore');
// 加载detail page
//访问路径就是localhost :3000/movie/id
exports.detail = function(req, res) {

    // req.params 获取路径变量值，这里指id这个变量
    var id = req.params.id;

    Movie.findById(id, function(err, movie) {
        Comment
        .find({movie: id})
        .populate('from', 'name')
        .populate('reply.from reply.to', 'name')
        .exec(function(err, comments) {
            res.render('detail', {
                title: 'imooc 详情页',
                movie: movie,
                comments: comments
            })
        })
    })
};

// 加载admin page
exports.new = function(req, res) {
    res.render('admin', {
        title: 'Imovie录入',
        movie: {
            title: '',
            doctor: '',
            country: '',
            poster: '',
            language: '',
            flash: '',
            summary: '',
            year: ''
        }
    });
};

//admin uodate movie
exports.update = function(req, res) {

    var id = req.params.id;
    if (id) {
        Movie.findById(id, function(err, movie) {
            res.render('admin', {
                title: 'Imovie更新',
                movie: movie
            });
        });
    }

};

//admin post movie  urlencoded,
exports.save = function(req, res) {

    if (!req.body)
        return res.sendStatus(400);

    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (id != 'undefined' && id != '') {

        console.log('take hello');
        console.log(id);

        Movie.findById(id, function(err, movie) {
            if (err) {
                console.log(err);
            }
            _movie = _.extend(movie, movieObj);
            _movie.save(function(err, _movie) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/movie/' + _movie._id);
            });
        });

    } else {

        _movie = new Movie({
            title: movieObj.title,
            doctor: movieObj.doctor,
            country: movieObj.country,
            language: movieObj.language,
            poster: movieObj.poster,
            flash: movieObj.flash,
            year: movieObj.year,
            summary: movieObj.summary
        });
        _movie.save(function(err, movie) {
            if (err) {
                console.log(err);
            }
            res.redirect('/movie/' + movie._id);
        });

    }

};

// 加载list page
exports.list = function(req, res) {
    Movie.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: 'Imove列表',
            movies: movies
        });
    });
};

// 接收删除请求
exports.del = function(req, res) {
    // req.query 主要获取到客户端提交过来的键值对
    // '/admin/list?id=12'，这里就会获取到12
    var id = req.query.id;
    console.log(id);

    if (id) {
        Movie.remove({
            _id: id
        }, function(err) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        });
    }

};
