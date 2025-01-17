/*
 * @Description: 
 * @Version: 
 * @Author: Ultronxr
 * @Date: 2021-04-15 21:41:52
 * @LastEditors: Ultronxr
 * @LastEditTime: 2021-04-22 16:00:19
 */
/**
 * 给指定网页容器添加弹幕
 *
 * @optional
 * {
 *   position: 'default' // default, top, left, right, bottom
 * }
 * 
 * @author  Yang,junlong at 2019-06-04 02:02:03 build.
 * @version $Id$
 */

//浏览器兼容处理
window.requestAnimationFrame = (function(){
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

var transitionEvent = whichTransitionEvent();


function Barrager(options) {
  var el = options.el;
  this.el = el = typeof el === 'string' ? document.getElementById(el) : el;

  // if(el.style.position !== 'absolute') {
	//   el.style.position = 'absolute';
  // }

  var barrage = document.createElement('div');
  barrage.className = 'barrage';

  this.barrage = barrage;

  this.options = Object.assign({}, {
    // spacelen: 100,
    // position: 'top'
  }, options);

  this.el.append(barrage);
}

/**
 * 发射弹幕
 *
 * @example
 * {
 *   content: '弹幕内容' // 支持HTML
 * }
 *
 * 
 * @param  {[type]} options [description]
 * @return {[type]}        [description]
 */
Barrager.prototype.shoot = function(content, options) {
  Object.assign(this.options, options);

  var item = document.createElement('div');
  item.className = 'barrage-item';
  item.innerHTML = content;

  let scrollFlag = 0;
  // 如果滚动条在最底部，增加页面内容时自动滚动到最底部；滚动条往上拉，窗口就停住不自动滚动到底部
  // 这里左边需要 +1 的原因是 scrollTop() 在高分辨率屏幕情况下可能获取到浮点型像素值，导致等式左边一直小于等式右边，达成不了滚动条滚动到底的判定条件；
  // （我这里 +1 并把等号改成 >= 算是暴力偷懒的写法）
  if($(window).scrollTop() + $(window).height() + 1 >= $(document).height()){
    scrollFlag = 1;
  }
  this.barrage.append(item);
  if(scrollFlag == 1){
    scrollToBottom();
  } else {
    $('#new_msg_info').css('display', 'block');
  }
}

function whichTransitionEvent(){
  var el = document.createElement('div');
  var transitions = {
    'transition':'transitionend',
    'OTransition':'oTransitionEnd',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd',
    'MsTransition':'msTransitionEnd'
  }
 
  for(var t in transitions){
    if( el.style[t] !== undefined ){
      return transitions[t];
    }
  }
}
