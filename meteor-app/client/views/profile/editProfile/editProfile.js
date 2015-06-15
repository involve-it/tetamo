/**
 * Created by douson on 11.06.15.
 */

Template.editProfile.helpers({
    profileName: function() {
        return this.profile.name
    },
    email: function() {
        return this.emails[0].address
    }
});

Template.editProfile.events({
    'submit form': function(e) {
        e.preventDefault();

        var profile = {
            name: $(e.target).find('[name=profileName]').val()
        };
        var emails = {
            email: $(e.target).find('[name=email]').val()
        };

        Meteor.users.update(this._id, {$set: {
            profile: {
                "name":profile.name
            },
            emails: [{
                "address":emails.email
            }]
        }}, function(error) {
            if(error){
                alert("What's happens?");
            } else {
                Router.go('profile');
            }
        });


    }

});



