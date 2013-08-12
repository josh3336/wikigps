var star_on_click = function(){
$('.star').on('click', function(event){
  debugger
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

var sound_click = function () {
  $('.soundbutton').on('click',function(){
    debugger
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

var check_sound = function (page) {
  $(page).on('pagebeforeshow',function(){
    if( Session.sound){
      $('.soundbutton').find('.ui-icon').addClass('makeGreen');
    }
    else{
      $('.soundbutton').find('.ui-icon').addClass('makeRed');
    }
  });
}

var check_star = function (marker) {
  if (marker.starred === true ){
    $('.star'.trigger('click'))
  }
}

//after dragging navmarker check to see if a new query for locations is needed
var on_dragend = function () {
   google.maps.event.addListener(Session.navmarker,'dragend',function(){  
      console.log(Session.navmarker.position.lat());
      console.log(Session.navmarker.getPosition());
      center_map(Session.navmarker);
      Session.markers = getmarkers_prox(Session.navmarker,Session.markers);
      console.log('haversine distance',haversine(Session.startlocation,Session.navmarker.getPosition()));
      if(haversine(Session.startlocation,Session.navmarker.getPosition())>500){
        console.log('distance is greater then 500');
        var geoposition = {coords : {}};
        geoposition['coords']['latitude'] = Session.navmarker.position.lat();
        geoposition['coords']['longitude'] = Session.navmarker.position.lng();
        get_and_map_entries(geoposition); 
      }
      else{
        google.maps.event.trigger(Session.markers[0],'click');
      }
    });
}