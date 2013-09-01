var pagehome_init = function() {
  $('#pagehome').on('pagebeforeshow',function(){
    try{
      (mapHelper.center_map(Session['navmarker']));
    }
    catch(err){
      console.log('error',err);
    }
    if($('#favcontent').length){
      $('#content').prepend($('#favcontent').find('.map'));
        mapHelper.place_markers(Session['markers']); 
    }
  });
  sound_click();
  check_sound('#pagehome');
  $.mobile.page.prototype.options.domCache = true;
};

var pagefav_init = function() {
  $('#pagefav').on('pagebeforeshow',function() {
    $('#favcontent').prepend($('#pagehome').find('.map'));
    append_favlist(Session.markers);
    mapHelper.remove_markers(Session.markers);
    var favmarkers=mapHelper.return_favmarkers(Session['markers']);
    mapHelper.reset_colors(favmarkers);
    mapHelper.place_markers(favmarkers);
    mapHelper.check_focusmarker(favmarkers);
    //mapHelper.fit_bounds(Session.markers)
    $('#favlistAddr li').bind('click', function() {
        console.log('wtf click');
        mapHelper.panto_marker(this);
        $('#favlistAddr li').attr("data-theme", "c").removeClass("ui-btn-up-b").removeClass('ui-btn-hover-b').addClass("ui-btn-up-c").addClass('ui-btn-hover-c');
        $(this).attr("data-theme", "b").removeClass("ui-btn-up-c").removeClass('ui-btn-hover-c').addClass("ui-btn-up-b").addClass('ui-btn-hover-b');
        // $('#listwikifocus').html('')
        // $('#listwikifocus').append($('#wikifocus').children())
        // toggle_markers(Session.markers)
        //$(this).trigger('click')
        $("#favlist").listview("refresh");
      });
      click_focused('fav');
      $("#favlist").listview("refresh");

     //fix becuse soundbutton is getting binded twice
     $('.soundbutton').unbind('click');
    });
  check_sound('#pagefav');
};

var pagelist_init = function() {

  $('#pagelist').on('pageinit',function(){
    append_proxlist(7);
    $('#listAddr li').bind('click', function () {
      var focusmarkerid = focusmarker_place();
      if($(this).attr('data-theme')!='b' && $(this).attr('id')!=focusmarkerid){
        google.maps.event.trigger(Session.markers[parseInt($(this).attr('id'))],'click');
      }
      $('#listAddr li').attr("data-theme", "c").removeClass("ui-btn-up-b").removeClass('ui-btn-hover-b').addClass("ui-btn-up-c").addClass('ui-btn-hover-c');
      $(this).attr("data-theme", "b").removeClass("ui-btn-up-c").removeClass('ui-btn-hover-c').addClass("ui-btn-up-b").addClass('ui-btn-hover-b');
      $("#list").listview("refresh");
    });
    $($(this).find('li')[0]).trigger('click');
    click_focused();
    });
    $('#pagelist').on('pagebeforeshow',function(){
      click_focused()
    });
    check_sound('#pagelist');
  };


