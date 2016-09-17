var express = require('express');
var app = express();

app.get('/', function (req, res) {
  //res.send('Hello World!');
 res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 2 }));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
