var number = 2;
var messageRepository = function() {
  var self = this;
  self.addMessage = function(Parse, orgId,channelId,organization,userName,channelName,text,triggeredWord,  res) {
    self.createOrganization(Parse, orgId, organization);
    self.createChannel(Parse,channelId,channelName);
    self.createMessage(Parse, orgId,userName,channelId,text,triggeredWord,  res);
  }

  self.createOrganization=function(Parse,orgId,organization){
    var Organization = Parse.Object.extend("organizations");
    var organizationRepo = new Organization();
    var query = new Parse.Query(Organization);
    query.equalTo("orgId", orgId);
    query.find({
      success : function(results) {
        console.log("Successfully retrieved " + results.length
        + " scores.");
        if (results.length > 0) {
          console.log("Channel exists");
        } else {
          organizationRepo.set("orgId",orgId);
          organizationRepo.set("organization",organization);
          self.createObject(Parse,organizationRepo);
        }
      }
    });
  }

  self.createChannel=function(Parse,channelId,channelName){
    var Channel = Parse.Object.extend("channels");
    var channelRepo = new Channel();
    var query = new Parse.Query(Channel);
    query.equalTo("channelId", channelId);
    query.find({
      success : function(results) {
        console.log("Successfully retrieved " + results.length
        + " scores.");
        if (results.length > 0) {
          console.log("Channel exists");
        } else {
          channelRepo.set("channelId",channelId);
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

  self.createMessage=function(Parse, orgId,userName,channelId,text,triggeredWord,res){
    var domain = orgId;
    var Post = Parse.Object.extend("contentDemo");
    var postRepo = new Post();
    postRepo.set("message", text);
    postRepo.set("by", userName);
    postRepo.set("channelId", channelId);
    postRepo.set("orgId", orgId);
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
