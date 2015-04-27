var guestDB = require( '../controllers/guestAccess.js' );
var express = require('express');
var routes = express.Router();

/*var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}*/


// api ---------------------------------------------------------------------

var isAuthenticated = true;

	routes.get('/api/guests',  function(req, res) {
		
		console.log('routes.js 1.5: returning all guests from mongoose function');
		
		guestDB.readAll(function(err, guests){
			if (err) {
			    console.log('error reading guest: ' + err);
			}
			else {
				var arr = JSON.parse(JSON.stringify(guests));
				res.json(arr);
			};
		});
	});	

	routes.get('/api/guests/:GuestName',  function(req, res) {
		console.log('express routes.js 1.4: returning ' + req.params.GuestName + ' from mongoose function');
		guestDB.read(req.params.GuestName, function(err, guests){
			if (err) {
			    console.log('error reading guest: ' + err);
			}
			else {
				var arr = JSON.parse(JSON.stringify(guests));
				res.send(arr);
			};
		});
	});	
	
	routes.post('/api/guests/:GuestName',  function(req, res) {
		console.log('routes.js 1.0: entered into routes.create yy ' + req.params.GuestFirstName + '' + req.params.GuestLastName);
		guestDB.create(req.body);
	});


	routes.post('/api/guests/',  function(req, res) {
		console.log('routes.js 1.1: entered into routes.create ' + req.params.GuestFirstName + '' + req.params.GuestLastName);
		guestDB.create(req.body);
	});
	
	routes.delete('/api/guests/:GuestName',  function(req, res) {
		console.log('routes.js: enterd into routes.delete');
		console.log('delete ' + req.body.GuestName);
		guestDB.delete(req.params.GuestName);
	});

	routes.delete('/api/guests/',  function(req, res) {
		console.log('routes.js: entered into routes.delete');
		console.log('delete ' + req.body.GuestName);
		guestDB.delete(req.params.GuestName);
	});

	routes.put('/api/guests/',  function(req, res) {
		console.log('routes.js 1.7: entered into routes.update');
		console.log(req.body);
		guestDB.update(req.body, function(success){
			if (success) {
			    res.send(true);
			}
			else {
				console.log('error updating guest: ' + err);
			};
		});
	});

	routes.put('/api/guests/:GuestName',  function(req, res) {
		console.log('routes.js 1.6: entered into routes.update');
		console.log(req.body);
		guestDB.update(req.body, function(success){
			if (success) {
			    res.send(true);
			}
			else {
				console.log('error updating guest: ' + err);
			};
		});
	});

	//routes.get('/',  function(req, res) {
  	routes.get('/', function(req, res) {
  		res.render('index', { title: 'Express' });
	});

	routes.get('*', function(req, res) {
  		res.render('index', { title: 'Express' });
	});
module.exports = routes;