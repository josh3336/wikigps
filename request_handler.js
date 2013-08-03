
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
  g('error',error);}
      });
    });
  }
  else if (req.method === 'GET') {
    if(req.url === '/' || req.url === '/index'){ 

    }
    if(req.url === '/google'){

    }
    if(req.url==='/handle_posts.js'){

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