
    Transform = famous.core.Transform;

    Session.set('menuOpen', false);

    // Translation for "main" page, depending on whether menu is open or not
    Template.home.helpers({
        menuTranslate: function() {
            return Session.get('menuOpen') ? [300,0,20] : [0,0,20];
        }
    });



    // Set the transition to be used when translate= changes reactively
    Template.main.rendered = function() {
        FView.from(this).modifierTransition = { curve: 'easeInOut', duration: 500 };
    }

    // On click, toggle the menuOpen state / reactive Session variable
    Template.buttonMenu.events({
        'click button': function(event, tpl) {
            Session.set('menuOpen', !Session.get('menuOpen'));
        }
    });



