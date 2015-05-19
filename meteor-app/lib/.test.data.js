/**
 * Created by ashot on 5/18/15.
 */

var user1 = Meteor.users.findOne({username: 'ww'});
var user2 = Meteor.users.findOne({username: 'hh'});
var message = null;

Messages.remove({});
Emotions.remove({});
message = Messages.insert({
  userId: user1._id,
  text: 'and Very sad',
  timestamp: new Date()
});
//  and Very sad.
Emotions.insert({
  vector: {
    happiness: 0.08000000000000002,
    sadness: 1,
    anger: 0,
    fear: 0.16000000000000003,
    disgust: 0.16000000000000003,
    surprise: 0
  },
  userId: user1._id,
  message: message,
  timestamp: new Date()
});//  and Very happy.
message = Messages.insert({
  userId: user1._id,
  text: 'and Very happy',
  timestamp: new Date()
});
Emotions.insert({
  vector: {
    happiness: 1,
    sadness: 0.16000000000000003,
    anger: 0,
    fear: 0,
    disgust: 0,
    surprise: 0
  },
  userId: user1._id,
  message: message,
  timestamp: new Date()
});
message = Messages.insert({
  userId: user1._id,
  text: 'and Very surprising',
  timestamp: new Date()
});
//  and Very surprising.
Emotions.insert({
  vector: {
    happiness: 0.36000000000000004,
    sadness: 0.16000000000000003,
    anger: 0,
    fear: 0,
    disgust: 0,
    surprise: 1
  },
  userId: user1._id,
  message: message,
  timestamp: new Date()
});
message = Messages.insert({
  userId: user1._id,
  text: 'and Very disgusting',
  timestamp: new Date()
});
//  and Very disgusting.
Emotions.insert({
  vector: {
    happiness: 0.08000000000000002,
    sadness: 0.16000000000000003,
    anger: 0.3,
    fear: 0,
    disgust: 1,
    surprise: 0.3
  },
  userId: user1._id,
  message: message,
  timestamp: new Date()
});
message = Messages.insert({
  userId: user1._id,
  text: 'and Very angry',
  timestamp: new Date()
});
//  and Very angry.
Emotions.insert({
  vector: {
    happiness: 0.08000000000000002,
    sadness: 0.16000000000000003,
    anger: 1,
    fear: 0,
    disgust: 0.26666666666666666,
    surprise: 0
  },
  userId: user1._id,
  message: message,
  timestamp: new Date()
});
message = Messages.insert({
  userId: user1._id,
  text: 'and Very fearful',
  timestamp: new Date()
});
//  and Very fearful.
Emotions.insert({
  vector: {
    happiness: 0.08000000000000002,
    sadness: 0.16000000000000003,
    anger: 0,
    fear: 0.6,
    disgust: 0.4,
    surprise: 0
  },
  userId: user1._id,
  message: message,
  timestamp: new Date()
});