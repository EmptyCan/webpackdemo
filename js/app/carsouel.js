    var $ = require('../lib/jquery.js') 
    function Carousel(){
    this.$li = $('.header .img-list>li');
    this.$headWidth = $('.header').width();
    this.index = 0;
    this.lock = false;
    this.$first = this.$li.last().clone();
    this.$last = this.$li.first().clone();
    this.init();
    this.bind();
    this.play();
  }
  Carousel.prototype.init = function(){
    $('.header .img-list').append(this.$last);
    $('.header .img-list').prepend(this.$first);
    $('.header .img-list').width($('.header .img-list>li').length*this.$headWidth);
    $('.header .img-list').css({left: -this.$headWidth})
    
  }
  Carousel.prototype.bind = function(){
    var _this = this;
    $('.header .left').on('click',function(){
      _this.playright(1)   
       
    })
    $('.header .right').on('click',function(){
      _this.playleft(1)
    })

    $('.header .img-order>li').on('click',function(){
      $(this).addClass('active').siblings().removeClass('active');
      var target = $(this).index();
      //console.log(target);
      _this.playleft(target-_this.index)
    })
    $('.header .img-list').on('mouseover',function(){
      clearInterval(clock);
    })
    $('.header .img-list').on('mouseout',function(){
      clock = setInterval(function(){
        _this.playleft(1);
      },2000)
    })
  }
  Carousel.prototype.playleft = function(step){
    var _this = this;
    if(_this.lock){return}
      _this.lock = true
      $('.img-list').animate({left: '+='+(-_this.$headWidth*(step))+'px'},function(){
        _this.index = _this.index+step;
        //console.log(index)
        if(_this.index === 3){
          $('.header .img-list').css({left: -_this.$headWidth});
          _this.index = 0;
        }
        _this.highlight()
        _this.lock = false
      })
  }
  Carousel.prototype.playright = function(step){
    
    var _this = this;
    if(_this.lock){return}
      _this.lock = true
      $('.header .img-list').animate({left: '+='+(_this.$headWidth)*step+'px'},function(){
        _this.index = _this.index-step;
        //console.log(index)
        if(_this.index === -1){
          $('.header .img-list').css({left: -_this.$headWidth*3+'px'});
          _this.index = 2;
        }
        _this.highlight()
        _this.lock = false;
      })
  }
  Carousel.prototype.highlight = function(){
    $('.header .img-order>li').eq(this.index).addClass('active').siblings().removeClass('active');
  }
  Carousel.prototype.play = function(){
    var _this = this;
    clock = setInterval(function(){
      _this.playleft(1);
    },2000)
  }
  module.exports = Carousel;
 //=====================================轮播================================

//============================================组件初始化==============================
/*  var start = (function(){
    return {
      init: function(){
        var a = new Carousel();
      } 
    }
  })()
start.init();*/