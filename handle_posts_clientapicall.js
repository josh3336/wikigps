
handle_posts=function(lat,lng){
  console.log('handling',lat,lng);
  var url = {};
  url=JSON.stringify(url);
  if(lat !==''){
    $.ajax({
      url: "http://api.wikilocation.org/articles?",
        data: {
         // header: 'Access-Control-Allow-Origin: *',
      //   // the type of data you're expecting back from the api
          //_accept: "application/json",
      // },
          lat : lat,
          lng : lng,
          radius : '1000m',
          jsonp: 'data'
          //dataType: "jsonp",
        },
      success: function(data) {
        // create an unordered list of headlines
        console.log(data)
        $('main').html('')
        // append this list to the document body
        $('body').append(data);
      },
      error: function() {
        console.log('error');
      }
    });
  };
};


grab_wikis=function(url){
  console.log('handling',lat,lng);
  var url = {};
  url=JSON.stringify(url);
  if(lat !==''){
    $.ajax({
      url: url,
      success: function(data) {
        // create an unordered list of headlines
        console.log(data)
        $('main').html('')
        // append this list to the document body
        $('body').append(data);
      },
      error: function() {
        console.log('error');
      }
    });
  };
};
