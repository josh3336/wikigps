
var path = require('path');
var fs = require('fs');

var express = require("express");
var app = express();



app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/index|/',function(req,res){
  filePath = path.join(__dirname, "public/index.html");
  file=fs.readFileSync(filePath);
  console.log('need to serve index');
  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.end(file);
  res.send('Hello World');
});

app.get('/google',function(req,res){
  console.log('serving google map page');
  filePath = path.join(__dirname, "public/googlemaps.html");
  file = fs.readFileSync(filePath);
  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.end(file);
});

app.post('/',function(req,res){
  var body = '';
  console.log('handling POST');
  req.on('data',function(chunk){
    console.log('chunk',chunk);
    body+=chunk;
  });
  req.on('end',function(chunk){
    body=JSON.parse(body);
    console.log('end of request, the body is',body.lat,body.lng);
    var request = require("request");
    request({
      uri: 'http://api.wikilocation.org',
      qs:{'lat':body.lat, 
        'lng':body.lng,
        'radius':'2000m',
        'jsonp' : 'data'},
      method: "GET"
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          results = body.slice(5,body.length-2); // slices off data tag and end for proper formatting
          results=JSON.parse(results);
          //seperatedata.setupformap(results);
          res.end(JSON.stringify(results));
        }
        else{console.log('error',error);}
    });
  });
});

app.listen(3000);
console.log('Express started on port 3000');