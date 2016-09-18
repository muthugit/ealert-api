// -- THIS IS THE API FOR EALERT
var express = require('express');
var app = express();
// BODY PARSER
var bodyParser = require('body-parser');
app.use(bodyParser.json({
	limit : '50mb',
	extended : true
}));
app.use(bodyParser.urlencoded({
	limit : '50mb',
	extended : true
}));

app.use(bodyParser.urlencoded({
	extended : true
}));
// END BODY PARSER

app.post('/', function (req, res) {
  //res.send('Hello World!');
var userName=req.body.user_name;
 res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ "text": "Hi: "+userName+" i am muthu" }));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
