var express = require('express');
var Gunther = require('./lib/gunther');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/comments', function(req, res) {
  var chunkString = '';
  req.on('data', function(chunk) {
    chunkString += chunk;
  });

  req.on('end', function() {
    var data = JSON.parse(chunkString);
    var gunther = new Gunther(data);
    gunther.respond();

    // Respond with `200`
    res.writeHead(200, "OK", {'Content-Type': 'text/html'});
    res.end();
  });
});

app.listen(3000, function () {
  console.log('Gunther is listening on port 3000!');
});
