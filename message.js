var number = 2;
var messageRepository = function() {
  var self = this;
  self.addMessage = function(Parse, organization,userName,channelName,text,triggeredWord,  res) {
    self.createChannel(Parse,organization,channelName);
    self.createMessage(Parse, organization,userName,channelName,text,triggeredWord,  res);
  }
  self.createChannel=function(Parse,organization,channelName){
    var Channel = Parse.Object.extend("channels");
    var channelRepo = new Channel();
    var query = new Parse.Query(Channel);
    query.equalTo("channelName", channelName);
    query.find({
      success : function(results) {
        console.log("Successfully retrieved " + results.length
        + " scores.");
        if (results.length > 0) {
          console.log("Channel exists");
        } else {
          var channelObject=[];

          var channelObject=[];
          var currentChannel=[{'channelName':channelName,'organization':organization}];
          //channelObject.push(currentChannel);

          //channelObject=[{'channelName':channelName,'organization':organization}];
          self.createSingleObject(Parse,currentChannel,"channels");
        }
      }
    });
  }

  self.createSingleObject=function(Parse,objectToCreate,object){
    console.log("Started creating object: "+object);
    var GenericObject = Parse.Object.extend(object);
    var genericObjectRepo = new GenericObject();


    for (var i = 0; i < arr.length; i++){
      console.log("<br><br>array index: " + i);
      var obj = arr[i];
      for (var key in obj){
        var value = obj[key];
        console.log("<br> - " + key + ": " + value);
      }
    }



    genericObjectRepo.set(objectToCreate);
    //objectToCreate=JSON.parse(objectToCreate);
    console.log(objectToCreate)
    genericObjectRepo.save(null, {
      success : function(newObject) {
        console.log("Object created for: "+object);
      },error : function(newObject, error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
  }

  self.createMessage=function(Parse, organization,userName,channelName,text,triggeredWord,res){
    var domain = organization;
    var Post = Parse.Object.extend("contentDemo");
    var postRepo = new Post();
    postRepo.set("message", text);
    postRepo.set("by", userName);
    postRepo.set("channel", channelName);
    postRepo.set("organization", domain);
    postRepo.set("postType", triggeredWord);
    postRepo.save(null, {
      success : function(newPost) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
          "text" : userName + ", " + successMsg + "*" + newPost.id
          + "* in #" + channelName
        }));
      },
      error : function(newPost, error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
    console.log("Saved");
  }
};

module.exports = messageRepository;
