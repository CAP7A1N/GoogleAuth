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
  //IN ORDER TO ACCESS THE PROFILE OBJECT, YOU MUST PASS IT AS A VARIABLE
  function(accessToken, refreshToken, profile, done) {
  //THE PROFILE VARIABLE WILL NOW CONTAIN THE OBJECT WITH ALL OF THE USERS INFO
    return done(null, profile);
  }
));
