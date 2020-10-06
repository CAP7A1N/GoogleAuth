const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);;
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require("path");
require('./auth');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }));

function requireHTTPS(req, res, next) {
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

app.use(passport.initialize());
app.use(passport.session());
  
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect("/login");
    }
}


app.get('/error', (req, res) => res.send('Authentication failed, please try again.'))
app.get('/', isLoggedIn, (req, res) => {
  res.send("Hello, " + req.user._json.name);
})


app.get('/login', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/login/info', passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/');
  }
);

http.listen(process.env.PORT || 3000, () => console.log("App is online!"));
