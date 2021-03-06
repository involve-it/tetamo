/**
 * Created by ashot on 5/20/15.
 */

Template.conversations.onRendered(function() {

    $.each($('textarea[data-autoresize]'), function() {
        var offset = this.offsetHeight - this.clientHeight;
        var resizeTextarea = function(el) {
            $(el).css('height', 'auto').css('height', el.scrollHeight + offset);
        };

        $(this).on('keyup input', function() {
            if(this.scrollHeight > 44) {
                resizeTextarea(this);
            }
        }).removeAttr('data-autoresize');
    });

});

Template.conversations.created = function () {
  currentUser = Meteor.user();
  friendUser = Meteor.users.findOne({username: 'user'});
};

Template.conversations.rendered = function () {
  Trail();
};

Template.conversations.events({
  'click #send-btn': function (e, v) {
    if(!currentUser){
      alert('please login');
    } else {
      var messageText = v.$('#message-input').val();
        if($.trim(messageText) === "") {
            return false;
        }
      if(messageText != '') {
        sendMessage(messageText, v);
      }//end if
    }
  },
  'keydown #message-input': function(e, v) {

      if(e.which === 13) {
          var messageText = v.$('#message-input').val();
          if($.trim(messageText) === "") {
              return false;
          }
          if(messageText != '') {
            sendMessage(messageText, v);

          }//end if
      }
  }
  //'click #send-btn1': function (e, v) {
  //  var messageText = v.$('#message-input1').val();
  //  Messages.insert({
  //    userId: friendUser._id,
  //    text: messageText,
  //    timestamp: new Date(),
  //    keyMessage: 'friend-message'
  //  });
  //}
});

Template.conversations.helpers({
  getMessages: function (a, b) {
    var usersArr = [];
    currentUser && usersArr.push(currentUser._id);
    friendUser && usersArr.push(friendUser._id);
    return Messages.find({userId: {$in: usersArr}});
  }
});

Template.conversation.helpers({
  getMessageClass: function () {
    var className = '';
    if (this.userId === currentUser._id) {
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




//HELPERS:
function sendMessage(messageText, view){
  Messages.insert({
    userId: currentUser._id,
    text: messageText,
    timestamp: new Date(),
    keyMessage: 'own-message'
  });
  $('.message:last').backgroundEmotion();
  view.$('#message-input').val('');

}
