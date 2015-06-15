/**
 * Created by douson on 09.06.15.
 */

Template.profile.helpers({
    canEditProfile: function() {
        var currentUserId = this._id;
        return (Meteor.userId() === currentUserId);
    },
    profileName: function() {
        return this.profile.name || 'Anonymous'
    },
    email: function() {
        return this.emails[0].address
    },
    userId: function() {
        return this._id;
    }
});
