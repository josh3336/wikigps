function initialize() {
  Session.markers=[];
  Session.focusmarker ={};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('geolocation not supported');
  }

  function success(position) {
    Session['markers']=keep_favorites(Session['markers']);
    CurrentLocation= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var mapOptions = {
      center: CurrentLocation,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    //sets current position onto map
    // need following code if i have to test drag feature

    Session.navmarker = new google.maps.Marker({
      position: CurrentLocation,
      title:"current position!",
      icon:"../blue_dot_circle.png",
      draggable:true
    });
    Session.navmarker.setMap(map);

    //grab local wiki entries and place onto map include listener if clicked
    handle_posts(position.coords.latitude,position.coords.longitude,function(data){
      place_markers(Session['markers']);
      Session.markers = place_newwikilocations(data,map);
      Session.markers = getmarkers_prox(Session.navmarker,Session.markers);
      navigator.geolocation.watchPosition(watchsuccess,watcherror);
      $.mobile.loadPage('list', { showLoadMsg: false });
      $.mobile.loadPage('favorites', {showLoadMsg: false});
      google.maps.event.trigger(Session.markers[0],'click');
    });

    google.maps.event.addListener(Session.navmarker,'dragend',function(){  
      console.log(Session.navmarker.position.lat());
      console.log(Session.navmarker.getPosition());
      center_map(Session.navmarker);
      Session.markers = getmarkers_prox(Session.navmarker,Session.markers);
      console.log('haversine distance',haversine(CurrentLocation,Session.navmarker.getPosition()));
      if(haversine(CurrentLocation,Session.navmarker.getPosition())>500){
        console.log('distance is greater then 500');
        var geoposition = {coords : {}};
        geoposition['coords']['latitude'] = Session.navmarker.position.lat();
        geoposition['coords']['longitude'] = Session.navmarker.position.lng();
        success(geoposition); 
      }
      else{
        google.maps.event.trigger(Session.markers[0],'click');
      }
    });

  }
  function error(msg) {
    console.log('errror',msg);
  }



  function watchsuccess(position){

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
      handle_posts(position.coords.latitude,position.coords.longitude,function(data){
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
