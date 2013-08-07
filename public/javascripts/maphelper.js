var toggle_markers = function(markers){
  for ( var i = 0 ; i < markers.length; i++){
    markers[i].setVisible(!markers[i].getVisible());
  }
  return markers;
}