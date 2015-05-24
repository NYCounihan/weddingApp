// set up ======================================================================
var express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path')
  , data = require('./model/db')
  , router = require('./routes/routes.js');

  //  var favicon = require('serve-favicon'); 
    var logger = require('morgan');
    var methodOverride = require('method-override');
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var errorHandler = require('errorhandler');

// configuration ==================================================================
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views'); //deliver dynamic template files
    app.set('view engine', 'ejs');

    //app.use(favicon(__dirname + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(methodOverride());

    // parse application/json
    app.use(bodyParser.json());                        

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // parse multipart/form-data
    app.use(multer());

    app.use(express.static(path.join(__dirname, 'public'))); //deliver things like images and such

// routes ======================================================================
      app.use('/', require('./routes/routes.js'));
    //  app.use('/', require('./routes/passportRoutes.js')(passport));

    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    
    });
