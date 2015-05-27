/**
 * Created by ashot on 5/20/15.
 */
Template.conversations.created = function () {
    currentUser = Meteor.users.findOne({username: 'ww'});
    friendUser = Meteor.users.findOne({username: 'hh'});
}
Template.conversations.rendered = function () {
}
Template.conversations.events({
    'click #send-btn': function (e, v) {
        var messageText = v.$('#message-input').val();
        Messages.insert({
            userId: currentUser._id,
            text: messageText,
            timestamp: new Date(),
            keyMessage: 'own-message'
        });
    },
    'click #send-btn1': function (e, v) {
        var messageText = v.$('#message-input1').val();
        Messages.insert({
            userId: friendUser._id,
            text: messageText,
            timestamp: new Date(),
            keyMessage: 'friend-message'
        });
    }
})
Template.conversations.helpers({
    getMessages: function (a, b) {
        return Messages.find({userId: {$in: [currentUser._id, friendUser._id]}});
    }
});

Template.conversationsMessage.helpers({
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
