var express = require('express'),
    port = 1316;

module.exports = {
  server: null,
  init: function(){
    var app = express();
    app.listen(port, function(){
      console.log('listening on *'+port);
    });
    this.server = app;
  }
}
