
var path = require('path');
var fs = require('fs');

var express = require("express");
var app = express();

var request = require("request");


app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/home',function(req,res){
  console.log('serving google map page');
  filePath = path.join(__dirname, "public/googlemaps.html");
  file = fs.readFileSync(filePath);
  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.end(file);
});
app.get('/list',function(req,res){
  filePath = path.join(__dirname, "public/list.html");
  file = fs.readFileSync(filePath);
  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.end(file);
});
app.get('/favorites',function(req,res){
  console.log('serving google map page');
  filePath = path.join(__dirname, "public/favorites.html");
  file = fs.readFileSync(filePath);
  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.end(file);
});


app.get('/testing',function(req,res){
  console.log('serving google map page');
  filePath = path.join(__dirname, "public/testing.html");
  file = fs.readFileSync(filePath);
  res.writeHead(200,{'Content-Type' : 'text/html'});
  res.end(file);
});

app.post('/',function(req,res){
  var body='';
  req.on('data',function(chunk){
    console.log('chunk',chunk);
    body+=chunk;
  });
  req.on('end',function(chunk){
    body=JSON.parse(body);
    console.log(body)
    console.log('end of request, the body is',body.text);
    request({

      uri: 'http://api.ttsengine.com/v1/tts?',
      qs:{'text': body.text,
          'format': 'mp3',
          'key': '567531a6abe069c1f6b8419873292522'},
      method: "GET"
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log('Results of ttsengine query: ',body);
          results = body.slice(5,body.length-2); // slices off data tag and end for proper formatting
          res.end(results);
        }
        else{console.log('error',error);}
    });
  });
});
app.post('/home',function(req,res){
  var body = '';
  console.log('handling POST',req.url);
  req.on('data',function(chunk){
    console.log('chunk',chunk);
    body+=chunk;
  });
  req.on('end',function(chunk){
    body=JSON.parse(body);
    console.log('end of request, the body is',body.lat,body.lng);
    request({
      uri: 'http://api.wikilocation.org',
      qs:{'lat':body.lat, 
        'lng':body.lng,
        'radius':'1000m',
        'jsonp' : 'data'},
      method: "GET"
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          results = body.slice(5,body.length-2); // slices off data tag and end for proper formatting
          res.end(results);
        }
        else{console.log('error',error);}
    });
  });
});

app.post('/wiki',function(req,res){
  var body = '';
  console.log('handling POST',req.url);
  req.on('data',function(chunk){
    console.log('chunk',chunk);
    body+=chunk;
  });
  req.on('end',function(chunk){
    body=JSON.parse(body);
    console.log('end of request, the body is',body);
    request({
      uri: 'http://en.wikipedia.org/w/api.php',
      qs:{'pageids':body.wikiID, 
        'prop':'revisions',
        'rvprop':'content',
        'rvsection':'0',
        'action':'query',
        'format' : 'json',
        'rvparse':''},
      method: "GET"
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          results = body; // slices off data tag and end for proper formatting
          results = JSON.parse(results);
          //seperatedata.setupformap(results);
          res.end(JSON.stringify(results));
        }
        else{console.log('error',error);}
    });
  });
});



















var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started on port 3000');