/**
 * places markers for a set of data on map
 * @param {String} data
 * @param {object} map
 * @return {array} markers
 */
var place_wikilocations = function(data,map){
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
  return markers
};

/**
 * determines proximity of markers away from nav and returns a sorted list of 
 * markers by distanceaway
 * @param {object} currentloc
 * @param {array} otherlocations
 */
var getmarkers_prox = function(currentloc, otherlocations){

  for(var markerind = 0 ; markerind < otherlocations.length; markerind++){
    a = currentloc.position.lat() - otherlocations[markerind].position.lat();
    b = currentloc.position.lng() - otherlocations[markerind].position.lng();
    c = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
    otherlocations[markerind]['distancefromnav'] = c;
  }
  otherlocations.sort(function(a,b){
    return a.distancefromnav - b.distancefromnav
  })
  console.log(otherlocations)
  return otherlocations
}