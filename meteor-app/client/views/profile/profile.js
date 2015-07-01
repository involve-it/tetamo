/**
 * Created by douson on 09.06.15.
 */

Template.profile.helpers({
    canEditProfile: function() {
        var currentUserId = this._id;
        return currentUserId && (Meteor.userId() === currentUserId);
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
            return feel && this.feeling;
        }
    },
    getIdProfile: function () {
        //console.log('ID профайла пользователя ' + this._id);
        return this._id;
    },
    getIdGuestUser: function() {
        //console.log('ID гостя ' + Meteor.userId());
        return Meteor.userId();
    },
    getImageProfile: function() {
        var imageProfile = this.image;
        return imageProfile && this.image;
    }
});

Template.profile.events({
    'click .b-follow': function(event, tmpl) {
        //зашедший на профайл
        console.log('Event: ', event);
        console.log('TMPL: ', tmpl);
        //Meteor.call('addToFriend', this._id);
    }
});

Template.avatar.events({
    'click a[data-imagelightbox="a"]': function(event, tmpl) {
        event.preventDefault();
        //console.log('click avatar img');
    }
});

Template.avatar.onRendered(function() {

});