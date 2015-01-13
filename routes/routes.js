var companyDB = require( '../controllers/companyAccess.js' );
var express = require('express');
var routes = express.Router();

	// api ---------------------------------------------------------------------

	routes.get('/api/companies', function(req, res) {
		
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

	routes.get('/api/companies/:CompanyName', function(req, res) {
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
	
	routes.post('/api/companies/:CompanyName', function(req, res) {
		console.log('routes.js: entered into routes.create');
		companyDB.create(req.params.CompanyName, 1200, 5000);
	});


	routes.post('/api/companies/', function(req, res) {
		console.log('routes.js: entered into routes.create');
		companyDB.create(req.params.CompanyName, 1200, 5000);
	});
	
	routes.delete('/api/companies/:CompanyName', function(req, res) {
		console.log('routes.js: enterd into routes.delete');
		companyDB.delete(req.params.CompanyName);
	});

	routes.delete('/api/companies/', function(req, res) {
		console.log('routes.js: entered into routes.delete');
		companyDB.delete(req.params.CompanyName);
	});

	routes.put('/api/companies/:CompanyName', function(req, res) {
		companyDB.update(req.body);
	});

	routes.get('/', function(req, res) {
  		res.render('index', { title: 'Express' });
	});

	/* routes.get('*', function(req, res) {
  		res.render('index', { title: 'Express' });
	}); */

module.exports = routes;