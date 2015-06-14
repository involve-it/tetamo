
Template.contact.onCreated(function(){
  var data = {
      avatarPath : '/content/avatars/39.jpg'
  }
  _.extend(this.data,  data);
})
Template.contact.onRendered(function() {

});

Template.contact.helpers({
  getUsername: function(){
    var name = this.username || ((this.emails[0].address) && (this.emails[0].address).split('@')[0]);
    return name;
  },
  getUrl : function(){
    return 'chat/' + this._id
  }
});

Template.contact.events({
});
