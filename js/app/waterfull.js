var $ = require('../lib/jquery.js') 
  function Waterfull(){
    var $ct = this.ct = $('.portfolio .show');
    this.getNode();
    this.bind();
  }

  Waterfull.prototype.getNode = function(){
     var _this = this;
     $.ajax({
        url: '/getpic',
        type: 'get',
        success: function(data,status){
          var resJson = JSON.parse(data);
          //console.log(resJson);
          for(var key in resJson){
            var a = _this.mkNode(resJson[key]);
            //console.log(a)
            _this.ct.append(a);
            a.find('img').on('load', function() {
              _this.init();
              _this.water();
              $('.portfolio .more').removeAttr('disabled');
              $('.portfolio .more').text('加载更多')
            })
          }   
        }
     })
   }
  Waterfull.prototype.mkNode = function(url){
    var html = '<div class="show-item">'
            + '<span class="iconfont icon-plus"></span>'
            + '<img src='+ url +' alt="展示">'
            + '<div class="info">'
            + '<p>round icons</p>'
            + '<p>graphic design</p>'
            + '</div>'
            + '</div>'
    return $(html);
  }
  Waterfull.prototype.init = function(){  
    this.colList = [],
    this.ctWidth = this.ct.outerWidth(true),
    this.childWidth = $('.portfolio .show-item').width(),
    this.colListLength = Math.floor(this.ctWidth/this.childWidth);  
    for(var i = 0;i<this.colListLength;i++){
      this.colList.push(0);
    }
    
  }
  Waterfull.prototype.water = function(){
    var _this = this
    $('.portfolio .show-item').each(function(){
      var minarr = Math.min.apply(Math,_this.colList);
      console.log(minarr)
       var a = _this.colList.indexOf(minarr);
        $(this).css({left:a*_this.childWidth+'px',
             top: _this.colList[a]+'px'
           })
       _this.colList[a] = _this.colList[a] + $(this).outerHeight(true);
        var c = $(this).find('img').height();
        $(this).find('span').css({paddingTop:c/2+15+'px',paddingBottom:c/2+15+'px'});  
    })
    var b = Math.max.apply(Math,_this.colList);
    $('.portfolio .show').height(b+100);
  }  
  Waterfull.prototype.bind = function(){
    var _this = this;
    $('.portfolio .more').on('click',function(){
        _this.getNode()
        $('.portfolio .more').text('加载中')
        $('.portfolio .more').attr('disabled',true);
      })
    }
  module.exports = Waterfull;
/*  var water = (function(){
    return {
      init: function(){
        new Waterfull();
      }
    }
  })()
  water.init();*/