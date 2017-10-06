var express = require('express');
var router = express.Router();
var app = express();
var db = require('../models');
var passport = require('../config/ppConfig');
var request = require('request');

var responseText;
var madlibs;

// router.use(express.static(__dirname + '/public'));

router.get('/', function(req, res) {
	// console.log("I am in this route");   --This is not it
	//add functionality to access madlibz table
	//access all stored madlibs
	db.madlib.findAll()
	.then(function(madlibs){
		// console.log(madlibs);
		res.render('madlibs/index', {madlibs: madlibs});
	}).done()
});

//get individual madlib
router.get('/:id', function(req,res) {
	db.madlib.findOne({
		where: { id: req.params.id},
	}).then(function(madlib){
		res.render('madlibs/show', {renderObj: madlib});
	})
});


// create new madlib -returns a string w/ variables
router.post('/', function(req, res) {
	var url = 'http://libberfy.herokuapp.com';
	var q = req.body.body;
	request({
		url: url,
		qs: {q: q},
		json:true
	}, function(error, response, body) {
		var dataObj = body;
		responseText = dataObj.madlib
		responseText = JSON.stringify(responseText);
		// //code below works! just need to uncomment to reinitialize
		db.madlib.create({
			title: req.body.title,
			body: responseText  //find a way to send the RESPONSE from the api call to the DB - This is sending the body (before it is jumbled)
		}).then(function(result) {
			// console.log(result);
			var renderObj = {title:req.body.title, body:responseText};
			// console.log(renderObj);
			res.render('madlibs/show', {renderObj: renderObj});
		});
	});
});
 // http://libberfy.herokuapp.com?q=Hello%20world.%20Testing%20this%20API.
//get a new madlib - returns a form as a string
// router.post('/', function(req, res) {
// 	var url = 'http://libberfy.herokuapp.com';
// 	var q = req.body.body;
// 	var fullUrl = url +'?blanks=10&html_form=1&q='+q;
// 	console.log(fullUrl);
// 	request({
// 		url: url,
// 		q: q,
// 		html_form: true,
// 		blanks: 10
// 		// json: true
// 	}, function(error, response, body) {
// 		console.log(body);      //ON THIS LINE-----------------------------
// 		// var dataObj = body;
// 		// responseText = dataObj.madlib
// 		// // console.log(responseText);
// 		// responseText = JSON.stringify(responseText);
// 		// // console.log(responseText);

// 		// //code below works! just need to uncomment to reinitialize
// 		// db.madlib.create({
// 		// 	title: req.body.title,
// 		// 	body: responseText  //find a way to send the RESPONSE from the api call to the DB - This is sending the body (before it is jumbled)
// 		// }).then(function(result) {
// 		// 	console.log(result);
// 		// 	res.render("madlibs/show", {madlib: responseText});
// 		// }); //this is in for testing. Remove
// 		// // .then(function(madlib) {
// 		// 	// res.redirect('/madlibs/')
		// });
	// });
// // });	



//get individual madlib for edit
router.get('/:id/edit', function(req, res) {
	// console.log("I am in this route", "---------------------------");
	//this route is getting triggered using the edit button on the article (madlibs page)
  db.madlib.findById(req.params.id).then(function(madlib) {
    if (madlib) {
      res.render('madlibs/edit', {madlib: madlib});
      // console.log("******************", req.params.id); //id is working
      console.log(madlib.body);  //pre-edit
    } else {
      res.status(404).render('error');
    }
  }).catch(function(err) {
    res.status(500).render('error');
  });
});
  

// GET route for /madlibs/1234
router.get('/:id', function(req,res) {
	db.madlib.findOne({
		where: { id: req.params.id},
	}).then(function(madlib){
		res.render('madlibs/show', {renderObj: madlib});
	})
});

//put new data from edit in the database
router.put('/:id', function(req, res) {
	// console.log("I'm in the PUT route");
  db.madlib.update({
  	title: req.body.title,
  	body: req.body.body
  }, {
  	where: {id: req.params.id},
  	returning: true
  }).then(function(response) {
  	// console.log("---------------------------------");
  	// console.log( response['1']['0'].dataValues.title );
  	// console.log("I'm in here at the end");
  	res.render('madlibs/edit', {madlib: response['1']['0'].dataValues});
  });
});  

router.delete('/:id', function(req, res) {
	console.log("In the delete route");
	console.log("This is the req.params.id: " + req.params.id);
	
	db.madlib.destroy({
		where: {id:req.params.id}
	}).done();
	// }).then(function() {
		// window.location.href = '/profile';
	// })
})


module.exports = router;
