var express = require('express');
var router = express.Router();
var app = express();
var db = require('../models');
var passport = require('../config/ppConfig');
var request = require('request');

var responseText;
var madlibs;

router.use(express.static(__dirname + '/public'));
//This route is for accessing all stored libz
router.get('/', function(req, res) {
	db.madlib.findAll()
	.then(function(madlibs){
		res.render('madlibs/index', {madlibs: madlibs});
	}).done()
});

//get individual madlib
router.get('/:id', function(req,res) {
	db.madlib.findOne({
		where: { id: req.params.id},
	}).then(function(madlib){
		res.render('madlibs/show', {madlib: madlib});
	})
});

router.get('/:id/input', function(req,res) {
	var inputArr=[];
	db.madlib.findOne({
		where: {id:req.params.id},
	}).then(function(madlib) {
		var text = madlib.body
		var index = 0;
		var newText;
		  for (i = 0; i<10; i++) {
		    var x = text.indexOf("<");
		    var y = text.indexOf(">")
	      var textBox = text.slice(x,y+1);
		    inputArr.push(textBox);
		    newText = text.replace(textBox, '')
		    text = newText;
		   };
		   // conosle.log("I am in the :id/input res.render")
		   res.render('madlibs/input', {madlib:madlib, inputArr:inputArr})
  	}); 
});	


//replace text from madlib with values from input boxes
router.post('/:id/show', function(req,res) {
	db.madlib.findOne({
		where: {id:req.params.id},
	}).then(function(madlib) {
		var text = madlib.body;
		var objArr = Object.entries(req.body);
		for (i = 0; i<10; i++) {
			var objectPair = objArr[i];
			var repText = objectPair[1]; //access the input value for each pair in the objArr (replacement text for string)
			//----Iterate through string and get text to BE replaced--------//
		  var x = text.indexOf("<");
		  var y = text.indexOf(">")
	    var textBox = text.slice(x,y+1);
	    //----Replace textBox w/ new text and setup to reiterate through string ---//
	    text = text.replace(textBox, repText);
	    
		} 
		console.log(text);
		console.log("I am in the id:/show res.render")
		console.log(madlib);
		var renderObj = {id:madlib.dataValues.id, title:madlib.dataValues.title, body:text}
		res.render('madlibs/show', {madlib:renderObj});
		// res.render('madlibs/show', {madlib:madlib});      
		// res.render('madlibs/show', {madlib:madlib, body:text})      
	})
})


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
		db.madlib.create({
			title: req.body.title,
			body: responseText  
		}).then(function(result) {
			// console.log(result);
			var renderObj = {id:result.dataValues.id, title:req.body.title, body:responseText};
			res.render('madlibs/show', {madlib: renderObj});
		});
	});
});






//get individual madlib for edit
router.get('/:id/edit', function(req, res) {
  db.madlib.findById(req.params.id).then(function(madlib) {
    if (madlib) {
      res.render('madlibs/edit', {madlib: madlib});
      console.log(madlib.body);
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
		conosle.log(madlib);
		res.render('madlibs/show', {renderObj: madlib});
	})
});

//--------PUT - UPDATE DB----------//
router.put('/:id', function(req, res) {
  db.madlib.update({
  	title: req.body.title,
  	body: req.body.body
  }, {
  	where: {id: req.params.id},
  	returning: true
  }).then(function(response) {
  	res.render('madlibs/edit', {madlib: response['1']['0'].dataValues});
  });
});  

//-------DELETE ROUTE-----------//
router.delete('/:id', function(req, res) {
	console.log("In the delete route");
	console.log("This is the req.params.id: " + req.params.id);
	
	db.madlib.destroy({
		where: {id:req.params.id}
	}).done();
})




module.exports = router;
