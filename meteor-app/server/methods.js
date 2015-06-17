/**
 * Created by ashot on 6/17/15.
 */
Meteor.methods({
  sendEmail: function(email, wantAlfa){
    debugger;
    emailOptions = {
      from: 'info@fantasia.chat',
      to: 'arutune@gmail.com',
      subject: 'from Fantasia: subscribeMe',
      text: 'email is ' + email + ', want to be alfa user: ' +  wantAlfa
    }
    EmailsCollection.insert(emailOptions);
    Email.send(emailOptions);
  }
})