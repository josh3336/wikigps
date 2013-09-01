var mapHelper = (function(){
  mapHelper = {};

  mapHelper.toggle_markers = function(markers){
    for ( var i = 0 ; i < markers.length; i++){
      Session.markers[i].setVisible(!markers[i].getVisible());
    }
    return Session.markers;
  };

  mapHelper.place_markers = function (markers){
    for ( var i = 0 ; i < markers.length; i ++){
      markers[i].setMap(map);
    }
  };

  mapHelper.center_map = function (marker){
    map.setCenter(marker.getPosition());
  };

  mapHelper.return_favmarkers = function (markers){
    var fav_markers=[];
    for (var i =0; i < markers.length; i ++){
      if (Session.markers[i].starred===true){
        fav_markers.push(Session.markers[i]);
      }
    }
    return fav_markers;
  };

  mapHelper.remove_markers = function (markers){
    for ( var i = 0 ; i < markers.length; i++){
      markers[i].setMap(null);
    }
    return markers;
  };

  mapHelper.panto_marker = function (that,marker){
    that = that || marker;
    if (!marker){
      marker=Session.markers[parseInt($(that).attr('id').slice(3))];
      map.panTo(marker.getPosition());
      google.maps.event.trigger(marker,'click');

    }
    else{
      map.panTo(marker.getPosition());
    }
  };


  mapHelper.check_focusmarker = function (favorites){
    for (var i = 0; i < favorites.length; i++){
      if (favorites[i] === Session.focusmarker){
        mapHelper.center_map(Session.focusmarker);
      }
    }
  };

  mapHelper.keep_favorites = function (markers){
    var fav_markers=[];
    for (var i =0; i < markers.length; i ++){
      if (markers[i].starred===true){
        fav_markers.push(markers[i]);
      }
    }
    return fav_markers;
  };


  mapHelper.reset_colors = function(markers){
    for (var i = 0 ; i < markers.length; i++){
      if (Session.focusmarker != markers[i]){
        Session.markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      }
    }
  };

  mapHelper.fit_bounds = function (markers){
    var latlngbounds = new google.maps.LatLngBounds(null);
    for ( var i = 0; i < Session.markers.length; i ++){
      latlngbounds.extend(Session.markers[i].getPosition());
    }
    latlngbounds.extend(Session.navmarker.getPosition());
    map.fitBounds(latlngbounds);
  };

  mapHelper.setmap_onpage = function (position) {
    Session.startlocation= new google.maps.LatLng(position.coords.latitude,position.coords.longitude) || Session.startlocation;
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

    on_dragend();
  };

  mapHelper.get_and_map_entries = function (position) {
    if (Session.markers.length > 0) {
      mapHelper.remove_markers(Session.markers);
    }
    Session['markers'] = mapHelper.keep_favorites(Session['markers']);
   //grab local wiki entries and place onto map include listener if clicked
    grab_local(position.coords.latitude,position.coords.longitude,function(data){
      // mapHelper.place_markers(Session['markers']);
      Session.markers = place_newwikilocations(data,map);
      Session.markers = getmarkers_prox(Session.navmarker,Session.markers);
     // navigator.geolocation.watchPosition(watchsuccess,watcherror);
      $.mobile.loadPage('list', { showLoadMsg: false });
      $.mobile.loadPage('favorites', {showLoadMsg: false});
      
      $('#pagelist').trigger('pageinit');
      //google.maps.event.trigger(Session.markers[0],'click');
    });
  };

  mapHelper.place_info = function (marker, wikiinfo) {
    marker.info = wikiinfo;
    wikiinfo = JSON.parse(wikiinfo);
    var wikip;
    // append this list to the document body
    $('#wikifocus').html('');
    $('#wikifocus').append('<h3><a rel="external" targe="_blank" href='+marker.wikiurl+'>'+marker.title+'</a></h3>');
    $('#wikifocus').append('<div id=buttonPlaceHolder></div>');
    $('h3').append('<a href="#" data-role="button" data-icon="star" data-iconpos="notext" data-inline="true" class="star"></a>');


    var el = $('<div></div>');//make fake dom element
    el.html(wikiinfo.query.pages[marker.wikiID].revisions[0]['*']);//grabs whole first section an append to dom
    console.log(el);
    //checks to make sure img isn't a wiki img if so adds
    images=el.find('img');
    if(images){
      for(var i = 0 ; i < images.length; i++){
        if (images[i].src.slice(0,40) != 'http://upload.wikimedia.org/wikipedia/en') {
          $('#wikifocus').append(images[i]);
          break;
        }
      }
    }
    //handle weird cases where coordinates are first <p>
    if(el.children().closest('p').find('#coordinates').length > 0){
      wikip = $('#wikifocus').append(el.children().closest('p')[1]);
    }
    else{
      wikip = $('#wikifocus').append(el.children().closest('p')[0]);
    }
    wikip = wikip.find('p');
    wikip = $(wikip).prop('outerHTML');
    var p_text = html_to_string(wikip);
    p_text = p_text.split('. ')[0];
    if (Session.sound === true){get_sound(p_text.slice(0,60));}
    //append to list wikifocus if it exists
    var content = $('#wikifocus').children().clone();
    $('#listwikifocus').html('');
    $('#listwikifocus').append(content);
    //parse through and add html tags to all ahrefs
    var links = $('#wikifocus').find('a');
    for (var linkind = 2; linkind < links.length; linkind++){
      links[linkind].href = 'http://en.m.wikipedia.org/' + links[linkind].href.slice(22);
    }
   // $("#favlist").listview("refresh");
  //  $("#listtorefresh").listview("refresh");
    $('#pagehome').trigger('create');
    $('#pagelist').trigger('create');
    star_on_click();
    if(Session.focusmarker.starred === true){
      $('.star').addClass('makeYellow');
    }
  };
  return mapHelper;
})();