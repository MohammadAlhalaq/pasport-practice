const { loginSc, signupSc } = require('../../schemas/userSchema');
// const { badData } = require('@hapi/boom');
const bcrypt = require('bcrypt');

//user module
const User = require('../../module/User');

exports.login = (req, res, next) => {
  res.render('login', {
    error: '',
    path: '',
    userData: ''
  });
}
exports.register = (req, res, next) => {
  res.render('register', {
    error: '',
    path: '',
    userData: '',
  });
}
exports.dashboard = (req, res, next) => {
  res.render('dashboard', {
    user: {name: 'Mohammad'}
  });
}
exports.postLogin = async (req, res, next) => {
  try{
    const result = await loginSc.validateAsync(req.body);
    
  }catch(err){    
    res.render('login', {
      error: err.details[0].message || '',
      path: err.details[0].path[0] || ''
    });
}
};
exports.postRegister = async (req, res, next) => {
  try{
    const { body } = req;
    const userData = await signupSc.validateAsync(body);
    const { name, email, password} = userData;
    console.log(email);
    
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
      res.render('login', {
        error: '',
        path: '',
        userData
      })
    }
  }catch(err){    
    console.log(err); 
    res.render('register', {
      error: err.details[0].message || '',
      path: err.details[0].path[0] || '',
      userData: req.body,
    });
    // next(badData(`register ${err.details[0].message}`))
  }
  
  
};