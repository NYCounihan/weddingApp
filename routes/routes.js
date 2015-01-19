var companyDB = require( '../controllers/companyAccess.js' );
var express = require('express');
var routes = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}


// api ---------------------------------------------------------------------

	routes.get('/api/companies', isAuthenticated, function(req, res) {
		
		console.log('routes.js; returning all companies from mongoose function');
		
		companyDB.readAll(function(err, companies){
			if (err) {
			    console.log('error reading company: ' + err);
			}
			else {
				var arr = JSON.parse(JSON.stringify(companies));
				res.json(arr);
			};
		});
	});	

	routes.get('/api/companies/:CompanyName', isAuthenticated, function(req, res) {
		console.log('express routes.js; returning ' + req.params.CompanyName + ' from mongoose function');
		companyDB.read(req.params.CompanyName, function(err, companies){
			if (err) {
			    console.log('error reading company: ' + err);
			}
			else {
				var arr = JSON.parse(JSON.stringify(companies));
				res.send(arr);
			};
		});
	});	
	
	routes.post('/api/companies/:CompanyName', isAuthenticated, function(req, res) {
		console.log('routes.js: entered into routes.create');
		companyDB.create(req.params.CompanyName, 1200, 5000);
	});


	routes.post('/api/companies/', isAuthenticated, function(req, res) {
		console.log('routes.js: entered into routes.create');
		companyDB.create(req.params.CompanyName, 1200, 5000);
	});
	
	routes.delete('/api/companies/:CompanyName', isAuthenticated, function(req, res) {
		console.log('routes.js: enterd into routes.delete');
		companyDB.delete(req.params.CompanyName);
	});

	routes.delete('/api/companies/', isAuthenticated, function(req, res) {
		console.log('routes.js: entered into routes.delete');
		companyDB.delete(req.params.CompanyName);
	});

	routes.put('/api/companies/:CompanyName', isAuthenticated, function(req, res) {
		companyDB.update(req.body);
	});

	routes.get('/', isAuthenticated, function(req, res) {
  		res.render('index', { title: 'Express' });
	});

module.exports = routes;