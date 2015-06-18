/**
 * Created by ashot on 5/14/15.
 */
Template.appTemp.helpers({
  // We use #each on an array of one item so that the "list" template is
  // removed and a new copy is added when changing lists, which is
  // important for animation purposes. #each looks at the _id property of it's
  // items to know when to insert a new item and when to update an old one.
  thisArray: function() {
    return [this];
  }
});
Template.appTemp.events({
  'click #subscribe': function(){
    $('#subscribe-panel').fadeIn(500);
    $('#thank-you-panel').fadeOut(500);

  },
  'click #subscribe-btn': function () {
    var email = $('.email-chkbox').val();
    if(email) {
      var wantAlfa = $('#want-alfa')[0].checked;

      Meteor.call('sendEmail', email, wantAlfa);
      $('.email-chkbox').val('');
      $('#subscribe-panel').fadeOut(500, function(){
        $('#thank-you-panel').fadeIn(500);
      });


    }
  }
})