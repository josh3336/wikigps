var toggle_markers = function(markers){
  for ( var i = 0 ; i < markers.length; i++){
    markers[i].setVisible(!markers[i].getVisible());
  }
  return markers;
};

var place_markers = function (markers){
  for ( var i = 0 ; i < markers.length; i ++){
    markers[i].setMap(map);
  }
};

var return_favmarkers = function (markers){
  var fav_markers=[];
  for (var i =0; i < markers.length; i ++){
    if (markers[i].starred===true){
      fav_markers.push(markers[i]);
    }
  }
  return fav_markers
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
    marker=markers[parseInt($(that).attr('id').slice(3))];
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
      markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
    }
  }
};

var fit_bounds = function (markers){
  var latlngbounds = new google.maps.LatLngBounds(null);
  for ( var i = 0; i < markers.length; i ++){
    latlngbounds.extend(markers[i].getPosition());
    }
    latlngbounds.extend(navmarker.getPosition());
    map.fitBounds(latlngbounds);
} ;
