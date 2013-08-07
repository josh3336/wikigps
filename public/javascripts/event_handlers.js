var star_click = function(){
$('#star').on('click', function(event){
  console.log('clicked yellow');
  $(this).toggleClass('makeYellow');
  text = $(this).prev().text()
  for (var i = 0 ; i < markers.length; i++){
    if ( text === markers[i].title){
      Favorites.push(jQuery.extend({},markers[i]));
      break;
    }
  }

});
};