var User = require('../models/user');
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
            return res.redirect('/');
        } else {
            var user = new User(_user);
            user.save(function(err, user) {
                if (err) {
                    console.log(err);
                }
                res.redirect('/admin/userlist');
            });
        }
    });
};

//signin
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
            return res.redirect('/');
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
