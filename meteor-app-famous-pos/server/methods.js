/**
 * Created by ashot on 6/17/15.
 */
Meteor.methods({
  sendEmail: function(email, wantAlfa){
    emailOptions = {
      from: 'info@fantasia.chat',
      to: 'arutune@gmail.com',
      subject: 'from Fantasia: subscribeMe',
      text: 'email is ' + email + ', want to be alfa user: ' +  wantAlfa
    }
    EmailsCollection.insert(emailOptions);
    Email.send(emailOptions);
  }
});












Meteor.methods({
    addToFriend: function(userId) {

    },
    usersUpdate: function(userId, imagesURL) {
        check(userId, String);
        check(imagesURL, Object);

        Meteor.users.update(userId, {$set: imagesURL});
    },
    deleteProfileImage: function(userId) {
        check(userId, String);

        Meteor.users.update(userId, {$set: {'profile.image': ''}});
    }
});