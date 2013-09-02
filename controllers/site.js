var site = module.exports = {};

site.index = function(req, res){
  res.render('index.html');
};

site.list = function(req,res){
	res.render('list.html');
};

site.favorites = function(req,res){
	res.render('favorites.html');
};