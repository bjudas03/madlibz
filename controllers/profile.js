var express = require('express');
var request = require('request');
var router = express.Router();
var app = express();


//routes - api calls

// app.get('http://libberfy.herokuapp.com', function(req, res) {
// 	var url = 'http://libberfy.herouapp.com';
// 	var q= "this is a test string";
// 	request({
// 		url: url,
// 		q: q,
// 		json:true
// 	}function(error, response, body) {
// 		var dataObj = JSON.parse(body);
// 		console.log(dataObj);
// 	});
// });


	// router.get('/profile', function (req, res) {
	// 	var url = 'http://libberfy.herokuapp.com'
	// 	var qs = "This is a test request";
	// 	fullUrl = url + "?q=" + qs;
	// 	request({
	// 		url: url,
	// 		json:true
	// 	},function(error, response, body) {
	// 		var dataObj = JSON.parse(body);
	// 		console.log(dataObj);
	// 	});
	// });


//TO DO -----code below is for notes----------------------------------
//
// router.get('/profile', function(req, res) {
//   var url = 'http://libberfy.herokuapp.com'
//   var q = "At Indiegogo you’ll find a welcoming, supportive community that embraces collaboration, fearlessness and authenticity. We are a rapidly growing organization and our platform is used by people all over the world to raise money for their creative, cause-related, or entrepreneurial ideas. Our customers are passionate about their funding campaigns, and so are we! We are a team of passionate, results-driven, team-players who are lucky enough to be able to call “helping people achieve their dream” work. We love our dogs, good food, coffee, and post-it notes! Lots of post-it notes!";

//   request({
//     url: url,
//     qs: q,
//     json: true
//   },
//     function(error, response, body) {
//       res.render('profile', {data: body.data});
//       res.send(body.data);
//       console.log("i'm in here");
//     });
// })

// app.get('/search/:foo', function(req, res) {
//   var url = 'http://api.giphy.com/v1/gifs/search?api_key=ou95wVFNysgbbiX05C2fjIRVcY8bbHkz&';
//   var q = req.params.foo;
//   var fullUrl = url + 'q=' + q;
//   request({
//     url: fullUrl
//   }, function(error, response, body) {
//     var dataObj = JSON.parse(body);
//     // res.render('index', {data: dataObj});
//     res.send(dataObj);
//   });
// });

module.exports = router;