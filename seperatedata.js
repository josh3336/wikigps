exports.setupformap = function(results){
  console.log(results.articles.length)
  console.log(results.articles)
  for (var i = 0 ; i < results.articles.length ; i++){
    console.log(results.articles[i]['id'])
  }
}