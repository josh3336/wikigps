var listHelper = (function(){
  listHelper={};

  listHelper.append_proxlist = function(numbertoappend) {
    //$('#list').html('')
    $('#list').html('');
    if(Session.markers.length > 0){
      for (var i = 0 ; i < numbertoappend; i++){
        $('#list').append("<li id="+i+"><a href='#'>"+ Session.markers[i].title +'<br>'+'<span id="distance">'+Session.markers[i].distancefromnav.toFixed() +' m'+'</span>'+"</a></li>");
      }
    }
    $("#list").listview("refresh");
  };

  listHelper.append_favlist = function(markers) {
    $('#favlist').html('');
    for (var i = 0; i < Session.markers.length; i++){
      if(Session.markers[i]['starred']===true){
        $('#favlist').append("<li id='fav"+i.toString()+"'><a href='#'>"+ Session.markers[i].title +"</a></li>");
      }
    }
    $("#favlist").listview("refresh");
  };

  listHelper.click_focused = function(list) {
    list = list || '';
    for (var i = 0; i < Session.markers.length; i++){
      if(Session.focusmarker === Session.markers[i]){
        $('#' + list + i.toString()).trigger('click');
      }
    }
  };

  listHelper.focusmarker_place = function() {
    for (var i = 0 ; i < Session.markers.length; i++){
      if (Session.markers[i] === Session.focusmarker){
        return i.toString();
      }
    }
  };
  return listHelper;
}());

