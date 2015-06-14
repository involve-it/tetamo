/**
 * Created by ashot on 6/13/15.
 */
if(Meteor.isServer) {


  Meteor.methods({
    getUserByEmail: function (email) {
      var user = Meteor.users.findOne({emails: { $elemMatch: { address: email} } });
      return user;
    }
  });
}