// 动态计算rem的大小，参照基准 iphone5  320px
(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
    if (clientWidth >= 640) {
      docEl.style.fontSize = '10px'
    } else {
      docEl.style.fontSize = 10 * (clientWidth / 320) + 'px'
    }
  }
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
