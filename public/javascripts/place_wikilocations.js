/**
 * places Session.markers for a set of data on map
 * @param {String} data
 * @param {object} map
 * @return {array} Session.markers
 */
var place_newwikilocations = function(data,map){
  var results=JSON.parse(data);
  Session.focusmarker = {};
  for(var i = 0 ; i < results.articles.length; i++){
    var myLatlng= new google.maps.LatLng(results.articles[i]['lat'],results.articles[i]['lng']);
    var markerb= new google.maps.Marker({
      position: myLatlng,
      title: results.articles[i]['title'],
      wikiurl: results.articles[i]['mobileurl'],
      wikiID: results.articles[i]['id'],
      info : false,
      starred: false,
      soundclip: false
    });
    Session.markers.push(markerb);
    event_handlers.marker_click_listener(i);
    markerb.setMap(map);
  }
  return Session.markers;
};

/**
 * uses haversine formula to return distance between two coordinates in meters
 * @param {object} location_1
 * @param {object} location_2
 * @return {Number} d
 */
var haversine = function(location_1,location_2){  
  Number.prototype.toRad = function() {
     return this * Math.PI / 180;
  };
  var lat2 = location_2.lat(); 
  var lon2 = location_2.lng(); 
  var lat1 = location_1.lat(); 
  var lon1 = location_1.lng(); 

  var R = 6371; // km 
  //has a problem with the .toRad() method below.
  var x1 = lat2-lat1;
  var dLat = x1.toRad();  
  var x2 = lon2-lon1;
  var dLon = x2.toRad();  
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
                  Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2);  
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; 

  return d * 1000;

};
/**
 * determines proximity of Session.markers away from nav and returns a sorted list of 
 * Session.markers by distanceaway
 * @param {object} currentloc
 * @param {array} otherlocations
 */
var getmarkers_prox = function(currentloc, otherlocations){
  for(var markerind = 0 ; markerind < otherlocations.length; markerind++){
    otherlocations[markerind]['distancefromnav']=
      haversine(currentloc.position,otherlocations[markerind].position);
  }
  otherlocations.sort(function(a,b){
    return a.distancefromnav - b.distancefromnav
  })
  return otherlocations
}