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
