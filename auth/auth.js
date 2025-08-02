const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../module/personschema');

passport.use(
  new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
    try {
      const queryUsername = req.query.username;
      const queryPassword = req.query.password;

      // 3. Find user by the username from the query.
      const user = await User.findOne({ username: queryUsername });

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }

      // 4. Compare password from the query.
      const isPasswordMatch = await user.comparePassword(queryPassword);

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

module.exports = passport;