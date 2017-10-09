
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Exam' });
};
exports.bankAll=function(req,res){
  res.render('bank/all', { title: 'bankAll' });
}
exports.bankTopic=function(req,res){
  res.render('bank/topic', { title: 'bankTopic' });
}
exports.paperList=function(req,res){
  res.render('paper/paperList', { title: 'paperList' });
}
exports.paperHand=function(req,res){
  res.render('paper/paperHand', { title: 'paperHand' });
}
exports.testList=function(req,res){
  res.render('test/testList', { title: 'testList' });
}
exports.testArrangement=function(req,res){
  res.render('test/testArrangement', { title: 'testArrangement' });
}