function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert('geolocation not supported');
  }

  function success(position) {
    console.log('posting');
    var myLatlng= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
    //sets current position onto map
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"current position!"
    });
    marker.setMap(map);
    //grab local places and set onto map
    handle_posts(position.coords.latitude,position.coords.longitude,function(data){
         //console.log('--------data--',data)
         results=JSON.parse(data);
         markers=[]
         for(var i = 0 ; i < results.articles.length; i++){
            results.articles[i]['id'];
            var myLatlng= new google.maps.LatLng(results.articles[i]['lat'],results.articles[i]['lng']);
            var markerb= new google.maps.Marker({
              position: myLatlng,
              title: results.articles[i]['title']
            })
            markers.push(markerb)
            google.maps.event.addListener(markers[i], 'click', function() {
              console.log(this.title);
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