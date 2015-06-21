/**
 * Created by ashot on 6/20/15.
 */
var handlers = {
  getAll: function (req, res) {
    res.json({
      test: 'test result'
    });
    /*db.products.getAll(undefined, function(results){
      var allProducts = results;
      res.json(allProducts);
    });*/
  }

};
module.exports = handlers;