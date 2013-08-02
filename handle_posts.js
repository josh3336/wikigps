// server=12


// handle_posts=function(posted){
//   console.log('handling',posted);
//   var url = {};
//   url.address=posted;
//   url=JSON.stringify(url);
//   if(posted !==''){
//     $.ajax({
//       url: "http://api.sportsdatallc.org/mlb-t3/schedule/2013.xml",
//         data: {
//       //   // enter your developer api key here
//           api_key: "3ad9uep6u6vhhjmwsukekyzd",
//       //   // the type of data you're expecting back from the api
//           _accept: "application/json",
//       // },
//           dataType: "jsonp",
//         },
//       success: function(data) {
//         // create an unordered list of headlines
//         var ul = $('<ul/>');
//         $.each(data.headlines, function() {
//           var li = $('<li/>').text(this.headline);
//           ul.append(li);
//         });
//         // append this list to the document body
//         $('body').append(ul);
//       },
//       error: function() {
//         console.log('error');
//       }
//     });
//   };
// };
var serverurl="http://127.0.0.1:8080";

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
        // dishes=JSON.parse(data);
        //$('#main').html('');
         // $('.main').append(data.map(function(message) {
         //  return "<div class='message'>"+dish.url+"</div>";

        results(data)
      },
      error: function(data) {
        console.log('Ajax POST request failed');
      }
    });

  }
};