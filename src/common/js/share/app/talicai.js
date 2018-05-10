/**
 * 需要对外封装三个方法
 * 1. openShare       点击按钮触发分享
 * 2. openSharePic    分享图片
 * 3. setShareInfo    点击右上角分享按钮
 */
import { APP_URL } from '../../const'
import { urlParam, UA } from '../../utils'
const { guihuaVersion, compareVersion, isTalicai } = UA

let APP = {}
window.successFuncForApp = () => {}
window.failureFuncForApp = () => {}
window.cancelFuncForApp = () => {}

// 默认分享信息
const DEFAULT_SHARE_INFO = {
  title: '好规划理财',
  desc: '身边的专属理财师',
  link: window.location.href,
  imgUrl: 'https://dn-guihua-static.qbox.me/default_share_icon.png',
  // TODO: 查看她理财回调方法是什么
  successFunc: 'successFuncForApp',
  failureFunc: 'failureFuncForApp',
  cancelFunc: 'cancelFuncForApp',
  platforms: 'wx_session,wx_timeline'
}

/**
 * 跳转该链接，弹出分享信息，分享信息可变
 * shareInfo
 *    title   标题
 *    desc    描述
 *    link    分享链接
 *    imgUrl  分享的小 icon
 *    platforms=wx_session,wx_timeline,qq,weibo,link
 */
const openShare = shareInfo => {
  let shareUrl = APP_URL.SHARE
  let shareData = {
    ...DEFAULT_SHARE_INFO,
    ...shareInfo
  }
  shareUrl += '?' + urlParam(shareData)
  window.location.href = shareUrl
}

/**
 * 分享图片地址
 * shareInfo
 *  imgUrl: 图片地址
 */
const openSharePic = shareInfo => {
  let shareUrl = APP_URL.SHARE_PICURL
  if (typeof shareInfo === 'object') {
    shareUrl += shareInfo.imgUrl
  } else {
    shareUrl += shareInfo
  }
  window.location.href = shareUrl
}

/**
 * APP 右上角按钮
 * config
 *    text    按钮文案
 *    url     需要打开的URL
 */
const setRightButton = config => {
  APP.rightButton = {
    text: config.text,
    url: config.url,
    callback: config.callback || ''
  }
}

/**
 * 隐藏分享按钮
 * IOS仅在初次进入webview时生效，后续页面跳转不能修改分享按钮的显隐性
 */
const hideShareBtn = () => {
  APP.shareInfo.buttonEnable = false
}

/**
 * 显示分享按钮
 */
const showShareBtn = () => {
  APP.shareInfo.buttonEnable = true
}

const createShareDom = (key, val) => {
  let id = `talicai-share-${key}`
  if (document.getElementById(id)) {
    document.getElementById(id).parentNode.removeChild(document.getElementById(id))
  }
  let input = document.createElement('input')
  input.setAttribute('id', id)
  input.setAttribute('type', 'hidden')
  input.setAttribute('class', `share-${key}`)
  input.setAttribute('value', val)
  document.body.appendChild(input)
}

/**
 * APP右上角分享按钮
 * shareInfo
 *    title   标题
 *    desc    描述
 *    link    分享链接
 *    imgUrl  分享的小 icon
 */
const setShareInfo = shareInfo => {
  createShareDom('title', shareInfo.title)
  createShareDom('link', shareInfo.link)
  createShareDom('icon', shareInfo.imgUrl)
  createShareDom('description', shareInfo.desc)
}

APP = {
  setShareInfo,
  openShare,
  openSharePic,
  setRightButton,
  hideShareBtn,
  showShareBtn
}

export default APP
