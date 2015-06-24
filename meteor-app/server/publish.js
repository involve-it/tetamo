/*
Meteor.publish('publicLists', function() {
  return Lists.find({userId: {$exists: false}});
});

Meteor.publish('privateLists', function() {
  if (this.userId) {
    return Lists.find({userId: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish('todos', function(listId) {
  check(listId, String);

  return Todos.find({listId: listId});
});
*/

Meteor.publish('users', function(){
   return Meteor.users.find();
});
Meteor.publish('messages', function(){
  //todo:filter by user:
   return Messages.find();
});
Meteor.publish('emotions', function(){
  //todo:filter by user:
   return Emotions.find();
});

Meteor.publish('singleUser', function(userId) {
    return Meteor.users.find(userId);
});


//ProfileImages publish
Meteor.publish('images', function() {
    return Images.find({ 'metadata.owner': this.userId});
});