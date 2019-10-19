const { loginSc, signupSc } = require('../../schemas/userSchema');
const { badData } = require('@hapi/boom');
exports.login = (req, res, next) => {
  res.render('login', {
    error: '',
    path: ''
  });
}
exports.register = (req, res, next) => {
  res.render('register', {
    error: '',
    path: '',
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
    const result = await signupSc.validateAsync(req.body);
    
  }catch(err){    
    res.render('register', {
      error: err.details[0].message || '',
      path: err.details[0].path[0] || ''
    });
    // next(badData(`register ${err.details[0].message}`))
  }
  
  
};