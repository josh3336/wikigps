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
        icon:"http://maps.google.com/mapfiles/ms/icons/green-dot.png"
        draggable:true
    });
    navmarker.setMap(map);
    //grab local places and set onto map
    handle_posts(position.coords.latitude,position.coords.longitude,function(data){
         //console.log('--------data--',data)
         var results=JSON.parse(data);
         var markers=[];
         var focusmarker;
         for(var i = 0 ; i < results.articles.length; i++){
            var myLatlng= new google.maps.LatLng(results.articles[i]['lat'],results.articles[i]['lng']);
            var markerb= new google.maps.Marker({
              position: myLatlng,
              title: results.articles[i]['title'],
              wikiurl: results.articles[i]['mobileurl'],
              wikiID: results.articles[i]['id']
            });
            markers.push(markerb);
            google.maps.event.addListener(markers[i], 'click', function() {
              if ( focusmarker ){
                focusmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
              }
              this.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
              console.log(this);
              //$('#wikifocus').load('http://en.m.wikipedia.org/w/index.php?curid=693612 #content-wrapper');
              grab_wikis(this.wikiID);
              focusmarker = this;
            }); 
            markerb.setMap(map);
        }
    });
  }
  function error(msg) {
    console.log('errror',msg);
  }
}

google.maps.event.addDomListener(window, 'load', initialize);