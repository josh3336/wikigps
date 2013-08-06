
var append_proxlist = function(numbertoappend){
  //$('#list').html('')
  for (var i = 0 ; i < numbertoappend; i++){
    $('#list').append("<li><a href='#'>"+ markers[i].title +'<br>'+'<span id="distance">'+markers[i].distancefromnav.toFixed() +' m'+'</span>'+"</a></li>")
  }
  $("#list").listview("refresh");
}

console.log('hlkasdjfl;dksj')



