var star_click = function(){
$('#star').on('click', function(event){
  console.log('clicked yellow');
  $(this).toggleClass('makeYellow');
  text = $(this).prev().text();
  for (var i=0; i < Session.markers.length; i++){
    if (text===Session.markers[i].title){
      Session.markers[i]['starred']=!Session.markers[i]['starred'];
      return;
    }
  }
});
};

var sound_click = function () {
  $('.soundbutton').on('click',function(){
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

var check_sound = function(page){
  $(page).on('pagebeforeshow',function(){
    if( Session.sound){
      $('.soundbutton').find('.ui-icon').addClass('makeGreen');
    }
    else{
      $('.soundbutton').find('.ui-icon').addClass('makeRed');
    }
  });
}
// var marker_click = function (marker,focusmarker){
//   google.maps.event.addListener(marker, 'click', function() {
//   if ( focusmarker && focusmarker['starred']!=true){
//     focusmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
//   }
//   else if(focusmarker && focusmarker['starred']===true){
//     focusmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');
//   }
//   this.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
//   console.log(this);
//   //$('#wikifocus').load('http://en.m.wikipedia.org/w/index.php?curid=693612 #content-wrapper');
//   console.log('titlebefore',this.title);
//   grab_wiki(this.wikiID,this.title,this.wikiurl);
//   focusmarker = this;
// });
// }