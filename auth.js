const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID: "CLIENTID",
    clientSecret: "CLIENTSECRET",
    callbackURL: "http://localhost:3000/login/info"
  },
  function(accessToken, refreshToken, done) {
    return done(null, profile);
  }
));
