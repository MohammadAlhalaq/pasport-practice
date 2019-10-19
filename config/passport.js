const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//  Load User Model
const User = require('../module/User');
const checkValidation = async (email, password, done) => {
  // Match user 
  
  try{
    const user = await User.findOne({ email });
    if(!user){
      return done(null, false, { message: 'That email is not registerd'})
    }
    // Match password
    if(user){
      const { password: hash} = user;
      const isMatchPass = bcrypt.compareSync(password, hash);
      if (isMatchPass) {        
        return done(null, user);
      }else{
        return done(null, false, { message: 'Password incorrect'});
      }
    }
  }catch(err){
    done(err);
  }

}
module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, checkValidation)
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};