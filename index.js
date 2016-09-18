// THIS IS THE API FOR EALERT
var express = require('express');
var app = express();

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

app.post('/', function(req, res) {
	// res.send('Hello World!');
	var userName = req.body.user_name;
	var channelName = req.body.channel_name;
	var text = req.body.text;
	var triggeredWord = req.body.trigger_word;
	text = text.replace(triggeredWord, "");
	var domain = req.body.team_domain;
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		"text" : "Hi: " + userName + " you requested from: " + channelName
				+ " of " + domain + " and your message is: " + text
	}));

	var Post = Parse.Object.extend("content-demo");
	var postRepo = new Post();
	postRepo.set("message", text);
	postRepo.set("by", userName);
	postRepo.save(req.body, {
		success : function(userRepo) {
			res.send("Post created: id===> " + userRepo.id);
		},
		error : function(userRepo, error) {
			console.log("Error==> " + JSON.stringify(error));
			console.log("EEEEE=>" + JSON.stringify(userRepo));
			res.send("ERROR");
		}
	});

});

app.listen(3000, function() {
	console.log('Example app listening on port 3000!');
});
