/**
 * Created by ashot on 5/20/15.
 */
if(Meteor.isClient){
  var en = {
    helloWorld: 'Hello World!',
    errors: {
      youDoNotSuck: 'Sorry, but you are fine!'
    }
  }
  T9n.map("en", en);
}