// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  // fill contacts:
  // 'arutune@gmail.com'
  try {
    (function(){
      var user1 = Meteor.users.findOne({emails: {$elemMatch: {address: 'arutune@gmail.com'}}});
      if (user1) {
        user1.contacts = [];
        var u1 = Meteor.call('getUserByEmail', 'user1@gmail.com');
        u1 && user1.contacts.push(u1._id);
        var u2 = Meteor.call('getUserByEmail', 'user2@gmail.com');
        u2 && user1.contacts.push(u2._id);
        var u3 = Meteor.call('getUserByEmail', 'mr.douson@gmail.com');
        u3 && user1.contacts.push(u3._id);
        Meteor.users.update(user1._id, user1);
      }
    })();
    (function(){
      var user1 = Meteor.users.findOne({emails: {$elemMatch: {address: 'mr.douson@gmail.com'}}});
      if (user1) {
        user1.contacts = [];
        var u1 = Meteor.call('getUserByEmail', 'user1@gmail.com');
        u1 && user1.contacts.push(u1._id);
        var u2 = Meteor.call('getUserByEmail', 'user2@gmail.com');
        u2 && user1.contacts.push(u2._id);
        var u3 = Meteor.call('getUserByEmail', 'arutune@gmail.com');
        u3 && user1.contacts.push(u3._id);
        Meteor.users.update(user1._id, user1);
      }
    })();
    (function(){
      var user1 = Meteor.users.findOne({emails: {$elemMatch: {address: 'user1@gmail.com'}}});
      if (user1) {
        user1.contacts = [];
        var u1 = Meteor.call('getUserByEmail', 'arutune@gmail.com');
        u1 && user1.contacts.push(u1._id);
        var u2 = Meteor.call('getUserByEmail', 'user2@gmail.com');
        u2 && user1.contacts.push(u2._id);
        var u3 = Meteor.call('getUserByEmail', 'mr.douson@gmail.com');
        u3 && user1.contacts.push(u3._id);
        Meteor.users.update(user1._id, user1);
      }
    })();
    (function(){
      var user1 = Meteor.users.findOne({emails: {$elemMatch: {address: 'user2@gmail.com'}}});
      if (user1) {
        user1.contacts = [];
        var u1 = Meteor.call('getUserByEmail', 'user1@gmail.com');
        u1 && user1.contacts.push(u1._id);
        var u2 = Meteor.call('getUserByEmail', 'arutune@gmail.com');
        u2 && user1.contacts.push(u2._id);
        var u3 = Meteor.call('getUserByEmail', 'mr.douson@gmail.com');
        u3 && user1.contacts.push(u2._id);
        Meteor.users.update(user1._id, user1);
      }
    })();

  } catch (ex) {
  }
});
/*
 Meteor.startup(function () {
 if (Lists.find().count() === 0) {
 var data = [
 {name: "Meteor Principles",
 items: ["Data on the Wire",
 "One Language",
 "Database Everywhere",
 "Latency Compensation",
 "Full Stack Reactivity",
 "Embrace the Ecosystem",
 "Simplicity Equals Productivity"
 ]
 },
 {name: "Languages",
 items: ["Lisp",
 "C",
 "C++",
 "Python",
 "Ruby",
 "JavaScript",
 "Scala",
 "Erlang",
 "6502 Assembly"
 ]
 },
 {name: "Favorite Scientists",
 items: ["Ada Lovelace",
 "Grace Hopper",
 "Marie Curie",
 "Carl Friedrich Gauss",
 "Nikola Tesla",
 "Claude Shannon"
 ]
 }
 ];

 var timestamp = (new Date()).getTime();
 _.each(data, function(list) {
 var list_id = Lists.insert({name: list.name,
 incompleteCount: list.items.length});

 _.each(list.items, function(text) {
 Todos.insert({listId: list_id,
 text: text,
 createdAt: new Date(timestamp)});
 timestamp += 1; // ensure unique timestamp.
 });
 });
 }
 });
 */
