/*
 * @Description: 
 * @Version: 
 * @Author: Ultronxr
 * @Date: 2021-04-17 19:47:01
 * @LastEditors: Ultronxr
 * @LastEditTime: 2021-04-17 20:32:04
 */
var barrager = new Barrager({
  el: 'container'
});

// 获取roomId
var roomId = getHrefArg('roomId');
if(roomId == null || roomId == ''){
  alert('请输入房间号！');
  roomId = '1';
  window.location.href = '?roomId=' + roomId;
}
function getHrefArg(variable){
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    if(pair[0] == variable) {
      if(pair[1] == null || pair[1] == ''){
        return '';
      }
      return parseInt(pair[1]);
    }
  }
  return(false);
}

// 自动调整fixed元素的宽度
function adjustWidth() {
  let parentwidth = $('#enter_room_place_holder')[0].offsetWidth;
  $('#enter_room_input').css('width', parentwidth+'px');
}
adjustWidth();
$(window).on('resize', function(){
    adjustWidth(); 
});

// 滚动到底部
function scrollToBottom() {
  window.scrollTo(0, document.scrollingElement.scrollHeight);
  $('#new_msg_info').css('display', 'none');
}