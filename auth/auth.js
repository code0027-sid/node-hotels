const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local'); 

const User = require('../module/personschema'); 

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // 🔍 Step 1: Find user from DB by username
      const user = await User.findOne({  username });

      //  If no user found
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      //  Step 2 Compare password 
      const isPasswordMatch =await user.comparePassword(password);
       
      if (isPasswordMatch) {
        return done(null, user); 
      } else {
        return done(null, false, { message: 'Incorrect password' }); 
      }
    } catch (err) {
      return done(err); 
    }
  })
);

module.exports=passport;