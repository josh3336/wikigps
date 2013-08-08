var star_click = function(){
$('#star').on('click', function(event){
  console.log('clicked yellow');
  $(this).toggleClass('makeYellow');
  text = $(this).prev().text()
  for (var i=0; i < markers.length; i++){
    if (text===markers[i].title){
      markers[i]['starred']=!markers[i]['starred']
      return
    }
  }
});
};

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