/**
 * 线上和预发布环境添加百度统计的 SDK
 */
if (window.location.href.indexOf('guihua.com') !== -1) {
  var bt = document.createElement('script')
  bt.src = 'https://hm.baidu.com/h.js?a008c989d92a531b1e82ed0a5f59b83c'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(bt, s)
}
