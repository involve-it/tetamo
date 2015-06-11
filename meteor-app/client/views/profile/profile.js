/**
 * Created by douson on 09.06.15.
 */

Template.profile.helpers({
    profileName: function() {return Meteor.user().profile.name},
    email: function() {return Meteor.user().emails[0].address}
});

console.log(Meteor.userId());