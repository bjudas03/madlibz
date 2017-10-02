var express = require('express');
var router = express.Router();
var app = express();


router.get('/saved', function(req, res) {
  res.render('./game/saved');
});

router.get('../profile', function(req, res) {
	res.render('../profile');
})



module.exports = router;