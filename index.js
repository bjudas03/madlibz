require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');
var request = require('request');
var fs = require('fs');
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
// app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});
var passport = require('./config/ppConfig');
// initialize the passport configuration and session as middleware
app.use(passport.initialize());
app.use(passport.session());


//routes - navigation

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', /*isLoggedIn,*/  function(req, res) {
  res.render('profile');
});

app.get('/saved', function(req, res) {
  res.render('saved');
});


app.use('/auth', require('./controllers/auth'));
app.use('/madlibs', require('./controllers/madlib'));


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
