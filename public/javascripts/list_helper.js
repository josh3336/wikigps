
var append_proxlist = function(numbertoappend){
  //$('#list').html('')
  for (var i = 0 ; i < numbertoappend; i++){
    $('#list').append("<li id="+i+"><a href='#'>"+ markers[i].title +'<br>'+'<span id="distance">'+markers[i].distancefromnav.toFixed() +' m'+'</span>'+"</a></li>");
  }
  $("#list").listview("refresh");
};

var append_favlist = function (favorites){
  for ( var i = 0 ; i < favorites.length; i++){
    $('#favlist').append("<li><a href='#'>"+ favorites[i].title +"</a></li>");
  }
  $("#favlist").listview("refresh");
};





