/*
Lists = new Mongo.Collection('lists');

// Calculate a default name for a list in the form of 'List A'
Lists.defaultName = function() {
  var nextLetter = 'A', nextName = 'List ' + nextLetter;
  while (Lists.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
    nextName = 'List ' + nextLetter;
  }

  return nextName;
};

Todos = new Mongo.Collection('todos');
*/
// SPEECH:
//Users = new Mongo.Collection('users');
//Users.insert({
//  name:
//})


Messages = new Mongo.Collection('messages');
Emotions = new Mongo.Collection('emotions');
EmotionalStates = new Mongo.Collection('emotionalStates');

Dialogs = new Mongo.Collection('dialogs');

// EMOTIONS (TODO):
//Lists = new Mongo.Collection('');

Meteor.users.allow({
    update: function (userId, doc) {
        return (userId == Meteor.userId());
    }
});
EmailsCollection = new Mongo.Collection('emails');


var createThumb = function(fileObj, readStream, writeStream) {
    // Transform the image into a 10x10px thumbnail
    gm(readStream, fileObj.name()).resize('80', '80').stream().pipe(writeStream);
};

//Image collectionFS
Images = new FS.Collection("images", {
    filter: {
        maxSize: 2097152, //in bytes
        allow: {
            contentTypes: ['image/*'],
            extensions: ['png', 'jpg', 'jpeg', 'gif']
        }
    },
    stores: [
        new FS.Store.GridFS("thumbs", {transformWrite: createThumb}),
        new FS.Store.GridFS("images", {})
    ]
});

Images.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc, fieldNames, modifier) {
        return !!userId;
    },
    download: function(userId) {
        return true;
    }
});