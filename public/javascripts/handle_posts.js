
var serverurl="http://127.0.0.1:3000";

handle_posts=function(lat,lng,results){
  console.log('handling',lat,lng);
  var params = {};
  params.lat=lat;
  params.lng=lng;
  params=JSON.stringify(params);
  if(params.lng !==''  && params.lat !== ''){
    console.log(params.lat,params.lng);
    $.ajax(serverurl, {
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