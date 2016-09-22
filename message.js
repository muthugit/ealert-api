var number = 2;
var messageRepository = function() {
  var self = this;
  self.addMessage = function(Parse, organization,userName,channelName,text,triggeredWord,  res) {
    self.createOrganization(Parse, organization);
    self.createChannel(Parse,organization,channelName);
    self.createMessage(Parse, organization,userName,channelName,text,triggeredWord,  res);
  }

  self.createOrganization=function(Parse,organization){
    var Organization = Parse.Object.extend("organizations");
    var organizationRepo = new Organization();
    var query = new Parse.Query(Organization);
    query.equalTo("organization", organization);
    query.find({
      success : function(results) {
        console.log("Successfully retrieved " + results.length
        + " scores.");
        if (results.length > 0) {
          console.log("Channel exists");
        } else {
          organizationRepo.set("organization",organization);
          self.createObject(Parse,organizationRepo);
        }
      }
    });
  }

  self.createChannel=function(Parse,organization,channelName){
    var Channel = Parse.Object.extend("channels");
    var channelRepo = new Channel();
    var query = new Parse.Query(Channel);
    query.equalTo("channelName", channelName);
    query.equalTo("organization", organization);
    query.find({
      success : function(results) {
        console.log("Successfully retrieved " + results.length
        + " scores.");
        if (results.length > 0) {
          console.log("Channel exists");
        } else {

          channelRepo.set("organization",organization);
          channelRepo.set("channelName",channelName);
          self.createObject(Parse,channelRepo);
        }
      }
    });
  }



  self.createObject=function(Parse,repository){
    repository.save(null, {
      success : function(newObject) {
        console.log("Object created");
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
