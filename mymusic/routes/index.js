var express = require('express');
var router = express.Router();
//- 1 引入path模块
var path=require('path');
//- 2 获取防止音乐的路径
var media=path.join(__dirname,"../public/media");
/* GET home page. */
router.get('/', function(req, res) {
  //- 3 读取音乐路径中的文件
  var fs=require("fs");
  fs.readdir(media,function(err,names){
      if(err){console.log(err);}
      else{
        // 4 后台传送music
        res.render('index',{title:' my music',music:names});
      }
  });
  // res.render('index', { title: 'Express' });
});

module.exports = router;
