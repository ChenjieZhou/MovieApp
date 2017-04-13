var User = require('../models/user');



exports.showSignin = function(req, res) {
  res.render('signin', {
    title: '登录页面',
  });
};

exports.showSignup = function(req, res) {
  res.render('signup', {
    title: '注册页面',
  });
};


//signup
exports.signup =  function(req, res) {
    var _user = req.body.user;

    User.findOne({
        name: _user.name
    }, function(err, user) {
        if (err) {
            console.log(err);
        }

        if (user) {
            return res.redirect('/signin');
        } else {
            var user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/');
            });
        }
    });
};

//login
exports.signin =  function(req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var passwrod = _user.password;

    User.findOne({
        name: name
    }, function(err, user) {
        if (err) {
            console.log(err);
        }
        if (!user) {
            return res.redirect('/signup');

        }

        user.comparePassword(passwrod, function(err, isMatch) {
            if (err) {
                console.log(err);
            }

            if (isMatch) {
                req.session.user = user; // check the status of login

                console.log('Password is correct');
                return res.redirect('/');
            } else {
                return res.redirect('/signin');
                console.log('Password is not match');
            }
        });
    });
};

//logout
exports.logout =  function(req, res) {
    delete req.session.user;
    // delete app.locals.user;
    res.redirect('/');
};

// 加载userlist page
exports.list =  function(req, res) {
    User.fetch(function(err, users) {
        if (err) {
            console.log(err);
        }
        res.render('userlist', {
            title: 'Imove 用户列表',
            users: users
        });
    });
};


// mideware for user
exports.signinRequired =  function(req, res, next) {
  var user = req.session.user;
  if(!user) {      //if not login
    return res.redirect('/signin');
  }
  next();
};

exports.adminRequired =  function(req, res, next) {
  var user = req.session.user;
  if(user.role <=10) {       // if not admin
    return res.redirect('/signin');
  }
  next();
};
