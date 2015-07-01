/**
 * Created by douson on 11.06.15.
 */

Schema = {};

Template.registerHelper("Schema", Schema);

Schema.UserProfile = new SimpleSchema({

    firstName: {
        type: String,
        regEx: /^[a-zA-Z-]{2,25}$/,
        optional: true
    },
    lastName: {
        type: String,
        regEx: /^[a-zA-Z]{2,25}$/,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    feeling: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: "textarea",
                rows: 5
            }
        }
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        regEx: /^[a-z0-9A-Z_]{3,15}$/
    },
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile
    },
    services: {
        type: Object,
        optional: true,
        blackbox: false
    },
    profilePic: {
        type: String,
        label: 'Your photo',
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Images',
                label: 'Choose file'
            }
        }
    }
});

Meteor.users.attachSchema(Schema.User);

Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

Template.editProfile.helpers({
    userSchema: function () {
        return Schema.User;
    }
});

Template.editProfile.helpers({
    profileName: function() {
        return this.profile.name
    },
    email: function() {
        return this.emails[0].address
    }
});


Template.editProfile.events({
    'change #files': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            var fileObj = new FS.File(file);
            fileObj.metadata = { owner: Meteor.userId() };
            Images.insert(fileObj, function(err, secc) {
                if(err) {
                    //error
                } else {
                    var userId = Meteor.userId();
                    //console.log(secc.name());
                    var imagesURL = {
                        'profile.image': '/cfs/files/images/' + secc._id + '/' + secc.name()
                    };

                    Meteor.call('usersUpdate', userId, imagesURL);
                }
            });

            var allImages = Images.find().fetch();
            _.each(allImages, function(image) {
                Images.update({_id: image._id}, {$set: {'metadata.flagged': 'false'}});
            });

            Images.update({_id: fileObj._id}, {$set: {'metadata.flagged': 'true'}});
           // console.log(fileObj._id + ": " + fileObj);
        });
    },
    'click .btnRemove': function(event, temp) {
        this.remove();

        var userId = Meteor.userId();
        Meteor.call('deleteProfileImage', userId);
    }
});

/* is defined for the all templates */
Template.registerHelper('imgAvatar', function() {
    var result = Images.find({'metadata.flagged':'true'});
    //console.log(result);
    if(result.count() > 0) {
        return result;
    }
});