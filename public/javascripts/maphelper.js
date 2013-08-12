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

var check_focusmarker = function (favorites){
  for (var i = 0; i < favorites.length; i++){
    if (favorites[i] === Session.focusmarker){
      center_map(Session.focusmarker);
    }
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
    if (Session.focusmarker != markers[i]){
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

var setmap_onpage = function (position) {
  Session.startlocation= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
  var mapOptions = {
    center: Session.startlocation,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);

  //sets current position onto map
  // need following code if i have to test drag feature
  Session.navmarker = new google.maps.Marker({
    position: Session.startlocation,
    title:"current position!",
    icon:"../blue_dot_circle.png",
    draggable:true
  });
  Session.navmarker.setMap(map);
}

var get_and_map_entries = function (position) {
    if (Session.markers.length > 0) {
      remove_markers(Session.markers);
    }
    Session['markers'] = keep_favorites(Session['markers']);
    debugger;
   //grab local wiki entries and place onto map include listener if clicked
    grab_local(position.coords.latitude,position.coords.longitude,function(data){
      // place_markers(Session['markers']);
      Session.markers = place_newwikilocations(data,map);
      Session.markers = getmarkers_prox(Session.navmarker,Session.markers);
     // navigator.geolocation.watchPosition(watchsuccess,watcherror);
      $.mobile.loadPage('list', { showLoadMsg: false });
      $.mobile.loadPage('favorites', {showLoadMsg: false});
      
      debugger;
      $('#pagelist').trigger('pageinit');
      //google.maps.event.trigger(Session.markers[0],'click');
    });

    on_dragend()

}


