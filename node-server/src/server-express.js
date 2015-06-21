/**
 * Created by aarutunyan on 3/18/15.
 */
var express = require('express'),
  path = require('path'),
  logger = require('morgan'),
  bodyParser = require('body-parser');

exports.start = function (options) {
  var ret = true,
    portNumber = options && options.port || '5555', //src server
    app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());

  app.all('/*', function (req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });

  /*// Auth Middleware - This will check if the token is valid
  // Only the requests that start with /api/v1*//* will be checked for the token.
  // Any URL's that do not follow the below pattern should be avoided unless you
  // are sure that authentication is not needed
  app.all('/api/v1*//*', [require('./middlewares/validateRequest')]);*/

  app.use('/', require('./entities/03_presentation/rest'));

  // If no route is matched by now, it must be a 404
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

// Start the server
  app.set('port', portNumber);

  var server = app.listen(app.get('port'), function () {
    console.log('new static express server is running, port number = ' + server.address().port);
  });


  /*app.use(express.static(dirName));
   app.listen(portNumber);
  */
  return ret;
}