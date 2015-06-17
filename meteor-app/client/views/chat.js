/**
 * Created by ashot on 5/20/15.
 */

Template.chat.onRendered(function() {

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

Template.chat.created = function () {
  currentUser = Meteor.user();
  friendUserId = Router.current().params.userId;
};

Template.chat.rendered = function () {
 //Trail();

    scrollMessages();
    var lastCount = Messages.find().count();
    Deps.autorun(function() {
        var newCount = Messages.find().count();
        if(newCount > lastCount) {
            scrollMessages();
        }
    });
};

Template.chat.events({
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
          e.preventDefault();
          console.log("you pressed enter");
          var messageText = v.$('#message-input').val();
          if($.trim(messageText) === "") {
              return false;
          }
          if(messageText != '') {
            sendMessage(messageText, v);
          }
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

Template.chat.helpers({
  getMessages: function (a, b) {
    var usersArr = [];
    currentUser && usersArr.push(currentUser._id);
    friendUserId && usersArr.push(friendUserId);
    //debugger;
    var messages = Messages.find({userId: {$in: usersArr}, toUserId: {$in: usersArr}});
    return messages;
  },
    getFriendUserName: function() {
        var friendUserName = Meteor.users.findOne({_id: friendUserId}).profile.name;
        if(friendUserName) {
            return friendUserName;
        }

    }
});

Template.chatMessage.helpers({
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
    toUserId: friendUserId,
    text: messageText,
    timestamp: new Date(),
    keyMessage: 'own-message'
  });
  scrollMessages();
  var e = $('.message:last').backgroundEmotion();
  view.$('#message-input').val('');

}

function scrollMessages() {
    var elem = document.getElementsByClassName("messages-container");
    elem[0].scrollTop = elem[0].scrollHeight;
    //$('.messages-container').animate({"scrollTop": $('.messages-container')[0].scrollHeight}, "100");
    //this.$messages[0].scrollTop = this.$messages[0].scrollHeight;
}



Template.registerHelper("timestampToTime", function (timestamp) {
    var date = new Date(timestamp);
    return moment(date).fromNow();
});