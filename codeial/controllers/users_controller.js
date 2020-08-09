const User = require('../models/user');

module.exports.profile = function (req, res) {
  // res.end("<h1>user profile</h1>");
  User.findById(req.params.id, function (err, user) {
    return res.render('user_profile', {
      title: 'User profile',
      profile_user: user,
    });
  });
};

module.exports.update = function (req, res) {
  if (req.user.id == req.params.id) {
    // User.findByIdAndUpdate(req.params.id,{ name:req.body.name,email:req.body.email})
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
      return res.redirect('back');
    });
  } else {
    return res.status(401).send('Unauthorized');
  }
};

// render the sign up
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }

  return res.render('user_sign_up', {
    title: 'Codeial| sign up',
  });
};

// render sign in
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_in', {
    title: 'Codeial| sign in',
  });
};

// get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect('back');
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log('error in finding user in signing up');
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log('error in finding user in signing up');
          return;
        }

        return res.redirect('/users/sign-in');
      });
    } else {
      return res.redirect('back');
    }
  });
};

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash('success', 'Logged in Successfully !');
  return res.redirect('/');
};

module.exports.destroySession = function (req, res) {
  req.logout();
  req.flash('success', 'Logged out Successfully !');
  return res.redirect('/');
  // one method to move from req to res to display flash msg
  // return res.redirect('/',{flash:{success:"you have logged out"}});
};
