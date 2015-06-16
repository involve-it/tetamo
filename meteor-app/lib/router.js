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

Router.map(function() {
  this.route('join');
  this.route('signin');
  this.route('home', {
      path: '/'
  });

    /* User profile page */
    Router.route('/profile/', function () {
        //debugger;
        var id = Meteor.userId();
        if(id) {
            Router.go('/profile/' + id);
        } else {

        }
        //this.render('Items');
    });

    this.route('profile_id', {
        template: 'profile',
        path:'/profile/:_id',
        data: function() {
            return Meteor.users.findOne({_id: this.params._id});
        }
    });

    this.route('editProfile', {
        path: '/profile/:_id/edit',
        data: function() {
            return Meteor.users.findOne({_id: this.params._id});
        }
    });

    /* END */

  this.route('dialog');  // testing only



  this.route('chatUser', {
    path: 'chat/:userId',
    template: 'chat'
  });
  //this.route('contacts');

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


Router.route('/contacts', {name: 'contacts'});
Router.route('/conversations', {name: 'conversations'});
Router.route('/chat');   // will choose with whom

/*
* Routing hooks
* Проверка залогинен пользователь или нет, если true, чтобы не было задержек в передачи данных между клиентом и сервером
* проверяем верный логин или нет, пока ждем ответа, показываем шаблон загрузки
* */
var requireLogin = function() {
    if( ! Meteor.user() ) {
        if(Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            Router.go('entrySignIn');
        }
    } else {
        this.next();
    }
};

//last line of the file
Router.onBeforeAction(requireLogin, {only: 'contacts'});
Router.onBeforeAction(requireLogin, {only: 'conversations'});
Router.onBeforeAction(requireLogin, {only: 'chat'});








