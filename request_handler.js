
var path = require('path');
var url = require('url');
var http = require("http");
var https = require("https");
var request = require('request')
var seperatedata = require('./seperatedata.js')

var filePath;
var file;
var fs = require('fs');
var defaultCors=  {"access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST",
  "access-control-allow-headers": "content-type, accept, origin, x-requested-with",
  "access-control-max-age": 10, // Seconds.
  "content-type": "application/json"
  };

exports.handleRequest = function (req, res) {
  var fs = require('fs');
  var body='';

  if ( req.method==='POST' ){
    console.log('handling POST');
    req.on('data',function(chunk){
      console.log('chunk',chunk)
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
          'radius':'1000m',
          'jsonp' : 'data'},
        method: "GET"
        }, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            results = body.slice(5,body.length-2); // slices off data tag and end for proper formatting
            results=JSON.parse(results);
            seperatedata.setupformap(results);
            res.end(JSON.stringify(results));
          }
          else{console.log('error',error);}
      });
    });
  }
  else if (req.method === 'GET') {
    if(req.url === '/' || req.url === '/index'){ 
      filePath = path.join(__dirname, "public/index.html");
      file=fs.readFileSync(filePath);
      console.log('need to serve index');
      res.writeHead(200,{'Content-Type' : 'text/html'});
      res.end(file);
    }
    if(req.url === '/google'){
      console.log('serving google map page')
      filePath = path.join(__dirname, "testing/googlemaps.html");
      file = fs.readFileSync(filePath);
      res.writeHead(200,{'Content-Type' : 'text/html'});
      res.end(file);
    }
    if(req.url==='/handle_posts.js'){
      filePath=path.join(__dirname,"handle_posts.js");
      file = fs.readFileSync(filePath);
      res.writeHead(200,{'Content-Type':'script'});
      res.end(file);
    }
    if(req.url==='/handle_posts_clientapicall.js'){
      filePath=path.join(__dirname,"handle_posts_clientapicall.js");
      file = fs.readFileSync(filePath);
      res.writeHead(200,{'Content-Type':'script'});
      res.end(file);
    }
  }
  else{
    console.log('not serving');
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end();
  }
};