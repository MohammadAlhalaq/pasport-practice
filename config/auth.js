//for protected pages
exports.IsLogedIn = (req, res, next) => {
  if(req.isAuthenticated())return next();
  req.flash('error', 'Please login to access');
  res.redirect('/login');
};


//if user loged in he cant go to login and sign up
exports.IsLogedOut = (req, res, next) => {
  if(!req.isAuthenticated())return next();
  req.flash('error', 'you cant login or sign up while you are loged in if you want replace Accounts you can logout');
  res.redirect('/dashboard');
};

