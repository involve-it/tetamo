/**
 * Created by douson on 08.06.15.
 */

var profileSignedInLinksHelpers;

profileSignedInLinksHelpers = {
    profileUrl: function() {
        if (!AccountsEntry.settings.profileRoute) {
            return false;
        }
        return AccountsEntry.settings.profileRoute;
    },
    beforeSignIn: function() {
        return AccountsEntry.settings.beforeSignIn;
    },
    beforeSignUp: function() {
        return AccountsEntry.settings.beforeSignUp;
    },
    beforeSignOut: function() {
        return AccountsEntry.settings.beforeSignOut;
    },
    beforeSignedInAs: function() {
        return AccountsEntry.settings.beforeSignedInAs;
    },
    entrySignUp: function() {
        return AccountsEntry.settings.entrySignUp;
    },
    profile: function() {
        return Meteor.user().profile;
    }
};

Template.profileSignedInLinks.helpers(profileSignedInLinksHelpers);

Template.profileSignedInLinks.helpers({
    signedInTemplate: function() {
        if (AccountsEntry.settings.signedInTemplate) {
            Template[AccountsEntry.settings.signedInTemplate].helpers(profileSignedInLinksHelpers);
            return Template[AccountsEntry.settings.signedInTemplate];
        } else {
            return Template.entrySignedIn;
        }
    }
});

Template.entrySignedIn.helpers(profileSignedInLinksHelpers);
