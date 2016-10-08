var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

if (process.env.CI) {
  var keys = require('./credentials/apiKeys.example.js');
} else {
  var keys = require('./credentials/apiKeys.js');
}

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
  clientID: keys.googleClientId,
  clientSecret: keys.googleClientSecret,
  callbackURL: 'https://www.chadroulette.com/google/success'
}, function(accessToken, refreshToken, profile, done) {
  User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, user);
  });
}));

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback


module.exports = passport;