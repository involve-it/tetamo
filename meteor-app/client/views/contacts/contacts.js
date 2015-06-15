/**
 * Created by ashot on 5/14/15.
 */
Template.contacts.helpers({
  contacts: function () {
    var currUser = Meteor.user(),
      contacts;
    if(currUser.contacts){
      contacts = Meteor.users.find({_id: { $in: currUser.contacts }});
      //contacts = Meteor.users.find({});
    }
    return contacts;
  }
});
