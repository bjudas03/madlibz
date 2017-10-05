var express = require('express');
var router = express.Router();
var app = express();
var db = require('../models');
var passport = require('../config/ppConfig');
var request = require('request');

var responseText;

router.get('/', function(req, res) {
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
		res.redirect('/madlibs')
	})
});

//create new madlib
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
		// responseText = JSON.stringify(responseText);
		res.render("madlibs/show", {madlib: responseText});
		// console.log(responseText);
		// res.send(responseText);
		// JSON.stringify(dataObj);
		// console.log(dataObj);
	});
	console.log(responseText);
	//code below works! just need to uncomment to reinitialize
	db.madlib.create({
		title: req.body.title,
		body: responseText  //find a way to send the RESPONSE from the api call to the DB - This is sending the body (before it is jumbled)
	}).done() //this is in for testing. Remove
	// .then(function(madlib) {
		// res.redirect('/madlibs/')
	// });
});




module.exports = router;
