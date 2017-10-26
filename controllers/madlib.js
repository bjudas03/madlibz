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
		// console.log(madlib)
		console.log("I am in the /input route") //route is being accessed 
		console.log("req.params.id: " +req.params.id)
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
		   }; //-----------------------------------closes out the for loop
		   console.log(madlib)
		   // res.render('madlibs/input', {madlib:madlib, inputArr:inputArr}) //doesn't render with :id - fails to lookup view in directory
		   res.render('madlibs/input', {madlibs:inputArr, id:req.params.id}) //This works - IF exp doesn't work, go back to this
  	}); //-----------------closes out the then funciton
});	



router.post('/show', function(req,res) {
	console.log("I'm in the input post route");
	console.log("This is the req.params.id: " + req.params.id)
	var data = req.body
	console.log(data); //sends the form data back as an object (each input name is one key with many values)
	//TODO: Get the original madlib text (with the <noun> etc in place)
	//parse through text again to get placeholers
	//replace placehoders with the req.body values
	//re-post string with new text values
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
		console.log(responseText +"******************");
		// //code below works! just need to uncomment to reinitialize
		db.madlib.create({
			title: req.body.title,
			body: responseText  //find a way to send the RESPONSE from the api call to the DB - This is sending the body (before it is jumbled)
		}).then(function(result) {
			var renderObj = {title:req.body.title, body:responseText};
			// console.log(renderObj);
			// console.log("I'm n the post route **************");
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
