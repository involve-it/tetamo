/**
 * Created by ashot on 5/20/15.
 */
Template.dialog.created = function () {
  currentUser = Meteor.users.findOne({username: 'ww'});
  friendUser = Meteor.users.findOne({username: 'hh'});
}
Template.dialog.rendered = function () {
}
Template.dialog.events({
  'click #send-btn': function (e, v) {
    var messageText = v.$('#message-input').val();
    Messages.insert({
      userId: currentUser._id,
      text: messageText,
      timestamp: new Date()
    });
  },
  'click #send-btn1': function (e, v) {
    var messageText = v.$('#message-input1').val();
    Messages.insert({
      userId: friendUser._id,
      text: messageText,
      timestamp: new Date()
    });
  }
})
Template.dialog.helpers({
  getMessages: function (a, b) {
    return Messages.find({userId: {$in: [currentUser._id, friendUser._id]}});
  }
});


Template.dialogMessage.rendered = function () {
}
Template.dialogMessage.events({});
Template.dialogMessage.helpers({
  getMessageClass: function () {
    var className = '';
    if(this.userId === currentUser._id){
      // my message
      className = 'my-message';
    } else {
      className = 'friends-message';
    }
    return className;
  },
  isOwnMessage: function () {
  }
});