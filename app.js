var path = require('path');
var express = require("express");
var http = require('http');

var app = express();


require('./config/routes.js')(app);
require('./config/middleware.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
