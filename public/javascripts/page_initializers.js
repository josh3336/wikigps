var page_init = (function(){
  page_init = {};

  page_init.home = function() {
    console.log('pagehome init');
    $('#pagehome').on('pagebeforeshow',function(){
      try{
        (mapHelper.center_map(Session['navmarker']));
      }
      catch(err){
        console.log('error centering',err);
      }
      if($('#favcontent').length){
        $('#content').prepend($('#favcontent').find('.map'));
          mapHelper.place_markers(Session['markers']);
      }
    });
    event_handlers.check_sound('#pagehome');
  };

  page_init.fav = function() {
    console.log('pagefav init');
    $('#pagefav').on('pagebeforeshow',function() {
      $('#favcontent').prepend($('#pagehome').find('.map'));
      listHelper.append_favlist(Session.markers);
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
        $("#favlist").listview("refresh");
      });
        listHelper.click_focused('fav');
        $("#favlist").listview("refresh");

       //fix becuse soundbutton is getting binded twice
      //$('.soundbutton').unbind('click');
    });
    event_handlers.sound_click();
    event_handlers.check_sound('#pagefav');
  };

  page_init.list = function() {
    var that = this;
    console.log('pagelist init');
    $('#pagelist').on('pageinit',function(){
      listHelper.append_proxlist(7);
      $('#listAddr li').bind('click', function() {
        console.log('listADD')
        var focusmarkerid = listHelper.focusmarker_place();
        if($(this).attr('data-theme')!='b' && $(this).attr('id')!=focusmarkerid){
          google.maps.event.trigger(Session.markers[parseInt($(this).attr('id'))],'click');
        }
        $('#listAddr li').attr("data-theme", "c").removeClass("ui-btn-up-b").removeClass('ui-btn-hover-b').addClass("ui-btn-up-c").addClass('ui-btn-hover-c');
        $(this).attr("data-theme", "b").removeClass("ui-btn-up-c").removeClass('ui-btn-hover-c').addClass("ui-btn-up-b").addClass('ui-btn-hover-b');
        $("#list").listview("refresh");
      });
      //$($(this).find('li')[0]).trigger('click');
      listHelper.click_focused('',that);

    });
    $('#pagelist').on('pagebeforeshow',function(){
      listHelper.click_focused();
    });
    //event_handlers.sound_click();
    event_handlers.check_sound('#pagelist');
  };

  return page_init;
}());
