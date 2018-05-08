import CONST from './const.js'
import { guihuaVersion, compareVersion, isGuiHua } from './user_agent'
import { urlParam } from '../utils'

/**
 * [GH_APP 全局变量，只用来客户端与WEB端通信]
 * @type {Object}
 */

window.GH_APP = {
  shareInfo: {
    title: '好规划理财',
    content: '身边的专属理财师',
    url: window.location.href,
    imgURL: 'https://dn-guihua-static.qbox.me/default_share_icon.png',
    imgUrl: 'https://dn-guihua-static.qbox.me/default_share_icon.png',
    buttonEnable: true,
    successFunc: 'successFuncForApp',
    failureFunc: 'failureFuncForApp',
    cancelFunc: 'cancelFuncForApp',
    platforms: ''
  },
  /**
   * 规划APP右上角分享按钮
   * shareInfo
   *    title   标题
   *    desc    描述
   *    link    分享链接
   *    imgUrl  分享的小 icon
   *    platforms=wx_session,wx_timeline,qq,weibo,link
   */
  setShareInfo(shareInfo) {
    if (isGuiHua()) {
      window.GH_APP.shareInfo = {
        ...window.GH_APP.shareInfo,
        ...shareInfo,
        content: shareInfo.desc,
        imgURL: shareInfo.imgUrl
      }

      window.GH_APP.rightBtnCallback = () => {
        this.openShare(window.GH_APP.shareInfo)
      }
      if (compareVersion(guihuaVersion(), '3.5.0')) {
        this.hideShareBtn()
        this.setRightButton({
          text: '分享',
          callback: 'window.GH_APP.rightBtnCallback'
        })
      }
    }
  },
  /**
   * APP 右上角按钮
   * config
   *    text    按钮文案
   *    url     需要打开的URL
   */
  setRightButton: (config) => {
    window.GH_APP.rightButton = {
      text: config.text,
      url: config.url,
      callback: config.callback || ''
    }
  },
  /**
   * 跳转该链接，弹出分享信息，分享信息可变
   * shareInfo
   *    title   标题
   *    desc    描述
   *    link / url    分享链接
   *    imgUrl  分享的小 icon
   *    platforms=wx_session,wx_timeline,qq,weibo,link
   */
  openShare: (shareInfo) => {
    let shareUrl = CONST.GUIHUA_URL.OPEN_SHARE
    let shareData = {
      title: shareInfo.title,
      desc: shareInfo.desc,
      url: shareInfo.url || shareInfo.link,
      link: shareInfo.url || shareInfo.link,
      imgURL: shareInfo.imgUrl,
      imgUrl: shareInfo.imgUrl,
      successFunc: shareInfo.successFunc || 'successFuncForApp',
      failureFunc: shareInfo.failureFunc || 'failureFuncForApp',
      cancelFunc: shareInfo.cancelFunc || 'cancelFuncForApp',
      platforms: shareInfo.platforms || '',
      // 兼容 Android 早期版本的分享字段
      content: shareInfo.desc,
      inviteURL: shareInfo.link
    }
    shareUrl += '?' + urlParam(shareData)
    window.location.href = shareUrl
  },
  /**
   * 分享图片地址
   * shareInfo
   *  imgUrl: 图片地址
   *  successFunc： 成功回调
   *  failureFunc： 失败回调
   *  cancelFunc：  取消回调
   *  platforms : 平台
   */
  openSharePic: (shareInfo) => {
    let shareUrl = CONST.GUIHUA_URL.SHARE_PICURL
    let shareData = {
      picUrl: shareInfo.imgUrl,
      successFunc: shareInfo.successFunc || 'successFuncForApp',
      failureFunc: shareInfo.failureFunc || 'failureFuncForApp',
      cancelFunc: shareInfo.cancelFunc || 'cancelFuncForApp',
      platforms: shareInfo.platforms || ''
    }
    shareUrl += '?' + urlParam(shareData)
    window.location.href = shareUrl
  },
  /**
   * 隐藏分享按钮
   * IOS仅在初次进入webview时生效，后续页面跳转不能修改分享按钮的显隐性
   */
  hideShareBtn: () => {
    window.GH_APP.shareInfo.buttonEnable = false
  },
  /**
   * 显示分享按钮
   */
  showShareBtn: () => {
    window.GH_APP.shareInfo.buttonEnable = true
  }
}

window.successFuncForApp = () => {
}
window.failureFuncForApp = () => {
}
window.cancelFuncForApp = () => {
}

export default window.GH_APP
