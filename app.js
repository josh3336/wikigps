var express = require('express');
var http = require('http');

var app = express();

console.log('app',app);
console.log('what is require middleware:',require('./config/middleware.js'));
require('./config/middleware.js')(app);
require('./config/routes.js')(app);
require('./config/environments.js')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
