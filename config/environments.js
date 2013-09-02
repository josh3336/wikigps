var express = require('express');

module.exports = function(app) {
  // development only
  if (app.get('env') === 'development') {
    app.use(express.errorHandler());
  }
  
};
