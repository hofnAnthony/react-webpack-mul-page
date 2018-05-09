import { getWxConfig } from '../api'
import { isWeiXin, isWebView } from '../utils/ua.js'
import shareWechatTip from '../components/share_wechat_tip'
import APP_SHARE from './app'

/**
 * 设置分享信息
 * 默认设置了微信分享和APP分享
 * @param {object} shareInfo
 */
export function setShare(shareInfo) {
  if (isWeiXin()) {
    wx &&
      getWxConfig(config => {
        let desc = {
          title: shareInfo.title,
          desc: shareInfo.desc,
          link: shareInfo.link,
          imgUrl: shareInfo.imgUrl
        }
        if (shareInfo.success) {
          desc.success = shareInfo.success
        }
        wx.config(config)
        wx.ready(function() {
          wx.onMenuShareAppMessage(desc)
          wx.onMenuShareTimeline(desc)
          wx.onMenuShareQQ(desc)
        })
      })
  } else {
    APP_SHARE && APP_SHARE.setShareInfo(shareInfo)
  }
}

/**
 * 点击按钮，弹出分享
 * @param {any} shareInfo  分享信息
 */
export function openShare(shareInfo = {}) {
  if (isWeiXin()) {
    shareWechatTip()
  } else {
    APP_SHARE && APP_SHARE.openShare(shareInfo)
  }
}

/**
 * 点击按钮，分享图片
 * @param {any} shareInfo  分享信息
 */
export function openSharePic(shareInfo = {}) {
  if (isWebView()) {
    APP_SHARE && APP_SHARE.openSharePic(shareInfo)
  } else {
    // 目前场景在APP中使用，微信中暂无该场景
  }
}
