/**
 * 需要对外封装三个方法
 * 1. openShare       点击按钮触发分享
 * 2. openSharePic    分享图片
 * 3. setShareInfo    点击右上角分享按钮
 */
import { APP_URL } from '../../const'
import { urlParam, UA } from '../../utils'
const { guihuaVersion, compareVersion, isGuiHua } = UA

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
  // 回调
  successFunc: 'successFuncForApp',
  failureFunc: 'failureFuncForApp',
  cancelFunc: 'cancelFuncForApp',
  platforms: 'wx_session,wx_timeline',
  // 兼容旧版
  inviteURL: window.location.href,
  content: '身边的专属理财师',
  imgURL: 'https://dn-guihua-static.qbox.me/default_share_icon.png'
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
    ...shareInfo,
    // 兼容 Android 早期版本的分享字段
    content: shareInfo.desc,
    imgURL: shareInfo.imgUrl,
    inviteURL: shareInfo.link
  }
  shareUrl += '?' + urlParam(shareData)
  window.location.href = shareUrl
}

/**
 * 分享图片地址
 * shareInfo
 *  imgUrl: 图片地址
 *  successFunc： 成功回调
 *  failureFunc： 失败回调
 *  cancelFunc：  取消回调
 *  platforms : 平台
 */
const openSharePic = shareInfo => {
  let shareUrl = APP_URL.SHARE_PICURL
  let shareData = {
    picUrl: shareInfo.imgUrl,
    successFunc: shareInfo.successFunc || 'successFuncForApp',
    failureFunc: shareInfo.failureFunc || 'failureFuncForApp',
    cancelFunc: shareInfo.cancelFunc || 'cancelFuncForApp',
    platforms: shareInfo.platforms || ''
  }
  shareUrl += '?' + urlParam(shareData)
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

/**
 * 规划APP右上角分享按钮
 * shareInfo
 *    title   标题
 *    desc    描述
 *    link    分享链接
 *    imgUrl  分享的小 icon
 *    platforms=wx_session,wx_timeline,qq,weibo,link
 */
const setShareInfo = shareInfo => {
  if (isGuiHua()) {
    APP.shareInfo = {
      ...DEFAULT_SHARE_INFO,
      ...shareInfo,
      // 兼容旧版
      inviteURL: shareInfo.link,
      content: shareInfo.desc,
      imgURL: shareInfo.imgUrl
    }

    APP.rightBtnCallback = () => {
      openShare(APP.shareInfo)
    }
    if (compareVersion(guihuaVersion(), '3.5.0')) {
      hideShareBtn()
      setRightButton({
        text: '分享',
        callback: 'window.GH_APP.rightBtnCallback'
      })
    }
  }
}

APP = {
  shareInfo: DEFAULT_SHARE_INFO,
  setShareInfo,
  openShare,
  openSharePic,
  setRightButton,
  hideShareBtn,
  showShareBtn
}

export default APP
