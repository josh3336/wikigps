
var append_proxlist = function(numbertoappend){
  //$('#list').html('')
  for (var i = 0 ; i < numbertoappend; i++){
    $('#list').append("<li id="+i+"><a href='#'>"+ markers[i].title +'<br>'+'<span id="distance">'+markers[i].distancefromnav.toFixed() +' m'+'</span>'+"</a></li>");
  }
  $("#list").listview("refresh");
};

var append_favlist = function (markers){
  for ( var i = 0 ; i < markers.length; i++){
    if(markers[i]['starred']===true){
      $('#favlist').append("<li id='fav"+i.toString()+"'><a href='#'>"+ markers[i].title +"</a></li>");
    }
  }
  $("#favlist").listview("refresh");
};





