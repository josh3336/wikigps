var fs = require('fs');
var request = require("request");
var path = require('path');
var site = require('../controllers/site.js');
var api_interaction = require('../controllers/api_interaction.js');

module.exports = function(app){
  app.get('/', site.index);
  app.get('/list', site.list);
  app.get('/favorites', site.favorites);
  app.post('/home', api_interaction.get_local_wikis);
  app.post('/wiki',api_interaction.get_wiki);
  app.post('/',api_interaction.get_sound);
};