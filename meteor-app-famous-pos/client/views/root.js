/**
 * Created by ashot on 5/14/15.
 */
Template.conversations.rendered = function () {
  Trail($('.content'));
};
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
    $('.fake-box-below').hide();

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
});




/**
*  Famou.us init code
* */
if (window.App == null) {
  window.App = {};
}
if (window.Famous == null) {
  window.Famous = {};
}
Meteor.startup(function() {
  Famous.Engine = famous.core.Engine;
  Famous.View = famous.core.View;
  Famous.Surface = famous.core.Surface;
  Famous.Modifier = famous.core.Modifier;
  Famous.Transform = famous.core.Transform;
  Famous.Draggable = famous.modifiers.Draggable;
  Famous.StateModifier = famous.modifiers.StateModifier;
  Famous.ModifierChain = famous.modifiers.ModifierChain;
  Famous.RenderController = famous.views.RenderController;
  Famous.EventHandler = famous.core.EventHandler;
  Famous.Scrollview = famous.views.Scrollview;
  Famous.HeaderFooterLayout = famous.views.HeaderFooterLayout;
  Famous.Easing = famous.transitions.Easing;
  Famous.Transitionable = famous.transitions.Transitionable;
  Famous.GenericSync = famous.inputs.GenericSync;
  Famous.MouseSync = famous.inputs.MouseSync;
  Famous.TouchSync = famous.inputs.TouchSync;
  Famous.Timer = famous.utilities.Timer;
  Famous.Transitionable.registerMethod('spring', famous.transitions.SpringTransition);
  return Famous.GenericSync.register({
    mouse: Famous.MouseSync,
    touch: Famous.TouchSync
  });
});
