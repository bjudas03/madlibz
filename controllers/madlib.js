var express = require('express');
var router = express.Router();
var app = express();
var db = require('../models');
var passport = require('../config/ppConfig');
var request = require('request');

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
		res.send(body);
		var dataObj = body;
		console.log(dataObj);
	});

	db.madlib.create({
		title: req.body.title,
		body: req.body.body
	}).then(function(madlib) {
		// res.redirect('/madlibs/')
	});
});

module.exports = router;
