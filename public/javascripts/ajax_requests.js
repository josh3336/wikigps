
var serverurl="http://127.0.0.1:3000";

handle_posts=function(lat,lng,results){
  var url=serverurl+'/google'
  var params = {};
  params.lat=lat;
  params.lng=lng;
  params=JSON.stringify(params);
  console.log('handling',lat,lng);
  if(params.lng !==''  && params.lat !== ''){
    console.log(params.lat,params.lng);
    $.ajax(url, {
      'content-type': 'application/json',
      type: 'POST',
      data: params,
      success: function(data){

        console.log('Message submitted to server.', data);
        results(data)
      },
      error: function(data) {
        console.log('Ajax POST request failed');
      }
    });

  }
};

grab_wiki=function(wikiID,title){
  console.log('title',title)
  var url=serverurl+'/wiki';
  var params = {};
  params.wikiID = wikiID;
  params=JSON.stringify(params);
  console.log('handling', wikiID);
  $.ajax(url,{
    'content-type': 'application/json',
    type: 'POST',
    data:params,
    success: function(wikiinfo) {
      // create an unordered list of headlines
      wikiinfo=JSON.parse(wikiinfo);
      // append this list to the document body
      $('#wikifocus').html('');
      $('#wikifocus').append('<h3>'+title+'</h3>');

      var el = $('<div></div>');//make fake dom element
      el.html(wikiinfo.query.pages[wikiID].revisions[0]['*']);//grabs whole first section an append to dom
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
    if(el.children().closest('p').find('#coordinates').length > 0){$('#wikifocus').append(el.children().closest('p')[1]);}
    else{$('#wikifocus').append(el.children().closest('p')[0]);}
    },
    error: function(e) {
      console.log('error',e);
    }
  });
};