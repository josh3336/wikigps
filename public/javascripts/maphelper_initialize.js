function initialize() {
  Session.markers=[];
  Session.focusmarker ={};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('geolocation not supported');
  }

  function success(position) {
    setmap_onpage(position);
    get_and_map_entries(position);
   
  }

  function error(msg) {
    console.log('errror',msg);
  }

  function watchsuccess(position){
    debugger
    var navlocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    Session.navmarker.setPosition(navlocation);

    console.log('watchposition lat:',position.coords.latitude,position.coords.longitude)

    map.setCenter(Session.navmarker.getPosition());
    Session.markers = getmarkers_prox(Session.navmarker,Session.markers);
    google.maps.event.trigger(Session.markers[0],'click');

    console.log('haversine distance',haversine(CurrentLocation,Session.navmarker.getPosition()));
    if(haversine(CurrentLocation,Session.navmarker.getPosition())>500){
      console.log('distance is greater then 500');
      var geoposition = {coords : {}};
      geoposition['coords']['latitude'] = Session.navmarker.position.lat();
      geoposition['coords']['longitude'] = Session.navmarker.position.lng();
      success(geoposition); 
      grab_local(position.coords.latitude,position.coords.longitude,function(data){
        Session.markers = place_wikilocations(data,map);
        Session.markers = getmarkers_prox(Session.navmarker,Session.markers);
        google.maps.event.trigger(Session.markers[0],'click');
      });
    }
  }
  
  function watcherror(error){
    watcherror('error');

  }
}
google.maps.event.addDomListener(window, 'load', initialize);
