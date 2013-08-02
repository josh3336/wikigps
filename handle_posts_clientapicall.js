
handle_posts=function(posted){
  console.log('handling',posted);
  var url = {};
  url.address=posted;
  url=JSON.stringify(url);
  if(posted !==''){
    $.ajax({
      url: "http://api.wikilocation.org/articles?",
        data: {
      //   // enter your developer api key here
          // api_key: "3ad9uep6u6vhhjmwsukekyzd",
         // header: 'Access-Control-Allow-Origin: *',
      //   // the type of data you're expecting back from the api
          //_accept: "application/json",
      // },
          lat : "40.12",
          lng : '-75.341667',
          radius : '1000m',
          jsonp: 'data'
          //dataType: "jsonp",
        },
      success: function(data) {
        // create an unordered list of headlines
        console.log(data)
        // append this list to the document body
        $('body').append(data);
      },
      error: function() {
        console.log('error');
      }
    });
  };
};
