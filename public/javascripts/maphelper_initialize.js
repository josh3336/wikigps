function initialize() {
  Favorites=[];
  markers=[];
  Focusmarker ={};
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('geolocation not supported');
  }

  function success(position) {
    markers=keep_favorites(markers);
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

    navmarker = new google.maps.Marker({
      position: CurrentLocation,
      title:"current position!",
      icon:"../blue_dot_circle.png",
      draggable:true
    });
    navmarker.setMap(map);

    //grab local wiki entries and place onto map include listener if clicked
    handle_posts(position.coords.latitude,position.coords.longitude,function(data){
      place_markers(markers);
      markers = place_newwikilocations(data,map);
      markers = getmarkers_prox(navmarker,markers);
      navigator.geolocation.watchPosition(watchsuccess,watcherror);
      google.maps.event.trigger(markers[0],'click');
    });

    google.maps.event.addListener(navmarker,'dragend',function(){  
      console.log(navmarker.position.lat());
      console.log(navmarker.getPosition());
      center_map(navmarker);
      markers = getmarkers_prox(navmarker,markers);
      console.log('haversine distance',haversine(CurrentLocation,navmarker.getPosition()));
      if(haversine(CurrentLocation,navmarker.getPosition())>500){
        console.log('distance is greater then 500');
        var geoposition = {coords : {}};
        geoposition['coords']['latitude'] = navmarker.position.lat();
        geoposition['coords']['longitude'] = navmarker.position.lng();
        success(geoposition); 
      }
      else{
        google.maps.event.trigger(markers[0],'click');
      }
      //document.getElementById('lat').value = navmarker.position.lat();
      //document.getElementById('lng').value = navmarker.position.lng();
    });

  }
  function error(msg) {
    console.log('errror',msg);
  }



  function watchsuccess(position){

    var navlocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    navmarker.setPosition(navlocation);

    console.log('watchposition lat:',position.coords.latitude,position.coords.longitude)

    map.setCenter(navmarker.getPosition());
    markers = getmarkers_prox(navmarker,markers);
    google.maps.event.trigger(markers[0],'click');

    console.log('haversine distance',haversine(CurrentLocation,navmarker.getPosition()));
    if(haversine(CurrentLocation,navmarker.getPosition())>500){
      console.log('distance is greater then 500');
      var geoposition = {coords : {}};
      geoposition['coords']['latitude'] = navmarker.position.lat();
      geoposition['coords']['longitude'] = navmarker.position.lng();
      success(geoposition); 
      handle_posts(position.coords.latitude,position.coords.longitude,function(data){
        markers = place_wikilocations(data,map);
        markers = getmarkers_prox(navmarker,markers);
        google.maps.event.trigger(markers[0],'click');
      });
    }
  }
  function watcherror(error){
    watcherror('error');

  }
}
google.maps.event.addDomListener(window, 'load', initialize);
