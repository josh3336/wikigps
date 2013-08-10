function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = [];
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(data) { //function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("POST", this.urlList, true);
  request.setRequestHeader("Content-type", "application/json");
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.buffer = buffer;
        // loader.bufferList[index] = buffer;
        // if (++loader.loadCount == loader.urlList.length)
        // loader.onload(loader.bufferList);
        loader.onload(loader.buffer);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  };

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  };

  request.send(data);
};

// BufferLoader.prototype.load = function() {
//   for (var i = 0; i < this.urlList.length; ++i)
//   this.loadBuffer(this.urlList[i], i);
// };

