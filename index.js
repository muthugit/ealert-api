// THIS IS THE API FOR EALERT
var express = require('express');
var app = express();
var messageRepository = require("./message.js");

// PARSE CONFIGURATION
var Parse = require('parse/node');
Parse.initialize("myAppId", '', 'master');
Parse.serverURL = 'http://localhost:1337/parse';

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
// DEMO
app.use(bodyParser.urlencoded({
	extended : true
}));
// END BODY PARSER

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods", "GET, POST","PUT");
	next();

});

app.get('/', function(req, res) {
	var Posts = Parse.Object.extend("contentDemo");
	var query = new Parse.Query(Posts);
	query.descending("createdAt")
	query.find({
		success : function(results) {
			console.log("Posts found");
			console.log("Total posts: " + results.length);
			res.send(results);
		},
		error : function(error) {
			console.log("Error: " + error.code + " " + error.message);
		}
	});
})

app.post('/', function(req, res) {
	var successMsg = "Your message has been successfully posted with ID: "
	// res.send('Hello World!');
	var organization="demo";
	var userName = req.body.user_name;
	var channelName = req.body.channel_name;
	var text = req.body.text;
	var triggeredWord = req.body.trigger_word;
	text = (text.replace(triggeredWord, ""));
	if (text.trim() == "") {
		res.send(JSON.stringify({
			"text" : "Sorry invalid message"
		}));
	} else {
		var messageRepositoryInstance = new messageRepository();
		messageRepositoryInstance.addMessage(Parse, organization,userName,channelName,text,triggeredWord, res);
		res.send(JSON.stringify({
			"text" :"Thanks"}));
	}
});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
