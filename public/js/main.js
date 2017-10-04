console.log("main js linked");

// var express = require('express');
// var request = require('request');
// var app = express();

$('.libRequest').on('click', function() {
	console.log("this click is registering");
	// var url = 'http://libberfy.herokuapp.com';
	// $.ajax({
	// 	method: 'GET',
	// 	url: url,
	// 	q: "This is a test string"
	// }).done(function(data){
	// 	console.log(data);
	// 	console.log("I'm in the route");
	// });
});	

//code below is for a get request to Libberfy, this can be added as a click function to the .librequst once that button is linked.
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