var toggle_markers = function(markers){
  for ( var i = 0 ; i < markers.length; i++){
    Session.markers[i].setVisible(!markers[i].getVisible());
  }
  return Session.markers;
};

var place_markers = function (markers){
  for ( var i = 0 ; i < markers.length; i ++){
    markers[i].setMap(map);
  }
};

var center_map = function (marker){
  map.setCenter(marker.getPosition());
}
var return_favmarkers = function (markers){
  var fav_markers=[];
  for (var i =0; i < markers.length; i ++){
    if (Session.markers[i].starred===true){
      fav_markers.push(Session.markers[i]);
    }
  }
  return fav_markers;
};

var remove_markers = function (markers){
  for ( var i = 0 ; i < markers.length; i++){
    markers[i].setMap(null);
  }
  return markers;
};

var panto_marker = function (that,marker){
  that = that || marker;
  if (!marker){
    marker=Session.markers[parseInt($(that).attr('id').slice(3))];
    map.panTo(marker.getPosition());
    google.maps.event.trigger(marker,'click');

  }
  else{
    map.panTo(marker.getPosition());
  }
}

var keep_favorites = function (markers){
  var fav_markers=[];
  for (var i =0; i < markers.length; i ++){
    if (markers[i].starred===true){
      fav_markers.push(markers[i]);
    }
  }
  return fav_markers;
};

var reset_colors = function(markers){
  for (var i = 0 ; i < markers.length; i++){
    if (focusmarker != markers[i]){
      Session.markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
    }
  }
};

var fit_bounds = function (markers){
  var latlngbounds = new google.maps.LatLngBounds(null);
  for ( var i = 0; i < Session.markers.length; i ++){
    latlngbounds.extend(Session.markers[i].getPosition());
    }
    latlngbounds.extend(Session.navmarker.getPosition());
    map.fitBounds(latlngbounds);
} ;
