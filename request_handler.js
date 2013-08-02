
var path = require('path');
var url = require('url');
var http = require("http");
var https = require("https");
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
      body+=chunk;
    });
    req.on('end',function(chunk){
      body=JSON.parse(body);
      console.log('end of request, the body is',body.address);

      var options = {
        host: 'http://api.wikilocation.org/articles?lat=40.12&lng=-75.341667&radius=1000m',
        method: 'GET',
        jsonp: "data",
        headers: {
            'Content-Type': 'application/json'
        }
      };

      http.get(options, function(response) {
        console.log(response)
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        res.end(JSON.stringify(response.headers))
      }).on('error', function(e) {
        console.log('ERROR: ' + e.message);
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
  }
  else{
    console.log('not serving');
    res.writeHead(404,{'Content-Type':'text/html'});
    res.end();
  }
};