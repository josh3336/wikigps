
var serverurl="";
test_post = function(text) {
  debugger
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();


  url = serverurl;
  soundclip=null;
  params = {"text" : text};
  params = JSON.stringify(params);
  console.log("submitting:",params);

  new BufferLoader(context, '/', function(buffer){
    soundclip = buffer;
    var source1 = context.createBufferSource();
    source1.buffer = buffer;
    source1.connect(context.destination);
    source1.start(0);
  }).loadBuffer(params);


 // $.ajax(url, {
 //      'content-type': 'application/json',
 //      type: 'POST',
 //      data: params,
 //      dataType: "text",

 //      success: function(bufferstr){
 //        console.log('bufferstr',bufferstr);
 //        buffer = str2ab(bufferstr);
 //        //console.log('typeofbuffer',buffer);
 //        console.log('buffer',buffer);
 //        debugger;

 //        context.decodeAudioData(buffer, function(buffered){
 //          soundclip = buffered;
 //        },function(err){
 //          console.log('error in decodeAudioData',err);
 //        });
 //      },
 //      error: function(data) {
 //        console.log('Ajax POST request failed');
 //      }
 //    });
};

var str2ab = function(str) {
   var buf = new ArrayBuffer(str.length); // 2 bytes for each char
   //var bufView = new Uint16Array(buf);
   for (var i=0, strLen=str.length; i<strLen; i++) {
     buf[i] = str.charCodeAt(i);
   }
   return buf;
};





handle_posts=function(lat,lng,results){
  var url=serverurl+'/home';
  var params = {};
  params.lat = lat;
  params.lng = lng;
  params=JSON.stringify(params);
  console.log('handling',lat,lng);
  if(params.lng !== '' && params.lat !== ''){
    console.log(params.lat,params.lng);
    $.ajax(url, {
      'content-type': 'application/json',
      type: 'POST',
      data: params,
      success: function(data){

        console.log('Message submitted to server.', data);
        results(data);
      },
      error: function(data) {
        console.log('Ajax POST request failed');
      }
    });

  }
};

grab_wiki=function(that){
  console.log('title',that.title);
  var url = serverurl+'/wiki';
  var params = {};
  params.wikiID = that.wikiID;
  params = JSON.stringify(params);
  console.log('handling', that.wikiID);
  $.ajax(url,{
    'content-type': 'application/json',
    type: 'POST',
    data:params,
    success: function(wikiinfo) {
      debugger
      // create an unordered list of headlines
      wikiinfo = JSON.parse(wikiinfo);
      // append this list to the document body
      $('#wikifocus').html('');
      $('#wikifocus').append('<h3><a rel="external" targe="_blank" href='+that.wikiurl+'>'+that.title+'</a></h3>');
      $('#wikifocus').append('<div id=buttonPlaceHolder></div>');
      $('h3').append('<a href="#" data-role="button" data-icon="star" data-iconpos="notext" data-inline="true" class="star"></a>');


      var el = $('<div></div>');//make fake dom element
      el.html(wikiinfo.query.pages[that.wikiID].revisions[0]['*']);//grabs whole first section an append to dom
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
        var wikip = $('#wikifocus').append(el.children().closest('p')[1]);
      }
      else{
        wikip = $('#wikifocus').append(el.children().closest('p')[0]);
      }
    
      wikip = wikip.find('p');
      wikip = $(wikip).prop('outerHTML');
      var p_text = html_to_string(wikip);
      p_text.split('. ')[0]
      
      //if (Session.sound === true){test_post('hello');}
      //append to list wikifocus if it exists
  
      var content = $('#wikifocus').children().clone()
      $('#listwikifocus').html('')
      $('#listwikifocus').append(content);
      //parse through and add html tags to all ahrefs
      var links = $('#wikifocus').find('a');
      for (var linkind = 2; linkind < links.length; linkind++){
        links[linkind].href = 'http://en.m.wikipedia.org/' + links[linkind].href.slice(22);
      }
     // $("#favlist").listview("refresh");
    //  $("#listtorefresh").listview("refresh");
      $('#pagehome').trigger('create');
      $('#pagelist').trigger('create')
      star_on_click();
      if(Session.focusmarker.starred === true){
        $('.star').addClass('makeYellow');
      }
    },
    error: function(e) {
      console.log('error',e);
    }
  });
};