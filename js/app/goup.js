  var $ = require('../lib/jquery.js') 
  function GoUp(){
    this.bind();
  }
  GoUp.prototype.bind = function(){
    $(window).on('scroll',function(){
      if($(window).scrollTop() > 1100){
        $('.wrap .up button').show();
      }else if($(window).scrollTop() < 1100){
        $('.wrap .up button').hide();
      } 
    })
    $('.wrap .up button').on('click',function(){
      window.scroll(0,0);
    })
  }
  module.exports = GoUp;
  //====================================返回顶部================================
  
  
  //=========================初始化============
/*    var goup = (function(){
    return {
      init: function(){
        new GoUp();
      }
    }
  })()
  goup.init();*/