var pagehome_init = function() {
  $('#pagehome').on('pagebeforeshow',function(){
    try{
      (center_map(Session['navmarker']));
    }
    catch(err){
      console.log('error',err);
    }
    if($('#favcontent').length){
      $('#content').prepend($('#favcontent').find('.map'));
    place_markers(Session['markers']); 
    }
  });
  sound_click();
  check_sound('#pagehome');
};

var pagefav_init = function() {
  $('#pagefav').on('pagebeforeshow',function() {
      $('#favcontent').prepend($('#pagehome').find('.map'));
      append_favlist(Session.markers);
      remove_markers(Session.markers);
      var favmarkers=return_favmarkers(Session['markers']);
      reset_colors(favmarkers);
      place_markers(favmarkers);
      check_focusmarker(favmarkers);
      //fit_bounds(Session.markers)
    $('#favlistAddr li').bind('click', function() {
        console.log('wtf click');
        panto_marker(this);
        $('#favlistAddr li').attr("data-theme", "c").removeClass("ui-btn-up-b").removeClass('ui-btn-hover-b').addClass("ui-btn-up-c").addClass('ui-btn-hover-c');
        $(this).attr("data-theme", "b").removeClass("ui-btn-up-c").removeClass('ui-btn-hover-c').addClass("ui-btn-up-b").addClass('ui-btn-hover-b');
        // $('#listwikifocus').html('')
        // $('#listwikifocus').append($('#wikifocus').children())
        // toggle_markers(Session.markers)
        //$(this).trigger('click')
        $("#favlist").listview("refresh");
      });
      click_focused('fav')
      $("#favlist").listview("refresh");

     //fix becuse soundbutton is getting binded twice
     $('.soundbutton').unbind('click');
    });
  check_sound('#pagefav');
};

var pagelist_init = function() {
  debugger
  $('#pagelist').on('pageinit',function(){
    debugger
    append_proxlist(7);
    $('#listAddr li').bind('click', function () {
      if($(this).attr('data-theme')!='b'){
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


