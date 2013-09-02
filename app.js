var path = require('path');
var express = require("express");
var app = express();

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
require('./config/routes.js')
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started on port 3000');