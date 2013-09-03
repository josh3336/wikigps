
var serverurl="";
get_sound = function(text) {
  var context;
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  try {
    context = new AudioContext();
  }
  catch(err){
    console.log('error audio buffer not ready');
  }
  if (!context){
    return;
  }
  var soundclip=null;
  var params = {"text" : text};
  params = JSON.stringify(params);
  console.log("submitting:",params);

  if (Session.focusmarker.soundclip === false){
    new BufferLoader(context, '/get_sound', function(buffer){
      // if(Session.source1){
      //   Session.source1.stop(0);
      // }
      Session.focusmarker.soundclip = buffer;
      Session.source1 = context.createBufferSource();
      Session.source1.buffer = buffer;
      Session.source1.connect(context.destination);
      Session.source1.start(0);
    }).loadBuffer(params);
  }
  else{
    Session.source1 = context.createBufferSource();
    Session.source1.buffer = Session.focusmarker.soundclip;
    Session.source1.connect(context.destination);
    Session.source1.start(0);
  }
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