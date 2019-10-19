const passport = require('passport');

const { loginSc, signupSc } = require('../../schemas/userSchema');

// const { badData } = require('@hapi/boom');
const bcrypt = require('bcrypt');

//user module
const User = require('../../module/User');

exports.login = (req, res) => {
  res.render('login', {
    path: '',
    userData: ''
  });
}
exports.logout = (req, res) => {
  req.logout();
  req.flash('success_message', "you are loged out");
  res.redirect('/login');
}
exports.register = (req, res) => {
  res.render('register', {
    error: '',
    path: '',
    userData: '',
  });
}
exports.dashboard = (req, res) => {
  const { user: { name } } = req;
  res.render('dashboard', {
    name,
  });
}
exports.postLogin = async (req, res, next) => {
  try{
    await loginSc.validateAsync(req.body);
    passport.authenticate('local',{ 
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: true
    })(req, res, next);
    
  }catch(err){

    res.render('login', {
      error: err.details[0].message || '',
      path: err.details[0].path[0] || '',
      userData: req.body
    });

  }
};
exports.postRegister = async (req, res) => {
  try{
    const { body } = req;
    const userData = await signupSc.validateAsync(body);
    const { name, email, password} = userData;    
    const isuser = await User.findOne({email});
    
    if (isuser) {
      res.render('register', {
        error: 'email is exist',
        path: 'email',
        userData,
      })
    } else {
      const salt = await bcrypt.genSalt(15);
      const hash = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hash
      });
      await newUser.save();
      req.flash('success_message', 'you are now registerd and you can login');
      res.redirect('/login');
    }
  }catch(err){    
    res.render('register', {
      error: err.details[0].message || '',
      path: err.details[0].path[0] || '',
      userData: req.body,
    });
    // next(badData(`register ${err.details[0].message}`))
  }
  
  
};