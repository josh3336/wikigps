var fs = require('fs');
var request = require("request");
var path = require('path');
var site = require('../controllers/site.js');
var api_interaction = require('../controllers/api_interaction.js');

module.exports = function(app){
  app.get('/', site.index);
  app.get('/list', site.list);
  app.get('/favorites', site.favorites);
  //app.post('/home',api_interaction.get_local_wikis);
  //app.post('/wiki',api_interaction.get_wiki);


  app.get('/home',function(req,res){
    console.log('serving home page');
    filePath = path.join(__dirname, "../public/googlemaps.html");
    file = fs.readFileSync(filePath);
    res.writeHead(200,{'Content-Type' : 'text/html'});
    res.end(file);
  });

  app.post('/',function(req,res){
    var body='';
    var chunkrec; 
    req.on('data',function(chunk){
      console.log('typeof chunk',typeof(chunk));
      console.log('chunk',chunk);
      body += chunk;
      console.log('typeof body:',typeof(body));
      console.log('body',body);
    });
    req.on('end',function(chunk){
      body=JSON.parse(body);
      console.log('end of request, the body is',body.text);
      request({
        uri: 'http://api.ttsengine.com/v1/tts?',
        encoding: null,
        qs:{'text': body.text,
            'format': 'mp3',
            'key': '567531a6abe069c1f6b8419873292522'},
        method: "GET"
        }, function(error, response, results) {
          //console.log(response)
          if (!error && response.statusCode == 200) {
            console.log('type of results',typeof(results));
            res.writeHead(200,{'Content-Type' : 'audio/x-mp3'});
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
};