function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, error);
  } else {
    alert('geolocation not supported');
  }

  function success(position) {
    console.log('posting');
    CurrentLocation= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var mapOptions = {
      center: CurrentLocation,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    //sets current position onto map
    var navmarker = new google.maps.Marker({
      position: CurrentLocation,
      title:"current position!",
      animation: google.maps.Animation.DROP,
      icon:"http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      draggable:true
    });
    google.maps.event.addListener(navmarker,'dragend',function(){  
      console.log(navmarker.position.lat());
      console.log(navmarker.getPosition());
      map.setCenter(navmarker.getPosition());
      markers = getmarkers_prox(navmarker,markers);
      google.maps.event.trigger(markers[0],'click');
      //document.getElementById('lat').value = navmarker.position.lat();
      //document.getElementById('lng').value = navmarker.position.lng();
    });
    navmarker.setMap(map);
    //grab local wiki entries and place onto map include listener if clicked
    handle_posts(position.coords.latitude,position.coords.longitude,function(data){
      markers = place_wikilocations(data,map);
    });
  }
  function error(msg) {
    console.log('errror',msg);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
