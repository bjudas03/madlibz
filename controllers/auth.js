var express = require('express');
var router = express.Router();
var app = express();


router.get('/signup', function(req, res) {
  res.render('auth/signup');
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.get('../profile', function(req, res) {
	res.render('../profile');
})


module.exports = router;
