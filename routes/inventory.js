
/*
 * GET home page.
 */

exports.showInventory = function(req, res){
  res.render('inventory', { title: 'Inventory5' });
};