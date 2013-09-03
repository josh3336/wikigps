event_handlers = (function() {
  event_handlers = {};
  event_handlers.star_on_click = function() {
    $('.star').on('click', function(event) {
      console.log('clicked yellow');
      text = $(this).prev().text();
      for (var i=0; i < Session.markers.length; i++){
        if (text===Session.markers[i].title){
          Session.markers[i]['starred']=!Session.markers[i]['starred'];
          if (Session.markers[i]['starred']){
            $('.star').addClass('makeYellow');
          }
          else{$(this).removeClass('makeYellow');}
          return;
        }
      }
    });
  };

  event_handlers.sound_click = function() {
    $('.soundbutton').on('click',function() {
      Session.sound = !Session.sound;
      if( Session.sound){
        $(this).find('.ui-icon').addClass('makeGreen');
        $(this).find('.ui-icon').removeClass('makeRed');
      }
      else{
        $(this).find('.ui-icon').removeClass('makeGreen');
        $(this).find('.ui-icon').addClass('makeRed');
      }
    });
  };

  event_handlers.check_sound = function(page) {
    $(page).on('pagebeforeshow',function(){
      if( Session.sound){
        $('.soundbutton').find('.ui-icon').addClass('makeGreen');
        $('.soundbutton').find('.ui-icon').removeClass('makeRed');

      }
      else{
        $('.soundbutton').find('.ui-icon').addClass('makeRed');
        $('.soundbutton').find('.ui-icon').removeClass('makeGreen');
      }
    });
  };

//not used
  event_handlers.check_star = function(marker) {
    if (marker.starred === true ){
      $('.star'.trigger('click'));
    }
  };

  event_handlers.marker_click_listener = function(index){
    google.maps.event.addListener(Session.markers[index], 'click', function() {
      if ( Session.focusmarker.title && Session.focusmarker['starred']!==true){
        Session.focusmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
      }
      else if(Session.focusmarker && Session.focusmarker['starred']===true){
        Session.focusmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
      }
      this.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
      console.log(this);
      Session.focusmarker = this;
      //$('#wikifocus').load('http://en.m.wikipedia.org/w/index.php?curid=693612 #content-wrapper');
      console.log('titlebefore',this.title);
      if (this.info){mapHelper.place_info(this,this.info);}
      else {grab_wiki(this);}

    });
  };

//after dragging navmarker check to see if a new query for locations is needed
  event_handlers.on_dragend = function() {
   google.maps.event.addListener(Session.navmarker,'dragend',function(){
      console.log(Session.navmarker.position.lat());
      console.log(Session.navmarker.getPosition());
      mapHelper.center_map(Session.navmarker);
      Session.markers = getmarkers_prox(Session.navmarker,Session.markers);
      console.log('haversine distance',haversine(Session.startlocation,Session.navmarker.getPosition()));
      if(haversine(Session.startlocation,Session.navmarker.getPosition())>800){
        console.log('distance is greater then 800');
        var geoposition = {coords : {}};
        geoposition['coords']['latitude'] = Session.navmarker.position.lat();
        geoposition['coords']['longitude'] = Session.navmarker.position.lng();
        Session.startlocation = Session.navmarker.getPosition();
        mapHelper.get_and_map_entries(geoposition);
      }
      else{
        if (Session.focusmarker != Session.markers[0]){
          google.maps.event.trigger(Session.markers[0],'click');
        }
      }
      $('#pagelist').trigger('pageinit');
    });
  };
  return event_handlers;
}());