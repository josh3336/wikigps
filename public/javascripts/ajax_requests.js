
var serverurl="";
get_sound = function(text) {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();
  soundclip=null;
  params = {"text" : text};
  params = JSON.stringify(params);
  console.log("submitting:",params);

  if (Session.focusmarker.soundclip === false){
    new BufferLoader(context, '/', function(buffer){
      Session.focusmarker.soundclip = buffer;
      var source1 = context.createBufferSource();
      source1.buffer = buffer;
      source1.connect(context.destination);
      source1.start(0);
    }).loadBuffer(params);
  }
  else{
    var source1 = context.createBufferSource();
    source1.buffer = Session.focusmarker.soundclip
    source1.connect(context.destination);
    source1.start(0);
  }


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

grab_local = function (lat,lng,results) {
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

grab_wiki = function (that) {
  console.log('title',that.title);
  var that = that
  var url = serverurl+'/wiki';
  var params = {};
  params.wikiID = that.wikiID;
  params = JSON.stringify(params);
  console.log('handling', that.wikiID);
  $.ajax(url,{
    'content-type': 'application/json',
    type: 'POST',
    data:params,
    success: function (wikiinfo) {
      // create an unordered list of headlines
      //debugger
      mapHelper.place_info(that,wikiinfo)

    },
    error: function(e) {
      console.log('error',e);
    }
  });
};