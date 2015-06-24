/**
 * Created by douson on 09.06.15.
 */

Template.profile.helpers({
    canEditProfile: function() {
        var currentUserId = this._id;
        return (Meteor.userId() === currentUserId);
    },
    gender: function() {
        var sex = this.gender;
        if(sex) {
            if(this.gender === 'Male'){
                return 'fa fa-male';
            } else {
                return 'fa fa-female';
            }
        }

    },
    fullName: function() {
        if(this.firstName && this.lastName) {
            return this.firstName + " " + this.lastName;
        } else {
            return this.firstName || 'Anonymous'
        }
    },
    feeling: function() {
        var feel = this.feeling;
        if(feel) {
            return this.feeling;
        }
    }
});
