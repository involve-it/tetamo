Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appBody',

  // the appNotFound template is used for unknown routes and missing lists
  notFoundTemplate: 'appNotFound',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'appLoading',

  // wait on the following subscriptions before rendering the page to ensure
  // the global data it's expecting is present
  waitOn: function () {
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

Router.map(function () {
  this.route('join');
  this.route('signin');
  this.route('/', {
    path: '/',
    template: 'root',
    layoutTemplate: 'appTemp'
  });
  this.route('home', {path:'/home', template: 'home'});

  this.route('dialog');  // testing only

  this.route('m/home', {
    layoutTemplate: 'appBodyMobile',
    template: 'homeMobile'
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


/*
 * Routing hooks
 * Проверка залогинен пользователь или нет, если true, чтобы не было задержек в передачи данных между клиентом и сервером
 * проверяем верный логин или нет, пока ждем ответа, показываем шаблон загрузки
 * */

Router.route('/contacts', {
  name: 'contacts',
  controller: 'requireLoginController'
});

Router.route('/conversations', {
  name: 'conversations',
  controller: 'requireLoginController'
});

Router.route('/chat', {
  name: 'chat',
  controller: 'requireLoginController'
});

Router.route('chatUser', {
  path: 'chat/:userId',
  template: 'chat',
  controller: 'requireLoginController'
});

Router.route('/profile/', {
    name: 'profile',
    controller: 'requireLoginController',
    data: function () {
        return Meteor.user();
    }
  },
  function () {
    var id = Meteor.userId();
    if (id) {
      Router.go('/profile/' + id);
    } else {

    }
    //this.render('Items');
  });

Router.route('profile_id', {
  template: 'profile',
  path: '/profile/:_id',
  controller: 'requireLoginController',
  data: function () {
    return Meteor.users.findOne({_id: this.params._id});
  }
});

Router.route('editProfile', {
  path: '/profile/:_id/edit',
  controller: 'requireLoginController',
  data: function () {
    return Meteor.users.findOne({_id: this.params._id});
  }
});

Router.route('/newMessage', {
  name: 'newMessage',
  controller: 'requireLoginController'
});

requireLoginController = RouteController.extend({

  onBeforeAction: function () {
    if (!Meteor.user()) {
      if (Meteor.loggingIn()) {
        this.render(this.loadingTemplate);
      } else {
        Router.go('entrySignIn');
      }
    } else {
      this.next();
    }
  },
    waitOn: function() {
  return [
    Meteor.subscribe('images')
  ];
}
});






