Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the global data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('users'),
      Meteor.subscribe('messages'),
      Meteor.subscribe('emotions')
    ];
  }
});

//dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  //dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  //Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

ProfileController = RouteController.extend({
    template: 'profile'
});

Router.map(function() {
  this.route('join');
  this.route('signin');
  this.route('home', {
      path: '/'
  });

    this.route('profile', {
        path:'/profile',
        controller: ProfileController,
        onBeforeAction: function () {
            AccountsEntry.signInRequired(this);
        }
    });

  this.route('dialog');  // testing only
  this.route('conversations');
  this.route('chat');   // will choose with whom
  this.route('chatUser', {
    path: 'chat/:userId',
    template: 'chat'
  });
  this.route('contacts');
  this.route('login');

  this.route('m/home', {
      layoutTemplate: 'appBodyMobile',
      template: 'homeMobile'
  });
  this.route('m/login', {
      layoutTemplate: 'appBodyMobile',
      template: 'login'
  });
  this.route('m/contacts', {
        layoutTemplate: 'appBodyMobile',
        template: 'contactsMobile'
  });
  this.route('m/conversations', {
      layoutTemplate: 'appBodyMobile',
      template: 'conversationsMobile'
  });

});
