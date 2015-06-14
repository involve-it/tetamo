// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  // fill contacts:
  // 'arutune@gmail.com'
  try {
    var user1 = Meteor.users.findOne({emails: {$elemMatch: {address: 'arutune@gmail.com'}}});

    if (user1) {
      user1.contacts = [];
      var u1 = Meteor.call('getUserByEmail', 'user1@gmail.com');
      u1 && user1.contacts.push(u1._id);
      var u2 = Meteor.call('getUserByEmail', 'user2@gmail.com');
      u2 && user1.contacts.push(u2._id);
      Meteor.users.update(user1._id, user1);
    }
    // 'mr.douson@gmail.com'
    /*var user2 = Meteor.users.findOne({emails: {$elemMatch: {address: 'mr.douson@gmail.com'}}});

    if (user2) {
      user2.contacts = [
        Meteor.call('getUserByEmail', 'arutune@gmail.com')._id,
        Meteor.call('getUserByEmail', 'hh@hh.hh')._id,
        Meteor.call('getUserByEmail', 'ww@ww.ww')._id
      ]
      Meteor.users.update(user2._id, user2);
    }*/
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
