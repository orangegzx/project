
/*
 * GET home page.
 */
var express = require('express');
var router = express.Router();
var path=require('path');
var media=path.join(__dirname,"../public/media");
exports.index = function(req, res){
	var fs=require("fs");
  fs.readdir(media,function(err,names){
      if(err){console.log(err);}
      else{
        /* 后台传送music*/
        res.render('index',{title:' my music',music:names});
      }
  });
  
};