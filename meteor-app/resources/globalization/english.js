/**
 * Created by ashot on 5/20/15.
 */
if(Meteor.isClient){
  var en = {
    helloWorld: 'Hello World!',
    errors: {
      youSuck: 'Sorry, but you suck!'
    }
  }
  T9n.map("en", en);
}